"""Allowlisted HTML output: no scripts, iframes, styles, images, or event attributes."""
import sys,json,html,re
from html.parser import HTMLParser
from urllib.parse import urlparse
class Clean(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.out=[];self.skip=0
 def handle_starttag(self,tag,attrs):
  if tag in ['script','style','iframe','object','svg','form']:self.skip+=1;return
  if self.skip:return
  allowed={'p','h1','h2','h3','h4','h5','h6','ul','ol','li','dl','dt','dd','pre','code','strong','em','b','i','blockquote','a','br','hr','table','thead','tbody','tr','th','td','caption','details','summary','sup','sub','kbd','samp','div','span'}
  if tag not in allowed:return
  safe=[]
  for k,v in attrs:
   if tag=='a' and k=='href' and v and (v.startswith(('#','/')) or urlparse(v).scheme in ['https','http']):safe.append(('href',v))
   if k in ['colspan','rowspan'] and re.fullmatch(r'\d{1,2}',v or ''):safe.append((k,v))
  self.out.append('<'+tag+''.join(' '+k+'="'+html.escape(v,quote=True)+'"' for k,v in safe)+'>')
 def handle_endtag(self,tag):
  if tag in ['script','style','iframe','object','svg','form']:
   self.skip=max(0,self.skip-1);return
  if self.skip:return
  if tag in {'p','h1','h2','h3','h4','h5','h6','ul','ol','li','dl','dt','dd','pre','code','strong','em','b','i','blockquote','a','table','thead','tbody','tr','th','td','caption','details','summary','sup','sub','kbd','samp','div','span'}:self.out.append('</'+tag+'>')
 def handle_data(self,data):
  if not self.skip:self.out.append(html.escape(data))
for line in sys.stdin:
 item=json.loads(line);p=Clean();p.feed(item['html']);item['html']=''.join(p.out);print(json.dumps(item,ensure_ascii=False))
