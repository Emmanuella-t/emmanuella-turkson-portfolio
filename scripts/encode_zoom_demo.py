"""Encode pre-rendered Zoom demo frames with a memory-light ffmpeg pipeline."""

from __future__ import annotations

import subprocess
from pathlib import Path

import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / "demo-assets" / "work"
FRAMES = WORK / "frames"
AUDIO = WORK / "demo-audio.wav"
OUT_DIR = ROOT / "public" / "case-studies" / "zoom" / "demo"
FPS = 30


def run(cmd: list[str]) -> None:
    print(">", " ".join(cmd))
    subprocess.run(cmd, check=True)


def encode(out_name: str, muted: bool) -> None:
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    out = OUT_DIR / out_name
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pattern = str(FRAMES / "frame_%05d.jpg")

    # Encode to a temp file first (avoid +faststart memory spike), then remux.
    tmp = OUT_DIR / (out_name + ".tmp.mp4")
    cmd = [
        ffmpeg,
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-stats",
        "-framerate",
        str(FPS),
        "-i",
        pattern,
    ]
    if not muted and AUDIO.exists():
        cmd += ["-i", str(AUDIO)]
    cmd += [
        "-vf",
        "scale=1920:1080:flags=lanczos,format=yuv420p",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "18",
        "-threads",
        "2",
        "-g",
        "60",
        "-pix_fmt",
        "yuv420p",
    ]
    if not muted and AUDIO.exists():
        cmd += ["-c:a", "aac", "-b:a", "160k", "-ac", "2", "-ar", "44100", "-shortest"]
    else:
        cmd += ["-an"]
    cmd += [str(tmp)]
    run(cmd)

    # Remux with faststart (cheap)
    run(
        [
            ffmpeg,
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(tmp),
            "-c",
            "copy",
            "-movflags",
            "+faststart",
            str(out),
        ]
    )
    tmp.unlink(missing_ok=True)
    print(f"Wrote {out} ({out.stat().st_size / 1e6:.1f} MB)")


def ensure_poster() -> None:
    from PIL import Image

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    poster = OUT_DIR / "zoom-accessibility-demo-poster.jpg"
    src = FRAMES / f"frame_{int(38 * FPS):05d}.jpg"
    if not src.exists():
        # pick a mid meeting frame
        files = sorted(FRAMES.glob("frame_*.jpg"))
        src = files[min(len(files) - 1, int(len(files) * 0.55))]
    Image.open(src).convert("RGB").save(poster, quality=93)
    print(f"Poster: {poster}")


def main() -> None:
    n = len(list(FRAMES.glob("frame_*.jpg")))
    if n < 100:
        raise SystemExit(f"Not enough frames in {FRAMES}: {n}")
    print(f"Encoding {n} frames...")
    ensure_poster()
    encode("zoom-accessibility-demo.mp4", muted=False)
    encode("zoom-accessibility-demo-muted.mp4", muted=True)
    print("Done.")


if __name__ == "__main__":
    main()
