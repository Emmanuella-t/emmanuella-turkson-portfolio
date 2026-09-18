from __future__ import annotations

import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image

OUT = Path(__file__).resolve().parents[1] / "demo-assets" / "remote"
URLS = {
    "hero.png": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6912295bcf607c90c75bc0c1/0a5506c63_Screenshot2025-11-10003302.png",
    "main-screens.png": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6912295bcf607c90c75bc0c1/ad76eb219_Screenshot2025-11-10003934.png",
    "video-demo-still.png": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6912295bcf607c90c75bc0c1/22a3180dc_Screenshot2025-11-10004003.png",
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, url in URLS.items():
        try:
            data = urllib.request.urlopen(url, timeout=45).read()
            im = Image.open(BytesIO(data)).convert("RGB")
            im.save(OUT / name)
            print(f"{name}: {im.size} ({len(data)} bytes)")
        except Exception as exc:  # noqa: BLE001
            print(f"FAIL {name}: {exc}")


if __name__ == "__main__":
    main()
