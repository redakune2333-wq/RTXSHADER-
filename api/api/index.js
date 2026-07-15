export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const country = request.headers.get('x-vercel-ip-country') || '';
  const ua = request.headers.get('user-agent') || '';

  const isMobile = /android|iphone|ipad|ipod/i.test(ua);
  const isRealBot = /googlebot|bingbot|yandex|baiduspider|headless|selenium|puppeteer|lighthouse|crawler|spider/i.test(ua);

  if (!isMobile || isRealBot) {
    return Response.redirect('https://ar.wikipedia.org/wiki/ماينكرافت', 302);
  }

  const blacklistedCountries = ['US', 'IE', 'GB', 'DE', 'FR'];
  if (country && blacklistedCountries.includes(country.toUpperCase())) {
    return Response.redirect('https://ar.wikipedia.org/wiki/ماينكرافت', 302);
  }

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="ar" dir="rtl">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>بوابة التنزيل - RTX Bedrock</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&display=swap" rel="stylesheet">
      
      <style>
          :root { --bg-dark: #121214; --text-primary: #ffffff; }
          body, html { margin: 0; padding: 0; width: 100%; min-height: 100vh; background-color: #ffffff; font-family: 'Cairo', sans-serif; overflow-x: hidden; }
          .top-header { width: 100%; padding: 15px 20px; background: #FFFFFF; border-bottom: 2px solid #e0e0e0; text-align: left; direction: ltr; }
          .brand-name { font-size: 23px; font-weight: 900; color: #000; text-transform: uppercase; display: block; }
          .mod-name { font-size: 15px; font-weight: 900; color: #000; display: block; margin-top: -4px; }
          .content-container { max-width: 500px; margin: 0 auto; padding: 0 0 40px 0; }
          .hook-text { font-size: 18px; font-weight: 900; text-align: center; color: #000; margin: 20px 0 12px 0; padding: 0 20px; }
          .image-box { width: calc(100% - 40px); margin: 0 auto 15px auto; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.15); }
          .image-box img { width: 100%; height: auto; display: block; }
          .cpa-instructions { background: #f8f9fa; border: 2px solid #e9ecef; padding: 12px; border-radius: 8px; margin: 15px; font-size: 15px; font-weight: 900; text-align: center; color: #000; }
          
          /* الحاوية السوداء التي ستستقبل عروض CPAGrip */
          #offers-wrapper { background-color: var(--bg-dark); padding: 20px; margin-top: 20px; border-top-left-radius: 20px; border-top-right-radius: 20px; min-height: 300px; }
      </style>
  </head>
  <body>
      <div class="top-header">
          <span class="brand-name">RTX bedrock</span>
          <span class="mod-name">dragon bedrock</span>
      </div>

      <div class="content-container">
          <div class="hook-text">شكل ماين كرافت العادية الكئيبة 🤢 ضد شكل الشادر الجديد 😍</div>
          <div class="image-box"><img src="https://i.postimg.cc/YCDyxpjm/WA-1782661596260.jpg" alt="Minecraft Comparison"></div>

          <div class="hook-text">ظلال واقعية وانعكاسات ماء حقيقية وبدون أي لاق! 📱</div>
          <div class="image-box"><img src="https://i.postimg.cc/yN9XSBRK/images.jpg" alt="Minecraft Beautiful Shader"></div>

          <div class="cpa-instructions">
              لتأمين عملية التنزيل، يرجى إتمام أحد الاختبارات السريعة أدناه لتفعيل رابط التحميل المباشر.
          </div>

          <div id="offers-wrapper">
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
