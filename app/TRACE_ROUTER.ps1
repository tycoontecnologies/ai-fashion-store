Write-Host ""
Write-Host "========== ROUTER TRACE ==========" -ForegroundColor Cyan

Get-ChildItem -Recurse -Include *.ts,*.tsx |
Where-Object {
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\.next\\" -and
    $_.FullName -notmatch "\\backups\\"
} |
ForEach-Object {

    $hits = Select-String -Path $_.FullName `
        -Pattern "router\.push|router\.replace|router\.prefetch|useRouter"

    if($hits){

        Write-Host ""
        Write-Host $_.FullName -ForegroundColor Yellow

        foreach($h in $hits){

            Write-Host ("----- Line " + $h.LineNumber + " -----") -ForegroundColor Green

            $lines = Get-Content $_.FullName

            $start = [Math]::Max(0,$h.LineNumber-4)
            $end   = [Math]::Min($lines.Count-1,$h.LineNumber+4)

            for($i=$start;$i -le $end;$i++){
                Write-Host $lines[$i]
            }

            Write-Host ""
        }
    }

}

Write-Host ""
Write-Host "========== END ==========" -ForegroundColor Cyan
