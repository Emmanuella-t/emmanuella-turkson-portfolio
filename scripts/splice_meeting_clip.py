"""
Replace the live-meeting segment (28s–48s) in the Zoom accessibility demos
with the user-provided meeting clip (frame_01710.mp4), looped to fill the slot.
"""

from __future__ import annotations

import subprocess
from pathlib import Path

import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
DEMO = ROOT / "public" / "case-studies" / "zoom" / "demo"
CLIP = DEMO / "zoom-meeting-clip.mp4"
# Prefer the frames-folder source if demo copy is missing
CLIP_FALLBACK = ROOT / "demo-assets" / "work" / "frames" / "frame_01710.mp4"

MEETING_START = 28.0
MEETING_END = 48.0
MEETING_DUR = MEETING_END - MEETING_START
FPS = 30
PAD_COLOR = "0x0F172A"  # demo navy


def run(cmd: list[str]) -> None:
    print(">", " ".join(cmd))
    subprocess.run(cmd, check=True)


def splice(src_name: str, keep_audio: bool) -> None:
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    clip = CLIP if CLIP.exists() else CLIP_FALLBACK
    if not clip.exists():
        raise SystemExit(f"Meeting clip not found: {clip}")

    src = DEMO / src_name
    if not src.exists():
        raise SystemExit(f"Demo not found: {src}")

    tmp = DEMO / f"{src_name}.splicing.tmp.mp4"
    out = DEMO / src_name

    # Loop meeting clip to fill Scene 4, scale/pad to 1920x1080 on navy.
    # Keep original demo audio when present.
    fc = (
        f"[1:v]scale=1920:1080:force_original_aspect_ratio=decrease,"
        f"pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color={PAD_COLOR},"
        f"setsar=1,fps={FPS},trim=duration={MEETING_DUR},setpts=PTS-STARTPTS[meet];"
        f"[0:v]trim=0:{MEETING_START},setpts=PTS-STARTPTS[v0];"
        f"[0:v]trim=start={MEETING_END},setpts=PTS-STARTPTS[v2];"
        f"[v0][meet][v2]concat=n=3:v=1:a=0[vout]"
    )

    cmd = [
        ffmpeg,
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-stats",
        "-i",
        str(src),
        "-stream_loop",
        "-1",
        "-i",
        str(clip),
        "-filter_complex",
        fc,
        "-map",
        "[vout]",
    ]

    if keep_audio:
        cmd += ["-map", "0:a?", "-c:a", "aac", "-b:a", "160k", "-shortest"]
    else:
        cmd += ["-an"]

    cmd += [
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(tmp),
    ]
    run(cmd)

    # Atomic replace
    backup = DEMO / f"{src_name}.bak"
    if backup.exists():
        backup.unlink()
    src.replace(backup)
    tmp.replace(out)
    backup.unlink(missing_ok=True)
    print(f"Updated {out} ({out.stat().st_size / 1e6:.1f} MB)")


def main() -> None:
    print("Splicing meeting clip into demos...")
    splice("zoom-accessibility-demo.mp4", keep_audio=True)
    splice("zoom-accessibility-demo-muted.mp4", keep_audio=False)
    print("Done.")


if __name__ == "__main__":
    main()
