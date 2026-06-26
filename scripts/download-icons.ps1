# Downloads the missing BALL x PIT ball icons from the wiki into src/assets/balls/.
#
# Run from the project root:
#   powershell -ExecutionPolicy Bypass -File scripts/download-icons.ps1
#
# The keys are the local file names this app expects (the ball ids), and the
# values are the wiki file names. Files are fetched via MediaWiki's
# Special:FilePath, which redirects to the canonical upload.

$ErrorActionPreference = 'Stop'

# Map: local id (output file name) -> wiki file name
$icons = [ordered]@{
    'time'            = 'Time.png'
    'banshee'         = 'Banshee.png'
    'erosion'         = 'Erosion.png'
    'heart_swallower' = 'Heart_Swallower.png'
    'reaper'          = 'Reaper.png'
    'sniper'          = 'Sniper.png'
    'time_bomb'       = 'Time_Bomb.png'
    'timestop'        = 'Timestop.png'
    'venom'           = 'Venom.png'
    'warp'            = 'Warp.png'
    'x_ray'           = 'X_Ray.png'
}

$base = 'https://ballxpit.wiki.gg/wiki/Special:FilePath/'

# Resolve output dir relative to this script (../src/assets/balls)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$outDir = Join-Path $scriptDir '..\src\assets\balls'
$outDir = [System.IO.Path]::GetFullPath($outDir)

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

Write-Host "Saving icons to: $outDir"

foreach ($entry in $icons.GetEnumerator()) {
    $localId = $entry.Key
    $wikiName = $entry.Value
    $url = $base + $wikiName
    $dest = Join-Path $outDir "$localId.png"

    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -Headers @{ 'User-Agent' = 'ballxpit-evo-icon-fetch' }
        Write-Host "  OK   $localId.png  <-  $wikiName"
    }
    catch {
        Write-Warning "  FAIL $localId.png  <-  $wikiName  ($($_.Exception.Message))"
    }
}

Write-Host "Done."
