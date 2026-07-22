from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
ARTWORK_DIR = ROOT / "src" / "assets" / "visual-art"
OUTPUT_DIR = ROOT / "public" / "motion-masks"


CONFIG = {
    "portfolio": {
        "asset": "hero",
        "polygons": [
            [(0.57, 0), (0.84, 0), (0.99, 0.56), (1, 0.79), (0.86, 0.78), (0.72, 0.67), (0.57, 0.55), (0.61, 0.21)],
            [(0.24, 1), (0.42, 0.83), (0.59, 0.70), (0.79, 0.63), (1, 0.62), (1, 0.79), (0.78, 0.81), (0.60, 0.90), (0.43, 1)],
        ],
        "excludes": [(0.475, 0.765, 0.095, 0.115), (0.927, 0.32, 0.055, 0.07)],
        "hotspots": [(0.895, 0.46), (0.777, 0.535), (0.61, 0.73)],
    },
    "about": {
        "asset": "about",
        "polygons": [[(0.31, 1), (0.48, 0.86), (0.58, 0.54), (0.61, 0.08), (0.70, 0), (0.84, 0), (0.84, 0.81), (0.78, 0.93), (0.58, 0.96)]],
        "excludes": [(0.585, 0.58, 0.105, 0.18), (0.866, 0.83, 0.045, 0.075)],
        "hotspots": [(0.76, 0.23), (0.67, 0.46), (0.71, 0.86), (0.58, 0.89)],
    },
    "projects": {
        "asset": "projects",
        "polygons": [[(0.43, 0.59), (0.44, 0.42), (0.58, 0.27), (0.72, 0.20), (0.87, 0), (1, 0), (1, 0.34), (0.83, 0.52), (0.66, 0.59)]],
        "excludes": [(0.94, 0.40, 0.09, 0.17), (0.82, 0.51, 0.035, 0.055)],
        "hotspots": [(0.48, 0.46), (0.60, 0.53), (0.68, 0.50), (0.81, 0.34)],
    },
    "capabilities": {
        "asset": "capabilities",
        "polygons": [[(0.75, 0.05), (0.90, 0.03), (1, 0.15), (1, 0.82), (0.91, 0.87), (0.82, 0.76), (0.78, 0.53)]],
        "excludes": [(0.81, 0.81, 0.04, 0.065)],
        "hotspots": [(0.91, 0.25), (0.91, 0.48), (0.89, 0.67), (0.94, 0.80)],
    },
    "contact": {
        "asset": "contact",
        "polygons": [
            [(0.42, 0.13), (0.67, 0.03), (0.93, 0.08), (0.95, 0.55), (0.71, 0.78), (0.45, 0.88)],
            [(0.36, 0.53), (1, 0.43), (1, 0.60), (0.36, 0.68)],
        ],
        "excludes": [(0.93, 0.83, 0.16, 0.31), (0.73, 0.93, 0.04, 0.07)],
        "hotspots": [(0.67, 0.06), (0.67, 0.29), (0.66, 0.57), (0.45, 0.58), (0.69, 0.84)],
    },
}


def normalized_polygon(points, size):
    width, height = size
    return [(round(x * width), round(y * height)) for x, y in points]


def make_roi(size, config):
    width, height = size
    roi = Image.new("L", size, 0)
    draw = ImageDraw.Draw(roi)
    for polygon in config["polygons"]:
        draw.polygon(normalized_polygon(polygon, size), fill=255)
    for cx, cy, rx, ry in config.get("excludes", []):
        draw.ellipse(
            (
                round((cx - rx) * width),
                round((cy - ry) * height),
                round((cx + rx) * width),
                round((cy + ry) * height),
            ),
            fill=0,
        )
    return np.asarray(roi, dtype=np.float32) / 255


def edge_score(image):
    rgb = np.asarray(image.convert("RGB"), dtype=np.float32) / 255
    luminance = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    dx = np.zeros_like(luminance)
    dy = np.zeros_like(luminance)
    dx[:, 1:-1] = np.max(np.abs(rgb[:, 2:] - rgb[:, :-2]), axis=2) * 0.5
    dy[1:-1] = np.max(np.abs(rgb[2:] - rgb[:-2]), axis=2) * 0.5
    local = np.asarray(
        Image.fromarray(np.uint8(np.clip(luminance * 255, 0, 255))).filter(ImageFilter.GaussianBlur(4)),
        dtype=np.float32,
    ) / 255
    high_pass = np.abs(luminance - local)
    blue_refraction = np.clip(rgb[..., 2] - (rgb[..., 0] + rgb[..., 1]) * 0.5, 0, 1)
    return np.sqrt(dx * dx + dy * dy) * 1.65 + high_pass * 1.2 + blue_refraction * 0.85


def alpha_image(mask):
    alpha = Image.fromarray(np.uint8(np.clip(mask, 0, 1) * 255), mode="L")
    output = Image.new("RGBA", alpha.size, (255, 255, 255, 0))
    output.putalpha(alpha)
    return output


def build_masks(image_path, config):
    image = Image.open(image_path).convert("RGB")
    roi = make_roi(image.size, config)
    score = edge_score(image) * roi

    active_scores = score[roi > 0]
    threshold = max(0.034, float(np.percentile(active_scores, 83)))
    primary = np.clip((score - threshold) / max(threshold * 1.55, 0.001), 0, 1)
    primary_image = Image.fromarray(np.uint8(primary * 255), mode="L")
    primary_image = primary_image.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.55))
    primary = np.asarray(primary_image, dtype=np.float32) / 255 * roi

    halo_image = Image.fromarray(np.uint8(primary * 255), mode="L")
    halo_image = halo_image.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(5.5))
    halo = np.asarray(halo_image, dtype=np.float32) / 255 * roi

    body_image = Image.fromarray(np.uint8(primary * 255), mode="L")
    body_image = body_image.filter(ImageFilter.MaxFilter(11)).filter(ImageFilter.GaussianBlur(15))
    body = np.asarray(body_image, dtype=np.float32) / 255 * roi
    body = np.clip((body - 0.035) * 2.4, 0, 0.72)

    hotspot = Image.new("L", image.size, 0)
    hotspot_draw = ImageDraw.Draw(hotspot)
    radius = max(4, round(min(image.size) * 0.006))
    for x, y in config["hotspots"]:
        cx = round(x * image.width)
        cy = round(y * image.height)
        hotspot_draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=230)
    hotspot = hotspot.filter(ImageFilter.GaussianBlur(max(1, radius * 0.22)))
    hotspot = np.asarray(hotspot, dtype=np.float32) / 255 * roi

    return {
        "edge-primary": alpha_image(primary),
        "edge-halo": alpha_image(halo),
        "body-refraction": alpha_image(body),
        "hotspot": alpha_image(hotspot),
    }


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for variant, config in CONFIG.items():
        for mode in ("desktop", "mobile"):
            source = ARTWORK_DIR / f"{config['asset']}-clean-{mode}.webp"
            masks = build_masks(source, config)
            for mask_name, mask in masks.items():
                output = OUTPUT_DIR / f"{variant}-{mask_name}-{mode}.png"
                mask.save(output, optimize=True)
                print(f"{output.relative_to(ROOT)} {mask.size}")


if __name__ == "__main__":
    main()
