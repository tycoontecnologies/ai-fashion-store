Write-Host ""
Write-Host "========= IMAGE FORENSICS =========" -ForegroundColor Cyan

$paths=@(
"public\products",
"public\uploads\products",
"uploads\products",
"public"
)

foreach($p in $paths){

    Write-Host ""
    Write-Host $p -ForegroundColor Yellow

    if(Test-Path $p){

        Get-ChildItem $p -File -Recurse |
        Select-Object -First 20 FullName

        Write-Host ""
        Write-Host "COUNT:" (
            Get-ChildItem $p -File -Recurse |
            Measure-Object
        ).Count

    }
    else{

        Write-Host "MISSING" -ForegroundColor Red

    }

}

Write-Host ""
Write-Host "========= DONE ========="
