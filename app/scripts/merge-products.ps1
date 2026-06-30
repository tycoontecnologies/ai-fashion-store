$json = Get-Content "..\data\cms\products.json" | ConvertFrom-Json

$result = @()

$json |
Group-Object { "$($_.name)|$($_.color)" } |
ForEach-Object {

    $items = $_.Group

    $master = $items[0]

    $gallery = @()

    foreach($p in $items){

        if($p.image -and $gallery -notcontains $p.image){
            $gallery += $p.image
        }

        if($p.gallery){
            foreach($g in $p.gallery){
                if($gallery -notcontains $g){
                    $gallery += $g
                }
            }
        }

    }

    $master.image = $gallery[0]
    $master.gallery = $gallery

    $result += $master

}

$result |
ConvertTo-Json -Depth 100 |
Set-Content "..\data\cms\products.merged.json"

Write-Host ""
Write-Host "Original :" $json.Count
Write-Host "Merged   :" $result.Count
Write-Host ""
Write-Host "Created:"
Write-Host "data\cms\products.merged.json"