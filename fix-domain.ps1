# fix-domain.ps1
# ============================================================
# Run ONCE after you know your final live domain.
# Works for both Vercel subdomains and custom domains.
#
# Usage examples:
#   .\fix-domain.ps1 -Domain "https://sra-school.vercel.app"
#   .\fix-domain.ps1 -Domain "https://www.sraschool.in"
# ============================================================

param(
    [Parameter(Mandatory = $true,
               HelpMessage = "Your full domain with https://, no trailing slash. E.g. https://sra-school.vercel.app")]
    [ValidatePattern('^https?://')]
    [string]$Domain
)

$Domain      = $Domain.TrimEnd('/')
$Placeholder = "https://sraschool.in"

if ($Domain -eq $Placeholder) {
    Write-Host "[SKIP] Domain is already set to the placeholder. Nothing to do." -ForegroundColor Yellow
    exit 0
}

$targets = @(
    Get-ChildItem "." -Filter "*.html" -File
    Get-ChildItem "." -Filter "*.xml"  -File
    Get-ChildItem "." -Filter "*.txt"  -File
    Get-ChildItem "assets/js" -Filter "*.js" -File -ErrorAction SilentlyContinue
)

$count = 0

foreach ($file in $targets) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    if ($content -match [regex]::Escape($Placeholder)) {
        $updated = $content -replace [regex]::Escape($Placeholder), $Domain
        Set-Content $file.FullName $updated -Encoding UTF8 -NoNewline
        Write-Host "[UPDATED]  $($file.Name)" -ForegroundColor Green
        $count++
    } else {
        Write-Host "[SKIPPED]  $($file.Name)  (no placeholder found)" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Domain fix complete: $Placeholder  ->  $Domain" -ForegroundColor Cyan
Write-Host "$count file(s) updated." -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. git add -A && git commit -m 'fix: set live domain'" -ForegroundColor White
Write-Host "  2. git push   (Vercel auto-deploys)" -ForegroundColor White
Write-Host "  3. Submit sitemap to Google Search Console" -ForegroundColor White
