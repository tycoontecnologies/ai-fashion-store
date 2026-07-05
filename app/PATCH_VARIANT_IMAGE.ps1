$File = "app\admin\product\page.tsx"

if (!(Test-Path $File)) {
    Write-Host "File not found: $File"
    exit
}

Copy-Item $File "$File.bak" -Force

$content = Get-Content $File -Raw

$old = '<div className="grid grid-cols-5 gap-3">'

$new = @'
<div className="mb-4">

  <label className="block mb-2 text-sm font-semibold text-gray-700">
    Variant Image
  </label>

  {v.image ? (
    <Image
      src={v.image}
      alt="Variant"
      width={120}
      height={120}
      className="rounded-xl border object-cover mb-3"
    />
  ) : (
    <div className="w-[120px] h-[120px] rounded-xl border flex items-center justify-center text-xs text-gray-400 mb-3">
      No Image
    </div>
  )}

  <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl inline-block">
    Choose File

    <input
      type="file"
      className="hidden"
      onChange={async (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setUploading(true);

        const formData = new FormData();

        formData.append("file", file);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        setUploading(false);

        if (!result.success) {
          alert("Upload failed");
          return;
        }

        const variants = [...(product.variants || [])];

        variants[index].image = result.url;

        setProduct({
          ...product,
          variants
        });

      }}
    />

  </label>

</div>

<div className="grid grid-cols-5 gap-3">
'@

$content = $content.Replace($old, $new)

Set-Content -Path $File -Value $content -Encoding UTF8

Write-Host ""
Write-Host "====================================="
Write-Host " Variant Image UI Added Successfully "
Write-Host "====================================="
Write-Host ""
Write-Host "Backup:"
Write-Host "$File.bak"
Write-Host ""
Write-Host "Now run:"
Write-Host "npm run dev"