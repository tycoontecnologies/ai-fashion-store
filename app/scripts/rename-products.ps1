$folder="public\products"

$i=1

Get-ChildItem $folder -File |
Sort-Object Name |
ForEach-Object{

$new="product_{0:D4}{1}" -f $i,$_.Extension

Rename-Item $_.FullName $new

$i++

}

Write-Host ""
Write-Host "Renamed" ($i-1) "files." -ForegroundColor Green