"""Static preview with the same code-worker CSP as Vercel. No API server."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
policy="default-src 'none'; script-src 'unsafe-eval'; connect-src 'self'; worker-src 'none'; base-uri 'none'"
class Handler(SimpleHTTPRequestHandler):
 def end_headers(self):
  if self.path.split('?')[0] in ['/coding-http-worker.js','/coding-javascript-worker.js']:
   self.send_header('Content-Security-Policy',policy)
  if self.path.split('?')[0]=='/coding-sql-worker.js':
   self.send_header('Content-Security-Policy',"default-src 'none'; script-src 'wasm-unsafe-eval'; connect-src 'self'; worker-src 'none'; base-uri 'none'")
  return super().end_headers()
parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=4176);args=parser.parse_args()
import functools
ThreadingHTTPServer(('127.0.0.1',args.port),functools.partial(Handler,directory=str(Path(__file__).resolve().parent.parent/'dist'))).serve_forever()
