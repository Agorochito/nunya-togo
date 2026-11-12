"""Static preview of dist/ with the response headers declared in vercel.json. No API server.

The headers come from vercel.json itself, so local runs and CI see the same Content-Security-Policy,
X-Frame-Options and worker policies as production (5.28.2). Only the source forms used there are
supported: literal paths and literal paths with regex groups such as "/(.*)".
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse, functools, json, re

ROOT = Path(__file__).resolve().parent.parent

def source_regex(source):
  out, depth = '', 0
  for ch in source:
    if ch == '(': depth += 1
    if depth: out += ch
    else: out += re.escape(ch)
    if ch == ')': depth -= 1
  return re.compile(out)

RULES = [(source_regex(r['source']), r['headers']) for r in json.loads((ROOT / 'vercel.json').read_text(encoding='utf-8'))['headers']]

def headers_for(path):
  found = {}
  for rx, headers in RULES:
    if rx.fullmatch(path):
      for h in headers: found[h['key']] = h['value']
  return found

class Handler(SimpleHTTPRequestHandler):
  def end_headers(self):
    for key, value in headers_for(self.path.split('?')[0].split('#')[0]).items():
      self.send_header(key, value)
    return super().end_headers()

if __name__ == '__main__':
  parser = argparse.ArgumentParser(); parser.add_argument('--port', type=int, default=4176); args = parser.parse_args()
  ThreadingHTTPServer(('127.0.0.1', args.port), functools.partial(Handler, directory=str(ROOT / 'dist'))).serve_forever()
