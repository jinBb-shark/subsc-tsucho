"""サブスク通帳: app/ の内容から、ふつうのブラウザ向けの公開用ファイルを docs/ に作る。

使い方:  python build_site.py
  - app/index.html  … claude.ai と共通の本体（<html> や <head> を持たない形）
  - app/catalog.js  … 価格カタログ（毎月の更新はこのファイルだけ）
  - app/config.js   … 公開用の設定（アプリのURL・Firebase の接続先）
  - app/og.png      … リンクを共有したときに表示される画像（1200×630）
  - docs/           … GitHub Pages が公開するファイル一式（このスクリプトが毎回作り直す）
"""
import json
import os
import re
import shutil
import struct
import zlib

ROOT = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(ROOT, 'app')
OUT = os.path.join(ROOT, 'docs')

NAVY = (0x17, 0x43, 0x6b)
GOLD = (0xd8, 0xb2, 0x5a)
PAPER = '#edf2f0'


def write(name, text):
    with open(os.path.join(OUT, name), 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)


def png_icon(path, n):
    """通帳の表紙をかたどったアイコン（藍の地に金の枠と罫線）を、外部ライブラリなしで描く。"""
    inset, line = int(n * 0.12), max(2, int(n * 0.028))
    rules = [int(n * r) for r in (0.42, 0.54, 0.66)]
    seal = (int(n * 0.58), int(n * 0.20), int(n * 0.74), int(n * 0.32))  # 右上の小さな印
    rows = []
    for y in range(n):
        row = bytearray([0])
        for x in range(n):
            c = NAVY
            inside = inset <= x < n - inset and inset <= y < n - inset
            if inside and (x < inset + line or x >= n - inset - line or y < inset + line or y >= n - inset - line):
                c = GOLD
            if any(r <= y < r + line for r in rules) and int(n * 0.26) <= x < int(n * 0.74):
                c = GOLD
            if seal[0] <= x < seal[2] and seal[1] <= y < seal[3]:
                c = GOLD
            row += bytes(c)
        rows.append(bytes(row))

    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    data = (b'\x89PNG\r\n\x1a\n'
            + chunk(b'IHDR', struct.pack('>IIBBBBB', n, n, 8, 2, 0, 0, 0))
            + chunk(b'IDAT', zlib.compress(b''.join(rows), 9))
            + chunk(b'IEND', b''))
    with open(path, 'wb') as f:
        f.write(data)


def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)

    src = open(os.path.join(APP, 'index.html'), encoding='utf-8').read()
    m = re.match(r'\s*<title>(.*?)</title>\s*', src, re.S)
    title = m.group(1) if m else 'サブスク通帳'
    body = src[m.end():] if m else src
    body = body.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '', 1)

    catalog = open(os.path.join(APP, 'catalog.js'), encoding='utf-8').read()
    config = open(os.path.join(APP, 'config.js'), encoding='utf-8').read()
    version = (re.search(r'version:\s*"([^"]+)"', catalog) or [None, 'dev'])[1]
    build = f'{version}-{zlib.crc32((src + catalog + config).encode()) & 0xffffffff:08x}'
    app_url = (re.search(r'appUrl:\s*"([^"]+)"', config) or [None, ''])[1]
    desc = '大学生向けのサブスク管理。支払日カレンダー・学割・卒業後の料金の試算・みんなの人気ランキング。データはあなたのブラウザの中だけに保存します。'
    og = [
        '<meta property="og:type" content="website">',
        f'<meta property="og:title" content="{title}">',
        f'<meta property="og:description" content="{desc}">',
        '<meta property="og:site_name" content="サブスク通帳">',
        '<meta property="og:locale" content="ja_JP">',
    ]
    if app_url:
        og += [
            f'<meta property="og:url" content="{app_url}">',
            f'<meta property="og:image" content="{app_url}og.png">',
            '<meta property="og:image:width" content="1200">',
            '<meta property="og:image:height" content="630">',
        ]
    og.append('<meta name="twitter:card" content="summary_large_image">')
    og = '\n'.join(og) + '\n'

    head = f'''<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https://firestore.googleapis.com; manifest-src 'self'; worker-src 'self'; base-uri 'none'">
<meta name="referrer" content="no-referrer">
<title>{title}</title>
<meta name="description" content="{desc}">
{og}<meta name="theme-color" content="#17436b">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icon-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="サブスク通帳">
<style>:root{{box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}body{{margin:0}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
</head>
<body>
'''
    tail = '''
<script>if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(function () {});</script>
</body>
</html>
'''
    write('index.html', head + body + tail)
    write('catalog.js', catalog)
    write('config.js', config)
    if os.path.exists(os.path.join(APP, 'og.png')):
        shutil.copyfile(os.path.join(APP, 'og.png'), os.path.join(OUT, 'og.png'))
    write('manifest.webmanifest', json.dumps({
        'name': 'サブスク通帳', 'short_name': 'サブスク通帳', 'lang': 'ja',
        'start_url': './', 'scope': './', 'display': 'standalone',
        'background_color': PAPER, 'theme_color': '#17436b',
        'icons': [
            {'src': 'icon-192.png', 'sizes': '192x192', 'type': 'image/png'},
            {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png'},
            {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'},
        ],
    }, ensure_ascii=False, indent=2))
    write('sw.js', f'''// サブスク通帳: オフラインでも開けるようにするための最小限のキャッシュ（新しい版を優先して取りに行く）
const CACHE = 'subsc-tsucho-{build}';
const FILES = ['./', './index.html', './config.js', './catalog.js', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {{ e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); }});
self.addEventListener('activate', e => {{
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
}});
self.addEventListener('fetch', e => {{
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return; // Firebase との通信には触れない
  e.respondWith(fetch(e.request).then(res => {{
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(e.request, copy));
    return res;
  }}).catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html'))));
}});
''')
    write('icon.svg', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#17436b"/><rect x="7" y="7" width="50" height="50" rx="6" fill="none" stroke="#d8b25a" stroke-width="2.5"/><text x="32" y="43" font-size="30" text-anchor="middle" fill="#d8b25a" font-family="Hiragino Mincho ProN, Yu Mincho, serif" font-weight="700">通</text></svg>
''')
    for n in (180, 192, 512):
        png_icon(os.path.join(OUT, f'icon-{n}.png'), n)
    write('.nojekyll', '')
    print(f'built docs/ ({build})')


if __name__ == '__main__':
    main()
