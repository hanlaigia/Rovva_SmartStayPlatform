#!/usr/bin/env python3
"""Convert Figma inline-style HTML exports to proper HTML + external CSS with Pictures paths."""

import re
from pathlib import Path

CLIENT_DIR = Path(__file__).parent
PICTURES_DIR = CLIENT_DIR.parent / "Pictures"
CSS_DIR = CLIENT_DIR / "css"

SHARED_IMAGES = {
    "144x46": "Logo.jpg",
    "1478x771": "footer.jpg",
    "350x112": "Logo.jpg",
    "644x259": "footer2.jpg",
}

HEADER_SHARED = "P_Header_Tong_Luu_Tru&Chi_Tiet_Co_So_Luu_Tru.png"
HEADER_PAGES = {
    "Tong_Luu_Tru",
    "Chi_Tiet_Co_So_Luu_Tru_Hotel",
    "Chi_Tiet_Co_So_Luu_Tru_Can_Ho",
}

SECTION_IMAGES = {
    "dac_quyen": ["P1_Dac_quyen&Khuyen_mai.jpg", "P2_Dac_quyen&Khuyen_mai.jpg"],
    "tro_ly": ["P1_Tro_ly_Rovva AI_2.jpg", "P2_Tro_ly_Rovva AI_2.jpg"],
    "xu_thuong": ["P_Xu_thuong.jpg"],
}


PAGE_NAME_OVERRIDES = {
    "popup_xemchitietphong": "Xem_Chi_Tiet_Phong",
    "popup_xacnhandangxuat": "Xac_Nhan_Dang_Xuat",
    "popup_dadangxuat": "Da_Dang_Xuat",
    "popup_dangxacnhanthanhtoan": "Dang_Xac_Nhan_Thanh_Toan",
    "popup_thongtincanhan": "Thong_Tin_Ca_Nhan",
}


def get_page_name(page_slug: str) -> str:
    if page_slug in PAGE_NAME_OVERRIDES:
        return PAGE_NAME_OVERRIDES[page_slug]
    return camel_to_snake(page_slug)


def camel_to_snake(name: str) -> str:
    base = Path(name).stem
    s = re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", base)
    parts = []
    for part in s.split("_"):
        sub = re.sub(r"([a-z])([A-Z])", r"\1_\2", part)
        parts.extend(sub.split("_"))
    result = "_".join(p for p in parts if p)
    return re.sub(r"([a-zA-Z])(\d+)$", r"\1_\2", result)


def pictures_rel(html_path: Path) -> str:
    depth = len(html_path.relative_to(CLIENT_DIR).parts) - 1
    return "/".join([".."] * (depth + 1)) + "/Pictures/"


def css_rel(html_path: Path, css_name: str) -> str:
    depth = len(html_path.relative_to(CLIENT_DIR).parts) - 1
    prefix = "/".join([".."] * depth) if depth else "."
    return f"{prefix}/css/{css_name}"


def parse_size(url: str) -> str | None:
    m = re.search(r"placehold\.co/(\d+x\d+)", url)
    return m.group(1) if m else None


def is_header_size(size: str) -> bool:
    return size in ("1440x188", "1440x1130", "1440x1106")


def existing_file(name: str) -> str | None:
    for ext in ("", ".jpg", ".png", ".jpeg", ".webp"):
        candidate = name if ext == "" else name.rsplit(".", 1)[0] + ext if "." in name else name + ext
        path = PICTURES_DIR / candidate
        if path.exists():
            return candidate
    if (PICTURES_DIR / name).exists():
        return name
    return None


