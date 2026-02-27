/**
 * Thunder Warrior 调试脚本
 * 使用方法: node debug-thunder-warrior.js
 * 需要先安装: npm install puppeteer
 */

const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 启动浏览器...');
  
  const browser = await puppeteer.launch({
    headless: false,      // 显示浏览器窗口
    devtools: true,       // 打开开发者工具
    defaultViewport: { width: 400, height: 700 }  // 手机尺寸
  });
  
  const page = await browser.newPage();
  
  // 监听 console
  page.on('console', msg => {
    console.log('🖥️  [CONSOLE]', msg.text());
  });
  
  // 监听页面错误
  page.on('pageerror', err => {
    console.error('❌  [PAGE ERROR]', err.message);
  });
  
  // 监听请求失败
  page.on('requestfailed', req => {
    console.log('⚠️  [FAILED]', req.url());
  });
  
  console.log('📱 打开 https://xinde.github.io/thunder-warrior/');
  
  await page.goto('https://xinde.github.io/thunder-warrior/', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  
  console.log('✅ 页面加载完成！');
  console.log('📋 开始游戏，然后查看 console 日志');
  console.log('💡 按 Ctrl+C 结束调试');
  
  // 保持进程
  process.stdin.resume();
})();
