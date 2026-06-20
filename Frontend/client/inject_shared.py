#!/usr/bin/env python3
"""Inject shared CSS/JS into all client HTML pages and fix CSS image paths."""
import re
from pathlib import Path

CLIENT = Path(__file__).parent
CSS_DIR = CLIENT / "css"

SHARED_CSS = '  <link rel="stylesheet" href="{prefix}css/shared.css">\n'
SHARED_JS = '  <script src="{prefix}js/auth.js"></script>\n  <script src="{prefix}js/app.js"></script>\n'

def inject_html(html_path: Path):
    content = html_path.read_text(encoding="utf-8")
    if "shared.css" in content:
        return False

    in_components = "components" in html_path.parts
    prefix = "../" if in_components else "./"

    css_tag = SHARED_CSS.format(prefix=prefix)
    js_tags = SHARED_JS.format(prefix=prefix)

    content = re.sub(
        r'(</head>)',
        css_tag + js_tags + r'\1',
        content,
        count=1
    )
    html_path.write_text(content, encoding="utf-8")
    return True

def fix_css_urls(css_path: Path):
    content = css_path.read_text(encoding="utf-8")
    fixed = content.replace("url(../Pictures/", "url(../../Pictures/")
    if fixed != content:
        css_path.write_text(fixed, encoding="utf-8")
        return True
    return False

def main():
    html_count = 0
    for html in sorted(CLIENT.rglob("*.html")):
        if html.name == "index.html":
            continue
        if inject_html(html):
            html_count += 1
            print(f"  + {html.relative_to(CLIENT)}")

    css_count = 0
    for css in sorted(CSS_DIR.glob("*.css")):
        if css.name == "shared.css":
            continue
        if fix_css_urls(css):
            css_count += 1
            print(f"  ~ {css.name}")

    print(f"\nDone: {html_count} HTML files updated, {css_count} CSS files fixed.")

if __name__ == "__main__":
    main()
