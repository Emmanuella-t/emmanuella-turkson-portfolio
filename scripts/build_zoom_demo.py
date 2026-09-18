"""
Build a polished 60–75s Zoom accessibility product demo from existing hi-fi screens.
Outputs:
  - zoom-accessibility-demo.mp4          (with sound)
  - zoom-accessibility-demo-muted.mp4    (portfolio autoplay)
  - zoom-accessibility-demo-poster.jpg   (player poster frame)
"""

from __future__ import annotations

import math
import subprocess
import wave
from dataclasses import dataclass
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "case-studies"
OUT_DIR = ROOT / "public" / "case-studies" / "zoom" / "demo"
WORK = ROOT / "demo-assets" / "work"

W, H = 1920, 1080
FPS = 30
ZOOM_BLUE = (45, 140, 255)
NAVY = (15, 23, 42)
SOFT = (241, 245, 249)


def clamp(v: float, a: float = 0.0, b: float = 1.0) -> float:
    return max(a, min(b, v))


def ease(t: float) -> float:
    t = clamp(t)
    return t * t * (3.0 - 2.0 * t)


def ease_out(t: float) -> float:
    t = clamp(t)
    return 1.0 - (1.0 - t) ** 3


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def lerp2(a: tuple[float, float], b: tuple[float, float], t: float) -> tuple[float, float]:
    return (lerp(a[0], b[0], t), lerp(a[1], b[1], t))


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\seguisb.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    if bold:
        candidates = [
            r"C:\Windows\Fonts\seguisb.ttf",
            r"C:\Windows\Fonts\arialbd.ttf",
            r"C:\Windows\Fonts\segoeuib.ttf",
        ] + candidates
    for path in candidates:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def make_background() -> Image.Image:
    img = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(img)
    for y in range(H):
        t = y / (H - 1)
        r = int(lerp(12, 28, t))
        g = int(lerp(20, 42, t))
        b = int(lerp(40, 72, t))
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    # soft radial glow
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    for i in range(18, 0, -1):
        alpha = int(10 + i * 1.2)
        pad = i * 40
        gdraw.ellipse([pad, pad // 2, W - pad, H - pad // 2], fill=(45, 140, 255, alpha))
    img = Image.alpha_composite(img.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(60))).convert("RGB")
    return img


BG = None


def get_bg() -> Image.Image:
    global BG
    if BG is None:
        BG = make_background()
    return BG.copy()


def upscale(img: Image.Image, scale: float = 1.85) -> Image.Image:
    nw = max(1, int(img.width * scale))
    nh = max(1, int(img.height * scale))
    return img.resize((nw, nh), Image.Resampling.LANCZOS)


def round_window(img: Image.Image, radius: int = 22) -> Image.Image:
    img = img.convert("RGBA")
    mask = Image.new("L", img.size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, img.width - 1, img.height - 1], radius=radius, fill=255)
    out = Image.new("RGBA", img.size, (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out


def drop_shadow(size: tuple[int, int], radius: int = 28, blur: int = 28, opacity: int = 120) -> Image.Image:
    shadow = Image.new("RGBA", (size[0] + blur * 4, size[1] + blur * 4), (0, 0, 0, 0))
    d = ImageDraw.Draw(shadow)
    offset = blur * 2
    d.rounded_rectangle(
        [offset, offset + 10, offset + size[0], offset + size[1] + 10],
        radius=radius,
        fill=(0, 0, 0, opacity),
    )
    return shadow.filter(ImageFilter.GaussianBlur(blur))


def place_ui(
    canvas: Image.Image,
    ui: Image.Image,
    scale: float = 1.0,
    focus: tuple[float, float] = (0.5, 0.5),
    window_scale: float = 0.92,
) -> tuple[Image.Image, tuple[int, int, int, int]]:
    """Place UI on canvas with optional Ken Burns crop. Returns canvas and UI rect."""
    ui = ui.convert("RGBA")
    # Fit UI into stage
    stage_w = int(W * window_scale)
    stage_h = int(H * window_scale)
    fit = min(stage_w / ui.width, stage_h / ui.height)
    base_w = int(ui.width * fit)
    base_h = int(ui.height * fit)

    # Ken Burns: scale up around focus
    kb_w = max(1, int(base_w * scale))
    kb_h = max(1, int(base_h * scale))
    scaled = ui.resize((kb_w, kb_h), Image.Resampling.LANCZOS)

    # Crop window of base size around focus
    cx = int(focus[0] * kb_w)
    cy = int(focus[1] * kb_h)
    left = int(cx - base_w / 2)
    top = int(cy - base_h / 2)
    left = int(clamp(left, 0, max(0, kb_w - base_w)))
    top = int(clamp(top, 0, max(0, kb_h - base_h)))
    cropped = scaled.crop((left, top, left + base_w, top + base_h))
    rounded = round_window(cropped, radius=20)

    x = (W - base_w) // 2
    y = (H - base_h) // 2
    shadow = drop_shadow((base_w, base_h))
    sx = x - 28
    sy = y - 28
    canvas_rgba = canvas.convert("RGBA")
    canvas_rgba.alpha_composite(shadow, (sx, sy))
    canvas_rgba.alpha_composite(rounded, (x, y))
    return canvas_rgba.convert("RGB"), (x, y, x + base_w, y + base_h)


def draw_cursor(canvas: Image.Image, pos: tuple[float, float], click: float = 0.0) -> Image.Image:
    x, y = int(pos[0]), int(pos[1])
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    scale = 1.0 - 0.12 * click
    pts = [
        (x, y),
        (x, y + int(28 * scale)),
        (x + int(8 * scale), y + int(22 * scale)),
        (x + int(14 * scale), y + int(34 * scale)),
        (x + int(18 * scale), y + int(32 * scale)),
        (x + int(12 * scale), y + int(20 * scale)),
        (x + int(22 * scale), y + int(20 * scale)),
    ]
    d.polygon(pts, fill=(255, 255, 255, 245), outline=(15, 23, 42, 220))
    if click > 0.05:
        r = int(10 + 18 * click)
        alpha = int(90 * (1 - click))
        d.ellipse([x - r, y - r, x + r, y + r], outline=(45, 140, 255, alpha), width=3)
    return Image.alpha_composite(canvas.convert("RGBA"), layer).convert("RGB")


def draw_callout(
    canvas: Image.Image,
    text: str,
    anchor: tuple[int, int],
    opacity: float = 1.0,
    side: str = "right",
) -> Image.Image:
    if opacity <= 0.01:
        return canvas
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    font = load_font(28, bold=True)
    pad_x, pad_y = 18, 12
    bbox = d.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    box_w, box_h = tw + pad_x * 2, th + pad_y * 2
    ax, ay = anchor
    if side == "right":
        x0, y0 = ax + 18, ay - box_h // 2
    elif side == "left":
        x0, y0 = ax - box_w - 18, ay - box_h // 2
    else:
        x0, y0 = ax - box_w // 2, ay - box_h - 18
    alpha = int(235 * opacity)
    d.rounded_rectangle([x0, y0, x0 + box_w, y0 + box_h], radius=12, fill=(255, 255, 255, alpha))
    d.rounded_rectangle(
        [x0, y0, x0 + box_w, y0 + box_h],
        radius=12,
        outline=(45, 140, 255, alpha),
        width=2,
    )
    # connector
    if side == "right":
        d.line([(ax, ay), (x0, y0 + box_h // 2)], fill=(45, 140, 255, alpha), width=2)
    elif side == "left":
        d.line([(ax, ay), (x0 + box_w, y0 + box_h // 2)], fill=(45, 140, 255, alpha), width=2)
    d.ellipse([ax - 5, ay - 5, ax + 5, ay + 5], fill=(45, 140, 255, alpha))
    d.text((x0 + pad_x, y0 + pad_y - 2), text, font=font, fill=(15, 23, 42, alpha))
    return Image.alpha_composite(canvas.convert("RGBA"), layer).convert("RGB")


def draw_title(
    canvas: Image.Image,
    text: str,
    opacity: float = 1.0,
    y: int = 86,
) -> Image.Image:
    if opacity <= 0.01:
        return canvas
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    font = load_font(42, bold=True)
    bbox = d.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    pad_x, pad_y = 28, 16
    box_w, box_h = tw + pad_x * 2, th + pad_y * 2
    x0 = (W - box_w) // 2
    alpha = int(230 * opacity)
    d.rounded_rectangle(
        [x0, y, x0 + box_w, y + box_h],
        radius=16,
        fill=(15, 23, 42, int(170 * opacity)),
    )
    d.rounded_rectangle(
        [x0, y, x0 + box_w, y + box_h],
        radius=16,
        outline=(45, 140, 255, alpha),
        width=2,
    )
    d.text((x0 + pad_x, y + pad_y - 2), text, font=font, fill=(255, 255, 255, alpha))
    return Image.alpha_composite(canvas.convert("RGBA"), layer).convert("RGB")


def highlight_rect(
    canvas: Image.Image,
    rect: tuple[int, int, int, int],
    opacity: float = 1.0,
) -> Image.Image:
    if opacity <= 0.01:
        return canvas
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x0, y0, x1, y1 = rect
    pulse = 0.5 + 0.5 * math.sin(opacity * math.pi)
    d.rounded_rectangle(
        [x0 - 4, y0 - 4, x1 + 4, y1 + 4],
        radius=14,
        outline=(45, 140, 255, int(200 * opacity * pulse)),
        width=3,
    )
    d.rounded_rectangle(
        [x0, y0, x1, y1],
        radius=12,
        fill=(45, 140, 255, int(28 * opacity)),
    )
    return Image.alpha_composite(canvas.convert("RGBA"), layer).convert("RGB")


def map_point(rect: tuple[int, int, int, int], nx: float, ny: float) -> tuple[float, float]:
    x0, y0, x1, y1 = rect
    return (x0 + (x1 - x0) * nx, y0 + (y1 - y0) * ny)


def make_post_meeting_screen() -> Image.Image:
    """Polished post-meeting recap screen aligned with Zoom visual system + transcript wireframe."""
    img = Image.new("RGB", (1400, 900), (248, 250, 252))
    d = ImageDraw.Draw(img)
    # window chrome
    d.rounded_rectangle([0, 0, 1399, 899], radius=18, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    for i, c in enumerate([(255, 95, 87), (255, 189, 46), (40, 200, 64)]):
        d.ellipse([18 + i * 22, 16, 32 + i * 22, 30], fill=c)

    # sidebar
    d.rectangle([0, 48, 240, 900], fill=(248, 250, 252))
    font_sm = load_font(18)
    font_md = load_font(22, bold=True)
    font_lg = load_font(36, bold=True)
    font_body = load_font(20)
    items = ["Home", "Meetings", "Contacts", "Chat", "Recordings"]
    for i, label in enumerate(items):
        y = 90 + i * 48
        if label == "Meetings":
            d.rounded_rectangle([16, y - 8, 224, y + 28], radius=10, fill=(45, 140, 255))
            d.text((36, y), label, font=font_sm, fill=(255, 255, 255))
        else:
            d.text((36, y), label, font=font_sm, fill=(71, 85, 105))

    # main
    d.text((280, 72), "Meeting Summary", font=font_lg, fill=(15, 23, 42))
    d.text((280, 118), "Product sync · Today · Accessible recap available", font=font_sm, fill=(100, 116, 139))

    tabs = ["Summary", "Transcript", "Highlights", "Key decisions"]
    for i, tab in enumerate(tabs):
        x = 280 + i * 160
        if tab == "Transcript":
            d.text((x, 170), tab, font=font_md, fill=(45, 140, 255))
            d.line([(x, 200), (x + 90, 200)], fill=(45, 140, 255), width=3)
        else:
            d.text((x, 170), tab, font=font_md, fill=(100, 116, 139))

    # cards
    cards = [
        ("Summary", "Live captions and ASL support kept the team aligned on timeline and beta plans."),
        ("Key decisions", "Target end of next month · Share beta details after the meeting · Keep ASL avatar on by default."),
        ("Accessible recap", "Full transcript, caption history, and interpreter notes saved for later review."),
    ]
    for i, (title, body) in enumerate(cards):
        y = 230 + i * 130
        d.rounded_rectangle([280, y, 1320, y + 110], radius=16, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
        d.ellipse([304, y + 36, 336, y + 68], fill=ZOOM_BLUE)
        d.text((356, y + 24), title, font=font_md, fill=(15, 23, 42))
        d.text((356, y + 58), body, font=font_body, fill=(71, 85, 105))

    # transcript snippet
    d.rounded_rectangle([280, 630, 1320, 850], radius=16, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    d.text((304, 650), "Transcript", font=font_md, fill=(15, 23, 42))
    lines = [
        ("10:15", "You", "I'd like to share my screen to walk through the updates."),
        ("10:15", "Aisha Brown", "Great, thanks! Could you go over the timeline again?"),
        ("10:16", "You", "Absolutely. We're targeting the end of next month."),
        ("10:17", "Noah Johnson", "Sounds good. Will there be a beta period for feedback?"),
    ]
    for i, (t, name, msg) in enumerate(lines):
        y = 690 + i * 36
        d.text((304, y), t, font=font_sm, fill=(148, 163, 184))
        d.text((370, y), f"{name}: {msg}", font=font_sm, fill=(51, 65, 85))

    return img


@dataclass
class CursorKey:
    t: float
    x: float  # normalized in UI rect
    y: float
    click: bool = False


def cursor_at(keys: list[CursorKey], t: float, rect: tuple[int, int, int, int]) -> tuple[tuple[float, float], float]:
    if t <= keys[0].t:
        p = map_point(rect, keys[0].x, keys[0].y)
        return p, 0.0
    if t >= keys[-1].t:
        p = map_point(rect, keys[-1].x, keys[-1].y)
        return p, 0.0
    for i in range(len(keys) - 1):
        a, b = keys[i], keys[i + 1]
        if a.t <= t <= b.t:
            u = ease((t - a.t) / max(1e-6, b.t - a.t))
            p0 = map_point(rect, a.x, a.y)
            p1 = map_point(rect, b.x, b.y)
            pos = lerp2(p0, p1, u)
            click = 0.0
            if b.click and (b.t - 0.12) <= t <= (b.t + 0.18):
                click = 1.0 - abs(t - b.t) / 0.18
            elif a.click and (a.t - 0.12) <= t <= (a.t + 0.18):
                click = 1.0 - abs(t - a.t) / 0.18
            return pos, clamp(click)
    p = map_point(rect, keys[-1].x, keys[-1].y)
    return p, 0.0


def fade_mix(a: Image.Image, b: Image.Image, t: float) -> Image.Image:
    t = ease(clamp(t))
    return Image.blend(a, b, t)


def scene_opacity(local_t: float, dur: float, fade: float = 0.45) -> float:
    if local_t < fade:
        return ease(local_t / fade)
    if local_t > dur - fade:
        return ease((dur - local_t) / fade)
    return 1.0


def build_audio(duration: float, click_times: list[float], out_wav: Path) -> None:
    sr = 44100
    n = int(duration * sr)
    t = np.linspace(0, duration, n, endpoint=False)

    # Soft optimistic pad (C major-ish)
    def pad(freq: float, amp: float) -> np.ndarray:
        return amp * np.sin(2 * np.pi * freq * t) * (0.55 + 0.45 * np.sin(2 * np.pi * 0.05 * t))

    music = (
        pad(130.81, 0.08)  # C3
        + pad(164.81, 0.06)  # E3
        + pad(196.00, 0.05)  # G3
        + pad(261.63, 0.035)  # C4
        + pad(329.63, 0.02)  # E4
    )
    # gentle high shimmer
    music += 0.012 * np.sin(2 * np.pi * 523.25 * t) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.08 * t))
    # slow amplitude envelope
    env = 0.35 + 0.65 * (0.5 + 0.5 * np.sin(2 * np.pi * (1 / 18) * t))
    music *= env
    # fade in/out
    fade = int(1.2 * sr)
    music[:fade] *= np.linspace(0, 1, fade)
    music[-fade:] *= np.linspace(1, 0, fade)

    sfx = np.zeros_like(music)
    for ct in click_times:
        i0 = int(ct * sr)
        if i0 >= n:
            continue
        length = int(0.045 * sr)
        i1 = min(n, i0 + length)
        tt = np.arange(i1 - i0) / sr
        click = 0.18 * np.sin(2 * np.pi * 1200 * tt) * np.exp(-tt * 55)
        click += 0.08 * np.sin(2 * np.pi * 800 * tt) * np.exp(-tt * 40)
        sfx[i0:i1] += click

    # soft transition whooshes near scene boundaries
    for ct in [5.0, 14.0, 28.0, 47.0, 56.0]:
        i0 = int(ct * sr)
        length = int(0.28 * sr)
        i1 = min(n, i0 + length)
        tt = np.arange(i1 - i0) / sr
        whoosh = 0.05 * np.sin(2 * np.pi * (400 + 900 * tt) * tt) * np.exp(-tt * 8)
        sfx[i0:i1] += whoosh

    mix = music + sfx
    peak = np.max(np.abs(mix)) + 1e-9
    mix = 0.85 * mix / peak
    pcm = (mix * 32767).astype(np.int16)

    out_wav.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(out_wav), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(pcm.tobytes())


def encode_video(_frames_dir: Path, _audio_wav: Path | None, out_mp4: Path, muted: bool = False) -> None:
    """Delegate to the memory-light encoder after frames exist."""
    script = Path(__file__).with_name("encode_zoom_demo.py")
    # encode_zoom_demo writes both outputs via main(); here encode one target.
    import importlib.util

    spec = importlib.util.spec_from_file_location("encode_zoom_demo", script)
    mod = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(mod)
    mod.encode(out_mp4.name, muted=muted)


def main() -> None:
    WORK.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    frames_dir = WORK / "frames"
    frames_dir.mkdir(parents=True, exist_ok=True)

    print("Loading screens...")
    home = upscale(Image.open(ASSETS / "zoom-hi-fi-01-home.png").convert("RGB"))
    hub = upscale(Image.open(ASSETS / "zoom-hi-fi-02-accessibility-hub.png").convert("RGB"))
    prefs = upscale(Image.open(ASSETS / "zoom-hi-fi-03-accessibility-preferences.png").convert("RGB"))
    sign = upscale(Image.open(ASSETS / "zoom-hi-fi-04-sign-language.png").convert("RGB"))
    captions = upscale(Image.open(ASSETS / "zoom-hi-fi-05-caption-customization.png").convert("RGB"))
    meeting = upscale(Image.open(ASSETS / "zoom-hi-fi-06-inclusive-meeting.png").convert("RGB"), scale=2.05)
    post = upscale(make_post_meeting_screen(), scale=1.45)

    # Slightly dim meeting for "challenge" scene
    meeting_challenge = ImageEnhance.Brightness(meeting).enhance(0.92)
    meeting_challenge = ImageEnhance.Contrast(meeting_challenge).enhance(0.9)

    # Timeline (seconds)
    # 1: 0-5, 2: 5-14, 3: 14-28, 4: 28-48, 5: 48-57, 6: 57-63
    duration = 63.0
    nframes = int(duration * FPS)

    click_times = [
        7.2,
        8.6,
        10.4,
        15.2,
        17.0,
        19.0,
        21.2,
        23.4,
        25.6,
        30.5,
        50.2,
        52.8,
    ]

    print("Building audio...")
    audio_wav = WORK / "demo-audio.wav"
    build_audio(duration, click_times, audio_wav)

    print(f"Rendering {nframes} frames...")
    poster_frame = None

    for fi in range(nframes):
        t = fi / FPS
        canvas = get_bg()

        # ---------- Scene 1: challenge ----------
        if t < 5.2:
            local = t
            prog = clamp(local / 5.0)
            scale = lerp(1.0, 1.12, ease(prog))
            focus = lerp2((0.42, 0.45), (0.55, 0.42), ease(prog))
            frame, rect = place_ui(canvas, meeting_challenge, scale=scale, focus=focus, window_scale=0.9)
            # delayed caption overlay
            overlay = Image.new("RGBA", frame.size, (0, 0, 0, 0))
            d = ImageDraw.Draw(overlay)
            cx0, cy0, cx1, cy1 = rect
            box = [cx0 + 40, cy1 - 120, cx1 - 260, cy1 - 50]
            d.rounded_rectangle(box, radius=10, fill=(0, 0, 0, 150))
            font = load_font(26)
            garbled = "Today we will revi…  [caption delayed]"
            if int(local * 2) % 2 == 0:
                garbled = "Today we will reviw the  desgin updtes…"
            d.text((box[0] + 16, box[1] + 18), garbled, font=font, fill=(226, 232, 240, 220))
            frame = Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")
            title_op = scene_opacity(local, 5.0, 0.5)
            frame = draw_title(frame, "Virtual meetings should be accessible to everyone.", title_op, y=70)
            # soft focus on Charlotte-ish area
            if local > 1.5:
                hx, hy = map_point(rect, 0.42, 0.28)
                frame = highlight_rect(
                    frame,
                    (int(hx - 90), int(hy - 70), int(hx + 90), int(hy + 90)),
                    opacity=0.55 * clamp((local - 1.5) / 1.2),
                )

        # ---------- Scene 2: find accessibility ----------
        elif t < 14.0:
            local = t - 5.0
            # home -> hub
            if local < 4.2:
                prog = clamp(local / 4.2)
                scale = lerp(1.0, 1.18, ease(prog))
                focus = lerp2((0.55, 0.58), (0.55, 0.62), ease(prog))
                frame, rect = place_ui(canvas, home, scale=scale, focus=focus, window_scale=0.9)
                keys = [
                    CursorKey(0.0, 0.82, 0.18),
                    CursorKey(1.2, 0.18, 0.88, click=True),  # accessibility card
                    CursorKey(2.4, 0.55, 0.78, click=True),  # all settings
                    CursorKey(3.8, 0.55, 0.78),
                ]
                pos, click = cursor_at(keys, local, rect)
                if local > 1.0:
                    frame = highlight_rect(
                        frame,
                        (
                            int(map_point(rect, 0.08, 0.78)[0]),
                            int(map_point(rect, 0.08, 0.78)[1]),
                            int(map_point(rect, 0.28, 0.95)[0]),
                            int(map_point(rect, 0.28, 0.95)[1]),
                        ),
                        opacity=0.7 * clamp((local - 1.0) / 0.6),
                    )
                frame = draw_cursor(frame, pos, click)
            else:
                prog = clamp((local - 4.2) / 4.5)
                # crossfade home->hub
                a, rect_a = place_ui(canvas, home, scale=1.15, focus=(0.55, 0.75), window_scale=0.9)
                b, rect = place_ui(canvas, hub, scale=lerp(1.0, 1.16, ease(prog)), focus=lerp2((0.55, 0.5), (0.22, 0.72), ease(prog)), window_scale=0.9)
                frame = fade_mix(a, b, clamp((local - 4.2) / 0.7))
                if local > 5.0:
                    frame = highlight_rect(
                        frame,
                        (
                            int(map_point(rect, 0.04, 0.78)[0]),
                            int(map_point(rect, 0.04, 0.78)[1]),
                            int(map_point(rect, 0.22, 0.9)[0]),
                            int(map_point(rect, 0.22, 0.9)[1]),
                        ),
                        opacity=0.85,
                    )
                    frame = draw_callout(
                        frame,
                        "Accessibility hub",
                        (int(map_point(rect, 0.24, 0.84)[0]), int(map_point(rect, 0.24, 0.84)[1])),
                        opacity=clamp((local - 5.2) / 0.4),
                        side="right",
                    )
                keys = [
                    CursorKey(4.2, 0.55, 0.78),
                    CursorKey(5.4, 0.14, 0.84, click=True),
                    CursorKey(7.0, 0.55, 0.28),
                    CursorKey(8.5, 0.55, 0.38, click=True),
                ]
                pos, click = cursor_at(keys, local, rect)
                frame = draw_cursor(frame, pos, click)

        # ---------- Scene 3: personalize ----------
        elif t < 28.0:
            local = t - 14.0
            # sequence: prefs -> sign -> captions
            if local < 4.0:
                prog = clamp(local / 4.0)
                frame, rect = place_ui(
                    canvas,
                    prefs,
                    scale=lerp(1.0, 1.14, ease(prog)),
                    focus=lerp2((0.6, 0.45), (0.62, 0.55), ease(prog)),
                    window_scale=0.9,
                )
                keys = [
                    CursorKey(0.0, 0.72, 0.42),
                    CursorKey(1.2, 0.78, 0.52, click=True),  # captions on
                    CursorKey(2.6, 0.72, 0.58, click=True),
                    CursorKey(3.8, 0.75, 0.58),
                ]
                pos, click = cursor_at(keys, local, rect)
                if local > 1.0:
                    frame = draw_callout(
                        frame,
                        "Enhanced captions",
                        (int(map_point(rect, 0.78, 0.52)[0]), int(map_point(rect, 0.78, 0.52)[1])),
                        opacity=clamp((local - 1.0) / 0.35),
                        side="left",
                    )
                frame = draw_cursor(frame, pos, click)
            elif local < 9.0:
                local2 = local - 4.0
                prog = clamp(local2 / 5.0)
                frame, rect = place_ui(
                    canvas,
                    sign,
                    scale=lerp(1.0, 1.18, ease(prog)),
                    focus=lerp2((0.6, 0.4), (0.62, 0.62), ease(prog)),
                    window_scale=0.9,
                )
                keys = [
                    CursorKey(0.0, 0.8, 0.18, click=True),
                    CursorKey(1.3, 0.7, 0.58, click=True),  # language
                    CursorKey(2.6, 0.55, 0.68, click=True),  # size
                    CursorKey(3.8, 0.72, 0.74, click=True),  # position
                    CursorKey(4.8, 0.85, 0.9, click=True),
                ]
                pos, click = cursor_at(keys, local2, rect)
                if 1.0 < local2 < 2.8:
                    frame = draw_callout(
                        frame,
                        "Preferred language",
                        (int(map_point(rect, 0.7, 0.58)[0]), int(map_point(rect, 0.7, 0.58)[1])),
                        opacity=1.0,
                        side="left",
                    )
                if 3.2 < local2 < 4.6:
                    frame = draw_callout(
                        frame,
                        "Avatar position",
                        (int(map_point(rect, 0.72, 0.74)[0]), int(map_point(rect, 0.72, 0.74)[1])),
                        opacity=1.0,
                        side="left",
                    )
                frame = draw_cursor(frame, pos, click)
            else:
                local3 = local - 9.0
                prog = clamp(local3 / 5.0)
                # crossfade sign -> captions
                a, _ = place_ui(canvas, sign, scale=1.12, focus=(0.65, 0.7), window_scale=0.9)
                frame, rect = place_ui(
                    canvas,
                    captions,
                    scale=lerp(1.0, 1.16, ease(prog)),
                    focus=lerp2((0.55, 0.55), (0.7, 0.72), ease(prog)),
                    window_scale=0.9,
                )
                if local3 < 0.6:
                    frame = fade_mix(a, frame, local3 / 0.6)
                keys = [
                    CursorKey(0.0, 0.4, 0.62),
                    CursorKey(1.2, 0.35, 0.68, click=True),
                    CursorKey(2.4, 0.55, 0.7, click=True),
                    CursorKey(3.6, 0.8, 0.72, click=True),
                    CursorKey(4.8, 0.88, 0.9, click=True),
                ]
                pos, click = cursor_at(keys, local3, rect)
                if 1.5 < local3 < 4.2:
                    frame = draw_callout(
                        frame,
                        "Caption appearance",
                        (int(map_point(rect, 0.55, 0.68)[0]), int(map_point(rect, 0.55, 0.68)[1])),
                        opacity=1.0,
                        side="left",
                    )
                frame = draw_cursor(frame, pos, click)

        # ---------- Scene 4: live meeting ----------
        elif t < 48.0:
            local = t - 28.0
            prog = clamp(local / 20.0)
            # enter with soft zoom
            enter = ease_out(clamp(local / 1.2))
            scale = lerp(1.04, 1.2, ease(prog))
            focus = lerp2((0.45, 0.48), (0.58, 0.52), ease(math.sin(prog * math.pi) * 0.5 + 0.5 * prog))
            # subtle focus drift
            focus = (
                focus[0] + 0.02 * math.sin(local * 0.35),
                focus[1] + 0.015 * math.cos(local * 0.28),
            )
            frame, rect = place_ui(
                canvas,
                meeting,
                scale=scale,
                focus=focus,
                window_scale=lerp(0.86, 0.94, enter),
            )

            # animated caption / chat reveal overlays on the right panel
            overlay = Image.new("RGBA", frame.size, (0, 0, 0, 0))
            d = ImageDraw.Draw(overlay)
            # live caption chip near bottom of video area
            messages = [
                (2.0, "Alex: Let's walk through the accessibility updates."),
                (6.0, "Charlotte: Captions and ASL are both clear for me."),
                (10.5, "Sarah: We'll keep the avatar in the bottom-right."),
                (14.5, "Alex: Perfect — beta details go out after this."),
            ]
            for mt, msg in messages:
                age = local - mt
                if age < 0 or age > 4.2:
                    continue
                op = clamp(age / 0.35) * clamp((4.2 - age) / 0.5)
                bx0 = int(map_point(rect, 0.08, 0.78)[0])
                by0 = int(map_point(rect, 0.08, 0.78)[1]) - int(20 * (1 - op))
                font = load_font(22)
                bb = d.textbbox((0, 0), msg, font=font)
                tw = bb[2] - bb[0]
                d.rounded_rectangle(
                    [bx0, by0, bx0 + tw + 28, by0 + 40],
                    radius=10,
                    fill=(0, 0, 0, int(160 * op)),
                )
                d.text((bx0 + 14, by0 + 8), msg, font=font, fill=(255, 255, 255, int(240 * op)))

            # active speaker pulse on Alex tile
            pulse = 0.5 + 0.5 * math.sin(local * 3.2)
            ax, ay = map_point(rect, 0.18, 0.22)
            # switch speaker mid-scene
            if local > 9.0:
                ax, ay = map_point(rect, 0.42, 0.22)  # Charlotte
            d.rounded_rectangle(
                [int(ax - 110), int(ay - 80), int(ax + 110), int(ay + 95)],
                radius=14,
                outline=(34, 197, 94, int(120 + 100 * pulse)),
                width=4,
            )

            # avatar motion hint (subtle bob on avatar tile)
            avx, avy = map_point(rect, 0.58, 0.72)
            bob = int(4 * math.sin(local * 5.0))
            d.ellipse(
                [int(avx - 8), int(avy - 8 + bob), int(avx + 8), int(avy + 8 + bob)],
                fill=(45, 140, 255, 0),
            )
            # soft highlight around avatar + interpreter controls
            if local > 3.0:
                d.rounded_rectangle(
                    [
                        int(map_point(rect, 0.48, 0.58)[0]),
                        int(map_point(rect, 0.48, 0.58)[1]),
                        int(map_point(rect, 0.68, 0.88)[0]),
                        int(map_point(rect, 0.68, 0.88)[1]),
                    ],
                    radius=12,
                    outline=(45, 140, 255, int(40 + 50 * pulse)),
                    width=2,
                )
            frame = Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")

            # callouts
            if 4.0 < local < 8.0:
                frame = draw_callout(
                    frame,
                    "Live captions",
                    (int(map_point(rect, 0.82, 0.35)[0]), int(map_point(rect, 0.82, 0.35)[1])),
                    opacity=1.0,
                    side="left",
                )
            if 8.5 < local < 12.5:
                frame = draw_callout(
                    frame,
                    "Sign-language avatar",
                    (int(map_point(rect, 0.58, 0.78)[0]), int(map_point(rect, 0.58, 0.78)[1])),
                    opacity=1.0,
                    side="left",
                )
            if 13.0 < local < 17.0:
                frame = draw_callout(
                    frame,
                    "Accessibility controls",
                    (int(map_point(rect, 0.82, 0.82)[0]), int(map_point(rect, 0.82, 0.82)[1])),
                    opacity=1.0,
                    side="left",
                )

            # gentle cursor idle over controls
            keys = [
                CursorKey(0.0, 0.75, 0.3),
                CursorKey(5.0, 0.82, 0.4),
                CursorKey(10.0, 0.6, 0.75),
                CursorKey(15.0, 0.85, 0.85),
                CursorKey(19.0, 0.7, 0.5),
            ]
            pos, click = cursor_at(keys, local, rect)
            frame = draw_cursor(frame, pos, click * 0.4)

            if 8.0 < local < 12.0:
                poster_frame = frame.copy()

        # ---------- Scene 5: post-meeting ----------
        elif t < 57.0:
            local = t - 48.0
            # leave meeting -> post summary
            if local < 2.2:
                prog = clamp(local / 2.2)
                frame, rect = place_ui(canvas, meeting, scale=1.08, focus=(0.75, 0.9), window_scale=0.9)
                frame = highlight_rect(
                    frame,
                    (
                        int(map_point(rect, 0.9, 0.9)[0]) - 40,
                        int(map_point(rect, 0.9, 0.9)[1]) - 24,
                        int(map_point(rect, 0.98, 0.98)[0]),
                        int(map_point(rect, 0.98, 0.98)[1]),
                    ),
                    opacity=0.9,
                )
                keys = [CursorKey(0.0, 0.7, 0.5), CursorKey(1.4, 0.94, 0.94, click=True), CursorKey(2.1, 0.94, 0.94)]
                pos, click = cursor_at(keys, local, rect)
                frame = draw_cursor(frame, pos, click)
            else:
                local2 = local - 2.2
                a, _ = place_ui(canvas, meeting, scale=1.05, focus=(0.9, 0.92), window_scale=0.9)
                frame, rect = place_ui(
                    canvas,
                    post,
                    scale=lerp(1.0, 1.12, ease(clamp(local2 / 7.5))),
                    focus=lerp2((0.55, 0.4), (0.55, 0.62), ease(clamp(local2 / 7.5))),
                    window_scale=0.9,
                )
                if local2 < 0.7:
                    frame = fade_mix(a, frame, local2 / 0.7)
                if local2 > 1.0:
                    frame = draw_callout(
                        frame,
                        "Meeting transcript",
                        (int(map_point(rect, 0.35, 0.28)[0]), int(map_point(rect, 0.35, 0.28)[1])),
                        opacity=clamp((local2 - 1.0) / 0.35) * clamp((4.5 - local2) / 0.4),
                        side="right",
                    )
                if local2 > 3.2:
                    frame = draw_callout(
                        frame,
                        "Key decisions",
                        (int(map_point(rect, 0.4, 0.48)[0]), int(map_point(rect, 0.4, 0.48)[1])),
                        opacity=clamp((local2 - 3.2) / 0.35) * clamp((6.5 - local2) / 0.4),
                        side="right",
                    )
                if local2 > 5.2:
                    frame = draw_callout(
                        frame,
                        "Accessible recap",
                        (int(map_point(rect, 0.4, 0.62)[0]), int(map_point(rect, 0.4, 0.62)[1])),
                        opacity=clamp((local2 - 5.2) / 0.35),
                        side="right",
                    )
                keys = [
                    CursorKey(0.0, 0.4, 0.25),
                    CursorKey(2.0, 0.45, 0.35, click=True),
                    CursorKey(4.0, 0.5, 0.5),
                    CursorKey(6.5, 0.5, 0.65),
                ]
                pos, click = cursor_at(keys, local2, rect)
                frame = draw_cursor(frame, pos, click)

        # ---------- Scene 6: close ----------
        else:
            local = t - 57.0
            prog = clamp(local / 6.0)
            frame, rect = place_ui(
                canvas,
                meeting,
                scale=lerp(1.05, 1.14, ease(prog)),
                focus=(0.5, 0.48),
                window_scale=0.92,
            )
            title_op = clamp((local - 0.35) / 0.45) * clamp((5.5 - local) / 0.5)
            frame = draw_title(
                frame,
                "Designed for clearer, more independent participation.",
                title_op,
                y=H - 140,
            )

        # global vignette for polish
        vig = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        vd = ImageDraw.Draw(vig)
        vd.rectangle([0, 0, W, 70], fill=(0, 0, 0, 35))
        vd.rectangle([0, H - 70, W, H], fill=(0, 0, 0, 45))
        frame = Image.alpha_composite(frame.convert("RGBA"), vig).convert("RGB")

        # save
        frame.save(frames_dir / f"frame_{fi:05d}.jpg", quality=92, optimize=True)
        if fi % 30 == 0:
            print(f"  {fi}/{nframes} ({100 * fi / nframes:.1f}%)")

    if poster_frame is None:
        # fallback: middle of scene 4
        poster_frame = Image.open(frames_dir / f"frame_{int(38 * FPS):05d}.jpg")
    poster_path = OUT_DIR / "zoom-accessibility-demo-poster.jpg"
    poster_frame.resize((1920, 1080), Image.Resampling.LANCZOS).save(poster_path, quality=93)
    print(f"Poster: {poster_path}")

    print("Encoding with sound...")
    out_sound = OUT_DIR / "zoom-accessibility-demo.mp4"
    encode_video(frames_dir, audio_wav, out_sound, muted=False)
    print(f"Wrote {out_sound}")

    print("Encoding muted autoplay version...")
    out_muted = OUT_DIR / "zoom-accessibility-demo-muted.mp4"
    encode_video(frames_dir, audio_wav, out_muted, muted=True)
    print(f"Wrote {out_muted}")

    # also copy a webm-friendly note via re-encode smaller? keep mp4 only.
    print("Done.")


if __name__ == "__main__":
    main()
