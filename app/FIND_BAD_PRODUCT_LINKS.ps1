Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host " FINDING BAD /products/ LINKS" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan

$patterns = @(
"/products/",
'href="/products',
"href='/products",
"router.push(""/products",
"router.push('/products",
"push(""/products",
"push('/products",
"navigate(""/products",
"navigate('/products"
)

Get-ChildItem -Recurse -Include *.ts,*.tsx |
Where-Object {
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\.next\\" -and
    $_.FullName -notmatch "\\backups\\"
} |
ForEach-Object {

    foreach($p in $patterns){

        Select-String -Path $_.FullName -SimpleMatch $p -ErrorAction SilentlyContinue |
        ForEach-Object{

            Write-Host ""
            Write-Host $_.Path -ForegroundColor Green
            Write-Host ("Line " + $_.LineNumber)
            Write-Host $_.Line.Trim()

        }

    }

}

Write-Host ""
Write-Host "============= DONE =============" -ForegroundColor Green
