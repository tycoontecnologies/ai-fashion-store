Get-ChildItem -Recurse -Include *.tsx |
Where-Object {
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\.next\\" -and
    $_.FullName -notmatch "\\backups\\"
} |
ForEach-Object {

    $file = $_.FullName

    $content = Get-Content $file -Raw

    if($content -match "ProductCard" -or
       $content -match "href=\{`?/product" -or
       $content -match "href=\{`?/products" -or
       $content -match "href=`"/product" -or
       $content -match "href=`"/products")
    {
        Write-Host ""
        Write-Host $file -ForegroundColor Green
    }

}
