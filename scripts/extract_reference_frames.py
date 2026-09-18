from __future__ import annotations

from pathlib import Path

import imageio.v2 as imageio


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    videos_dir = repo_root / "reference-videos"
    out_root = repo_root / "reference-frames"
    out_root.mkdir(exist_ok=True)

    videos = [
        "Recording 2026-03-18 163554.mp4",
        "Recording 2026-03-18 172942.mp4",
    ]

    # Representative timestamps (percentages through the video)
    percentages = [0.00, 0.10, 0.20, 0.35, 0.50, 0.65, 0.80, 0.92, 0.99]

    for vid in videos:
        in_path = videos_dir / vid
        if not in_path.exists():
            print(f"[extract] Missing: {in_path}")
            continue

        reader = imageio.get_reader(str(in_path))
        meta = reader.get_meta_data()
        duration = meta.get("duration")
        fps = meta.get("fps")
        nframes = meta.get("nframes")

        # Duration fallback
        if duration is None:
            if nframes is not None and fps is not None:
                duration = float(nframes) / float(fps)
            else:
                duration = 1.0

        out_dir = out_root / vid.replace(".mp4", "")
        out_dir.mkdir(parents=True, exist_ok=True)

        for i, p in enumerate(percentages):
            t = float(duration) * float(p)

            # Map timestamp -> nearest frame index where possible
            if fps is not None and nframes is not None:
                frame_idx = min(int(round(t * float(fps))), int(nframes) - 1)
                frame = reader.get_data(frame_idx)
            else:
                # Best-effort fallback (not always perfect, but works enough for keyframes)
                frame_idx = int(round(t * 25))
                frame = reader.get_data(frame_idx)

            out_path = out_dir / f"frame_{i:02d}_t{p:.2f}.png"
            imageio.imwrite(str(out_path), frame)

        reader.close()
        print(f"[extract] {vid}: duration={duration} fps={fps} nframes={nframes}")


if __name__ == "__main__":
    main()

