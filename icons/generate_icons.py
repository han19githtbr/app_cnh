from PIL import Image, ImageDraw, ImageFont
import os

sizes = [192, 512]
for size in sizes:
    img = Image.new('RGB', (size, size), '#0a0e1a')
    draw = ImageDraw.Draw(img)
    # draw rounded rect background
    margin = size // 8
    draw.rounded_rectangle([margin, margin, size-margin, size-margin], 
                            radius=size//6, fill='#111827', outline='#1e2d47', width=2)
    # traffic light emoji approximation
    cx = size // 2
    r = size // 10
    spacing = size // 7
    colors = ['#ff3333', '#ffcc00', '#00cc44']
    for i, col in enumerate(colors):
        cy = size//2 - spacing + i*spacing
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=col)
    img.save(f'/home/claude/APP_CNH/icons/icon-{size}.png')
    print(f'icon-{size}.png saved')
