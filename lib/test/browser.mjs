import {existsSync} from 'node:fs';
export function launchTestBrowser(chromium){const configured=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,mac='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';return chromium.launch({headless:true,...(configured?{executablePath:configured}:existsSync(mac)?{executablePath:mac}:{})})}
