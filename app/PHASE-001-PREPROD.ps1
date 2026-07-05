# ==========================================================
# GUESS360 PRE-PRODUCTION CHECKPOINT
# Phase 1
# ==========================================================

$ErrorActionPreference="Continue"

Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host " GUESS360 PRE-PRODUCTION CHECKPOINT"
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# ----------------------------------------------------------
# Paths
# ----------------------------------------------------------

$ROOT = Get-Location
$STAMP = Get-Date -Format "yyyyMMdd_HHmmss"

$BACKUP = "..\BACKUP\PREPROD_$STAMP"

# ----------------------------------------------------------
# Backup
# ----------------------------------------------------------

Write-Host "Creating Backup..." -ForegroundColor Yellow

New-Item $BACKUP -ItemType Directory -Force | Out-Null

robocopy `
    $ROOT `
    $BACKUP `
    /MIR `
    /XD .git .next node_modules BACKUP backups Guess360-clean `
    /NFL /NDL /NJH /NJS /NP

Write-Host "Backup Complete"
Write-Host ""

# ----------------------------------------------------------
# Remove Uploaded Test Images
# ----------------------------------------------------------

Write-Host "Cleaning Uploaded Test Images..." -ForegroundColor Yellow

if(Test-Path "public\uploads\products")
{
    Remove-Item "public\uploads\products\*" -Force -ErrorAction SilentlyContinue
}

Write-Host "Upload folder cleaned."
Write-Host ""

# ----------------------------------------------------------
# Git Commit
# ----------------------------------------------------------

Write-Host "Creating Git Checkpoint..." -ForegroundColor Yellow

git add .

git commit -m "Pre-production checkpoint $STAMP"

git tag -f preprod-$STAMP

Write-Host ""

# ----------------------------------------------------------
# Summary
# ----------------------------------------------------------

Write-Host "==============================================" -ForegroundColor Green
Write-Host " COMPLETE"
Write-Host "==============================================" -ForegroundColor Green
Write-Host ""

Write-Host "Backup:"
Write-Host $BACKUP

Write-Host ""
Write-Host "Next:"
Write-Host "1. Open Admin"
Write-Host "2. Upload ONE product image"
Write-Host "3. Upload ONE variant image"
Write-Host "4. Verify storefront"
Write-Host "5. Continue to Phase 2"
Write-Host ""