$json = Get-Content ".\data\cms\products.backup.json" -Raw | ConvertFrom-Json

$result = @()

$json |
Group-Object Name |
ForEach-Object {

    $items = $_.Group

    if($items.Count -eq 1){

        $result += $items[0]
        return

    }

    $master = $items[0]

    $gallery = @()

    $variants = @()

    foreach($p in $items){

        if($p.image -and $gallery -notcontains $p.image){
            $gallery += $p.image
        }

        foreach($g in ($p.gallery | Select-Object -Unique)){
            if($gallery -notcontains $g){
                $gallery += $g
            }
        }

        $variants += [ordered]@{
            id      = $p.id
            color   = if($p.color){$p.color}else{"Default"}
            size    = if($p.size){$p.size}else{"Free"}
            image   = $p.image
            sku     = $p.id
            stock   = if($p.stock){$p.stock}else{100}
            price   = $p.price
        }

    }

    $master.image = $gallery[0]
    $master.gallery = $gallery
    $master.variants = $variants

    $result += $master

}

$result |
ConvertTo-Json -Depth 100 |
Set-Content ".\data\cms\products.merged.json"

Copy-Item `
".\data\cms\products.merged.json" `
".\data\cms\products.json" `
-Force

Write-Host ""
Write-Host "Original :" $json.Count
Write-Host "Merged   :" $result.Count
Write-Host "Done."