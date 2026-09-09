# Migrate remark config in a consumer repo

## Version 2 file progress

Version 2 enables `remark-lint-file-progress` in the shared preset and its ESLint
documentation variants. This adds per-file output and a shutdown summary on
`stderr`, including CI runs. Remark peers, exports, lint diagnostics, and
Markdown formatting are unchanged by this integration.

The preset requires `remark-lint-file-progress` 1.0.1 or newer. Interactive
terminals reuse the progress display instead of leaving one entry per file;
redirected output continues to use ordinary lines.

The minimum Node version is now 22.19.0, matching the current runtime dependency
graph. Earlier Node 22 versions can fail during import because the URL-checking
dependency loads Undici 8 even while network checks are disabled. CI installs
the packed package in a separate consumer and verifies this exact minimum.

For the previous quiet behavior, install `remark-lint-file-progress` as a direct
development dependency and use the [disable example](README.md#file-progress).
Apply that override after migrating any older local configuration below.

## Adopt the shared preset

**Run these commands in the consumer repository you want to migrate.**
Below are three main steps (remove managed deps, install the shared preset, and switch to the shared config), plus an optional script setup.

---

## 1. Remove remark deps now owned by the shared config

**What it does:** scans `package.json` for remark-related dependencies and uninstalls any managed packages that the shared config will own.

```powershell
# 1) Uninstall remark-related deps that the shared config now owns
$pkg = Get-Content .\package.json -Raw | ConvertFrom-Json
$names = @(
  $pkg.dependencies.PSObject.Properties.Name
  $pkg.devDependencies.PSObject.Properties.Name
) | Sort-Object -Unique

$keep = @("remark", "remark-cli", "remark-config-nick2bad4u")
$remove = $names | Where-Object {
  (
    ($_ -match '^remark($|-)') -or ($_ -eq 'unified')
  ) -and ($_ -notin $keep)
}

if ($remove.Count -gt 0) {
  npm uninstall $remove --force
} else {
  Write-Host "No managed remark deps found to remove."
}
```

---

## 2. Install the shared package and runners

**What it does:** adds the shared preset and the remark runner packages as dev dependencies.

```powershell
# 2) Install shared package + runners
npm install --save-dev remark-config-nick2bad4u remark remark-cli
```

---

## 3. Replace local config with the shared preset

**What it does:** writes a minimal `.remarkrc.mjs` that imports and exports the shared preset.

```powershell
# 3) Change config to import shared preset
@'
import { createConfig } from "remark-config-nick2bad4u";

/**
 * @type {import("remark-config-nick2bad4u").RemarkConfig}
 */
const remarkConfig = createConfig({
    settings: {
        // rule: "*", // your settings override here
    },
    plugins: [
        // [myRemarkPlugin, myOptions], // your plugin override here
    ],
});

export default remarkConfig;
'@ | Set-Content .\.remarkrc.mjs -Encoding UTF8
```

**Alternative:** spread style config if you only need to override settings and not plugins.

```powershell
@'
import { preset } from "remark-config-nick2bad4u";

/**
 * @type {import("remark-config-nick2bad4u").RemarkConfig}
 */
const remarkConfig = {
    ...preset,
    settings: {
        ...preset.settings,
        // rule: "*",        // your override here
        // bullet: "*",      // your override here
        // emphasis: "*",    // your override here
    },
};

export default remarkConfig;
'@ | Set-Content .\.remarkrc.mjs -Encoding UTF8
```

**Optional cleanup:** remove legacy config variants if present.

```powershell
# (optional) remove old config file variants if you had them
Remove-Item .\.remarkrc, .\.remarkrc.js, .\.remarkrc.cjs, .\.remarkrc.json -Force -ErrorAction SilentlyContinue
```

---

## Optional recommended npm scripts

**Add these to `package.json` scripts** to run linting and autofix with the shared config.

```powershell
npm pkg set "scripts.lint:remark=remark . --frail --ignore-path .remarkignore"
npm pkg set "scripts.lint:remark:fix=remark . --ignore-path .remarkignore --output"
```

---

**Quick checklist**

- **Backup** `package.json` before running the uninstall step.
- **Verify** `.remarkignore` exists and is correct for your repo.
- **Run** the lint script locally to confirm the shared config behaves as expected.

## One Shot Script

```powershell

# --- Remark Migration: One‑Shot Script ---
# Run this from the root of each consumer repo you want to migrate.

Write-Host "`n🔧 Starting Remark migration..." -ForegroundColor Cyan

# 1) Detect and uninstall remark-related deps now owned by the shared config
Write-Host "📦 Scanning package.json for remark-related dependencies..."

$pkg = Get-Content .\package.json -Raw | ConvertFrom-Json

$names = @(
  $pkg.dependencies.PSObject.Properties.Name
  $pkg.devDependencies.PSObject.Properties.Name
) | Sort-Object -Unique

$keep = @("remark", "remark-cli", "remark-config-nick2bad4u")

$remove = $names | Where-Object {
  (
    ($_ -match '^remark($|-)') -or ($_ -eq 'unified')
  ) -and ($_ -notin $keep)
}

if ($remove.Count -gt 0) {
  Write-Host "🗑️ Removing managed remark deps: $($remove -join ', ')"
  npm uninstall $remove --force
} else {
  Write-Host "✔️ No managed remark deps found to remove."
}

# 2) Install shared preset + remark + remark-cli
Write-Host "📥 Installing remark-config-nick2bad4u + remark + remark-cli..."
npm install --save-dev remark-config-nick2bad4u remark remark-cli

# 3) Write new .remarkrc.mjs using createConfig API
Write-Host "📝 Writing .remarkrc.mjs..."
@'
import { createConfig } from "remark-config-nick2bad4u";

/**
 * @type {import("remark-config-nick2bad4u").RemarkConfig}
 */
const remarkConfig = createConfig({
    settings: {
        // rule: "*", // your settings override here
    },
    plugins: [
        // [myRemarkPlugin, myOptions], // your plugin override here
    ],
});

export default remarkConfig;
'@ | Set-Content .\.remarkrc.mjs -Encoding UTF8

# 4) Remove legacy remark config files
Write-Host "🧹 Removing old remark config files..."
Remove-Item ".remarkrc", ".remarkrc.js", ".remarkrc.cjs", ".remarkrc.json" -Force -ErrorAction SilentlyContinue

# 5) Add recommended npm scripts
Write-Host "⚙️ Adding recommended remark scripts to package.json..."
npm pkg set "scripts.lint:remark=remark . --frail --ignore-path .remarkignore"
npm pkg set "scripts.lint:remark:fix=remark . --ignore-path .remarkignore --output"

# 6) Verify
Write-Host "🔍 Running remark check..."
npx remark . --frail --ignore-path .remarkignore

Write-Host "`n🎉 Remark migration complete!" -ForegroundColor Green
```