def replace_placeholders_in_html(html: str, page_name: str, pics_prefix: str) -> str:
    content_n = [1]
    header_done = [False]
    dac_idx = [0]
    tro_idx = [0]

    def next_content_path() -> str:
        n = content_n[0]
        content_n[0] += 1
        for ext in (".jpg", ".png", ".jpeg", ".webp"):
            c = f"P{n}_{page_name}{ext}"
            if (PICTURES_DIR / c).exists():
                return pics_prefix + c
        return pics_prefix + f"P{n}_{page_name}.jpg"

    def resolve(size: str, pos: int) -> str:
        if size in SHARED_IMAGES:
            return pics_prefix + SHARED_IMAGES[size]

        ctx = html[max(0, pos - 400) : min(len(html), pos + 400)].lower()

        if is_header_size(size) and not header_done[0]:
            header_done[0] = True
            if page_name in HEADER_PAGES and (PICTURES_DIR / HEADER_SHARED).exists():
                return pics_prefix + HEADER_SHARED
            for ext in (".png", ".jpg", ".jpeg"):
                c = f"P1_Header_{page_name}{ext}"
                if (PICTURES_DIR / c).exists():
                    return pics_prefix + c
            return pics_prefix + f"P1_Header_{page_name}.jpg"

        if "đặc quyền" in ctx or "khuyến mãi" in ctx:
            i = min(dac_idx[0], len(SECTION_IMAGES["dac_quyen"]) - 1)
            dac_idx[0] += 1
            return pics_prefix + SECTION_IMAGES["dac_quyen"][i]

        if "trợ lý" in ctx or "rovva ai" in ctx:
            i = min(tro_idx[0], len(SECTION_IMAGES["tro_ly"]) - 1)
            tro_idx[0] += 1
            return pics_prefix + SECTION_IMAGES["tro_ly"][i]

        if "xu thưởng" in ctx:
            return pics_prefix + SECTION_IMAGES["xu_thuong"][0]

        return next_content_path()

    def sub_img(m: re.Match) -> str:
        tag = m.group(0)
        src = m.group(1)
        size = parse_size(src)
        if not size:
            return tag
        new = resolve(size, m.start())
        return tag.replace(src, new, 1)

    html = re.sub(r'<img\b[^>]*\bsrc="(https://placehold\.co/[^"]+)"[^>]*>', sub_img, html)

    def sub_bg(m: re.Match) -> str:
        url = m.group(1)
        size = parse_size(url)
        if not size:
            return m.group(0)
        new = resolve(size, m.start())
        return f"background-image: url({new})"

    html = re.sub(r"background-image:\s*url\((https://placehold\.co/[^)]+)\)", sub_bg, html)
    return html


def extract_styles(html: str) -> tuple[str, dict[str, str]]:
    style_map: dict[str, str] = {}
    counter = [0]

    def to_class(style: str) -> str:
        style = style.strip()
        if style not in style_map:
            counter[0] += 1
            style_map[style] = f"c-{counter[0]}"
        return style_map[style]

    def repl(m: re.Match) -> str:
        return f' class="{to_class(m.group(1))}"'

    html = re.sub(r'\sstyle="([^"]*)"', repl, html)
    return html, {v: k for k, v in style_map.items()}


def page_title(page_name: str) -> str:
    titles = {
        "Tong_Luu_Tru": "Tổng lưu trú - Rovva",
        "Trang_Khach": "Trang khách - Rovva",
        "Dang_Nhap": "Đăng nhập - Rovva",
        "Dang_Ky": "Đăng ký - Rovva",
        "Trang_Chu_Da_Dang_Nhap": "Trang chủ - Rovva",
        "Chi_Tiet_Co_So_Luu_Tru_Hotel": "Chi tiết khách sạn - Rovva",
        "Chi_Tiet_Co_So_Luu_Tru_Can_Ho": "Chi tiết căn hộ - Rovva",
        "Dat_Phong_Thanh_Toan_Trang_Thai_1": "Đặt phòng & Thanh toán - Rovva",
        "Dat_Phong_Thanh_Toan_Trang_Thai_2": "Đặt phòng & Thanh toán - Rovva",
        "Dat_Phong_Thanh_Toan_Trang_Thai_3": "Đặt phòng & Thanh toán - Rovva",
        "Tai_Khoan_Thong_Tin_Ca_Nhan": "Thông tin cá nhân - Rovva",
        "popup_xacnhandangxuat": "Xác nhận đăng xuất",
        "popup_dadangxuat": "Đã đăng xuất",
        "popup_dangxacnhanthanhtoan": "Xác nhận thanh toán",
        "popup_xemchitietphong": "Chi tiết phòng",
        "popup_thongtincanhan": "Thông tin cá nhân",
    }
    return titles.get(page_name, f"Rovva - {page_name.replace('_', ' ')}")


