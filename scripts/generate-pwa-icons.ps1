param(
  [string]$SourcePath
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path -Parent $PSScriptRoot
$outputDirectory = Join-Path $projectRoot 'public/assets/icons'
[void][System.IO.Directory]::CreateDirectory($outputDirectory)

# El dibujo ocupa el centro del lienzo para respetar el recorte de Android.
$artwork = New-Object System.Drawing.Bitmap(512, 512)
$drawing = [System.Drawing.Graphics]::FromImage($artwork)
$drawing.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$drawing.Clear([System.Drawing.ColorTranslator]::FromHtml('#fff7f1'))
$ownedResources = [System.Collections.Generic.List[System.IDisposable]]::new()

function New-Brush([string]$Hex) {
  $brush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($Hex))
  $ownedResources.Add($brush)
  return $brush
}

try {
  if ($SourcePath) {
    $source = [System.Drawing.Image]::FromFile((Resolve-Path -LiteralPath $SourcePath).Path)
    $ownedResources.Add($source)
    $ratio = [Math]::Min(280.0 / $source.Width, 280.0 / $source.Height)
    $width = [single]($source.Width * $ratio)
    $height = [single]($source.Height * $ratio)
    $drawing.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $drawing.DrawImage($source, [single]((512 - $width) / 2), [single]((512 - $height) / 2), $width, $height)
  } else {
    $blush = New-Brush '#f7dfdc'
    $paper = New-Brush '#fffdf8'
    $rose = New-Brush '#c94d62'
    $shadow = New-Brush '#edc8c2'
    $drawing.FillEllipse($blush, 84, 84, 344, 344)
    $drawing.FillRectangle($shadow, 128, 190, 264, 174)
    $drawing.FillRectangle($paper, 124, 180, 264, 174)
    $pen = [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml('#dba9a5'), 5)
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $ownedResources.Add($pen)
    $drawing.DrawRectangle($pen, 124, 180, 264, 174)
    $drawing.DrawLine($pen, 124, 354, 221, 264)
    $drawing.DrawLine($pen, 388, 354, 291, 264)
    $drawing.DrawLine($pen, 124, 180, 256, 283)
    $drawing.DrawLine($pen, 388, 180, 256, 283)
    $heart = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $ownedResources.Add($heart)
    $heart.AddBezier(256, 248, 206, 207, 181, 270, 256, 310)
    $heart.AddBezier(256, 310, 331, 270, 306, 207, 256, 248)
    $heart.CloseFigure()
    $drawing.FillPath($rose, $heart)
  }

  $icons = @(
    @{ Name = 'icon-192.png'; Size = 192 },
    @{ Name = 'icon-512.png'; Size = 512 },
    @{ Name = 'icon-maskable-512.png'; Size = 512 },
    @{ Name = 'apple-touch-icon.png'; Size = 180 }
  )
  foreach ($icon in $icons) {
    $bitmap = [System.Drawing.Bitmap]::new($icon.Size, $icon.Size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.DrawImage($artwork, 0, 0, $icon.Size, $icon.Size)
      $bitmap.Save((Join-Path $outputDirectory $icon.Name), [System.Drawing.Imaging.ImageFormat]::Png)
      Write-Output "Generated $($icon.Name) ($($icon.Size)x$($icon.Size))"
    } finally {
      $graphics.Dispose()
      $bitmap.Dispose()
    }
  }
} finally {
  foreach ($resource in $ownedResources) { $resource.Dispose() }
  $drawing.Dispose()
  $artwork.Dispose()
}
