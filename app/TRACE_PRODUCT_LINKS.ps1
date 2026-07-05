$root = Get-Location

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "TRACE PRODUCT LINKS"
Write-Host "==========================================" -ForegroundColor Cyan

Get-ChildItem $root -Recurse -Include *.tsx |
Where-Object{
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\.next\\" -and
    $_.FullName -notmatch "\\backups\\"
} |
ForEach-Object{

    $matches = Select-String -Path $_.FullName -Pattern "href=\{.*product","href=.*product","<Link"

    if($matches){

        Write-Host ""
        Write-Host $_.FullName -ForegroundColor Green

        $matches | ForEach-Object{
            Write-Host ("Line " + $_.LineNumber + ": " + $_.Line.Trim())
        }

    }

}

Write-Host ""
Write-Host "DONE" -ForegroundColor Cyan
