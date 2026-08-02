Write-Host ""
Write-Host "======================================="
Write-Host " Guess360 Product Route Fix"
Write-Host "======================================="
Write-Host ""

$files = @(
"components\ProductCard.tsx",
"components\RelatedProducts.tsx",
"components\TrendingSection.tsx",
"components\RecentlyViewed.tsx",
"components\AIOutfitRecommendations.tsx",
"app\wishlist\page.tsx"
)

foreach($file in $files){

    if(Test-Path $file){

        Write-Host "Patching $file"

        $content = Get-Content $file -Raw

        $content = $content.Replace(
            'href={`/products/${product.id}`}',
            'href={`/product/${product.id}`}'
        )

        $content = $content.Replace(
            'href={`/products/${item.id}`}',
            'href={`/product/${item.id}`}'
        )

        Set-Content $file $content -Encoding UTF8

    }
    else{
        Write-Host "Missing: $file"
    }
}

Write-Host ""
Write-Host "======================================="
Write-Host " Route Fix Complete"
Write-Host "======================================="
Write-Host ""

git add .

git commit -m "Fix product detail routes"

git push

Write-Host ""
Write-Host "Now merge feature/merge-center into main,"
Write-Host "then deploy on VPS."
Write-Host ""