def wrap_html(body: str, title: str, css_href: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{css_href}">
</head>
<body>
{body}
</body>
</html>
"""


def build_css(class_to_style: dict[str, str], page_slug: str) -> str:
    lines = [
        "/* Rovva Client */",
        "* { margin: 0; padding: 0; box-sizing: border-box; }",
        "body { font-family: 'Inter', system-ui, sans-serif; background: #fff; }",
        f".page-{page_slug} {{ margin: 0 auto; }}",
        "img { max-width: 100%; display: block; }",
        "",
    ]
    for cls in sorted(class_to_style, key=lambda x: int(x.split("-")[1])):
        lines.append(f".{cls} {{ {class_to_style[cls]} }}")
        lines.append("")
    return "\n".join(lines)


def convert_tailwind_popup(html_path: Path, raw: str) -> None:
    """popup_dadangxuat uses Tailwind - wrap only, keep utility classes."""
    page_slug = html_path.stem
    css_path = CSS_DIR / f"{page_slug}.css"
    CSS_DIR.mkdir(parents=True, exist_ok=True)
    css_path.write_text(
        "/* popup_dadangxuat - Tailwind utilities inlined via CDN */\n"
        "body { font-family: 'Inter', system-ui, sans-serif; margin: 0; }\n",
        encoding="utf-8",
    )
    body = raw.strip()
    css_href = css_rel(html_path, f"{page_slug}.css")
    full = wrap_html(body, page_title(page_slug), css_href)
    full = full.replace(
        "</head>",
        '  <script src="https://cdn.tailwindcss.com"></script>\n</head>',
    )
    if 'class="page-' not in body[:200]:
        full = full.replace(f"<body>\n{body}", f'<body>\n<div class="page-{page_slug}">\n{body}\n</div>', 1)
    html_path.write_text(full, encoding="utf-8")
    print(f"Converted (tailwind): {html_path.name}")


def convert_file(html_path: Path) -> None:
    raw = html_path.read_text(encoding="utf-8")
    if raw.lstrip().startswith("<!DOCTYPE"):
        print(f"Skip: {html_path.name}")
        return

    page_slug = html_path.stem
    page_name = get_page_name(page_slug)

    if 'class="' in raw and 'style="' not in raw and "tailwind" in raw.lower() or (
        page_slug == "popup_dadangxuat" and "tailwind" not in raw and "class=" in raw
    ):
        convert_tailwind_popup(html_path, raw)
        return

    pics_prefix = pictures_rel(html_path)
    html = replace_placeholders_in_html(raw, page_name, pics_prefix)
    body, class_to_style = extract_styles(html)

    body = body.strip()
    if body.startswith('<div class="'):
        body = re.sub(
            r'^<div class="([^"]+)"',
            rf'<div class="page-{page_slug} \1"',
            body,
            count=1,
        )
    elif body.startswith("<div"):
        body = re.sub(r"^<div", f'<div class="page-{page_slug}"', body, count=1)

    css_name = f"{page_slug}.css"
    CSS_DIR.mkdir(parents=True, exist_ok=True)
    (CSS_DIR / css_name).write_text(build_css(class_to_style, page_slug), encoding="utf-8")

    html_path.write_text(
        wrap_html(body, page_title(page_name), css_rel(html_path, css_name)),
        encoding="utf-8",
    )
    print(f"Converted: {html_path.name} -> css/{css_name} ({len(class_to_style)} classes)")


def main():
    for p in sorted(CLIENT_DIR.rglob("*.html")):
        convert_file(p)
    print("Done.")


if __name__ == "__main__":
    main()
