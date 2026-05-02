### Migrate remark config in a consumer repo

**Run these commands in the consumer repository you want to migrate.**
Below are three main steps (remove managed deps, install the shared preset, and switch to the shared config), plus an optional script setup.

---

### 1. Remove remark deps now owned by the shared config

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
    $_ -match '^remark($|-)'
    -or $_ -eq 'unified'
  ) -and ($_ -notin $keep)
}

if ($remove.Count -gt 0) {
  npm uninstall $remove
} else {
  Write-Host "No managed remark deps found to remove."
}
```

---

### 2. Install the shared package and runners

**What it does:** adds the shared preset and the remark runner packages as dev dependencies.

```powershell
# 2) Install shared package + runners
npm install --save-dev remark-config-nick2bad4u remark remark-cli
```

---

### 3. Replace local config with the shared preset

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

**Optional cleanup:** remove legacy config variants if present.

```powershell
# (optional) remove old config file variants if you had them
Remove-Item .\.remarkrc, .\.remarkrc.js, .\.remarkrc.cjs, .\.remarkrc.json -Force -ErrorAction SilentlyContinue
```

---

### Optional recommended npm scripts

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
