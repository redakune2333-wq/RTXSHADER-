  const htmlContent = `
  <!DOCTYPE html>
  <html lang="ar" dir="rtl">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>بوابة التنزيل - RTX Bedrock</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght=400;700;900&display=swap" rel="stylesheet">
      
      <style>
          :root {
              --bg-dark: #121214;          
              --card-bg: #1e1e24;          
              --badge-bg: #2c2c35;         
              --text-primary: #ffffff;     
              --text-secondary: #a0a0ab;   
              --accent-color: #34c759;     
              --border-color: #2a2a32;     
          }

          body, html { margin: 0!important; padding: 0!important; width: 100%!important; min-height: 100vh!important; background-color: #ffffff!important; font-family: 'Cairo', sans-serif!important; overflow-x: hidden!important; overflow-y: auto!important; }
          
          #verification-overlay { position: fixed!important; top: 0!important; left: 0!important; width: 100%!important; height: 100%!important; background-color: #1a1a1a!important; z-index: 999999!important; display: flex!important; justify-content: center!important; align-items: center!important; text-align: center!important; padding: 20px!important; box-sizing: border-box!important; transition: opacity 0.4s ease; }
          .verification-box { background-color: #2a2a2a!important; padding: 30px 20px!important; border-radius: 12px!important; border: 1px solid #444!important; max-width: 480px!important; width: 90%!important; box-shadow: 0 10px 30px rgba(0,0,0,0.5)!important; margin: auto; }
          .verification-text { color: #e0e0e0!important; font-size: 18px!important; line-height: 1.6!important; font-weight: 700!important; display: block; }
          .success-text { color: #00ff00!important; display: block!important; margin-top: 10px!important; font-size: 20px!important; font-weight: 900!important; }
          
          .top-header { width: 100%!important; padding: 15px 20px!important; background: #FFFFFF!important; box-sizing: border-box!important; text-align: left!important; direction: ltr!important; border-bottom: 2px solid #e0e0e0!important; }
          .brand-name { font-size: 23px!important; font-weight: 900!important; color: #000000!important; opacity: 1!important; text-transform: uppercase!important; display: block!important; letter-spacing: -0.5px!important; }
          .mod-name { font-size: 15px!important; font-weight: 900!important; color: #000000!important; opacity: 1!important; display: block!important; margin-top: -4px!important; }
          
          .content-container { max-width: 500px!important; margin: 0 auto!important; padding: 0!important; box-sizing: border-box!important; }
          .hook-text { font-size: 18px!important; font-weight: 900!important; text-align: center!important; color: #000000!important; opacity: 1!important; margin-bottom: 12px!important; margin-top: 20px!important; line-height: 1.5!important; padding: 0 20px!important; }
          .cpa-instructions { font-size: 15px!important; font-weight: 900!important; color: #000000!important; opacity: 1!important; text-align: center!important; background: #f8f9fa!important; border: 2px solid #e9ecef!important; padding: 12px!important; border-radius: 8px!important; line-height: 1.6!important; margin: 15px!important; }

          .image-box { width: calc(100% - 40px)!important; margin: 0 auto!important; border-radius: 10px!important; overflow: hidden!important; box-shadow: 0 4px 15px rgba(0,0,0,0.15)!important; }
          .image-box img { width: 100%!important; height: auto!important; display: block!important; }
          
          .download-btn-container { text-align: center!important; margin: 25px 15px!important; }
          .real-download-btn { background-color: #34c759!important; color: #ffffff!important; border: none!important; padding: 16px 32px!important; font-size: 20px!important; font-weight: 900!important; border-radius: 12px!important; width: 100%!important; box-sizing: border-box!important; cursor: pointer!important; box-shadow: 0 6px 20px rgba(52, 199, 89, 0.4)!important; }

          .offers-container {
              display: none;
              background-color: var(--bg-dark) !important;
              padding: 20px 20px 40px 20px !important;
              margin-top: 20px !important;
              border-top-left-radius: 20px !important;
              border-top-right-radius: 20px !important;
              direction: rtl;
          }
      </style>
  </head>
  <body>
      <div id="verification-overlay">
          <div class="verification-box">
              <span class="verification-text" id="status-text">جاري فحص وتأمين بيئة تشغيل النظام...</span>
          </div>
      </div>

      <div class="top-header">
          <span class="brand-name">RTX bedrock</span>
          <span class="mod-name">dragon bedrock</span>
      </div>

      <div class="content-container">
          <div class="hook-text">شكل ماين كرافت العادية الكئيبة 🤢 ضد شكل الشادر الجديد 😍</div>
          <div class="image-box"><img src="https://i.postimg.cc/YCDyxpjm/WA-1782661596260.jpg" alt="Minecraft Comparison"></div>

          <div class="hook-text">ظلال واقعية وانعكاسات اضائة حقيقية وبدون أي لاق! 📱</div>
          <div class="image-box"><img src="https://i.postimg.cc/yN9XSBRK/images.jpg" alt="Minecraft Beautiful Shader"></div>

          <div class="download-btn-container">
              <button class="real-download-btn" id="start-download-btn">اضغط هنا لتنزيل الشادر مباشر (mcpack) 📥</button>
          </div>

          <div class="cpa-instructions" id="instructions-box" style="display: none;">
              لتأمين عملية تنزيل حزمة الشادر المتوافقة وتأكيد هويتك كلاعب حقيقي، يرجى إتمام أحد الاختبارات السريعة أدناه لتفعيل الرابط المباشر فوراً.
          </div>

          <!-- هنا سيقوم السكربت الخارجي الخاص بـ CPAGrip بحقن عروض لوكر النقاط تلقائياً -->
          <div class="offers-container" id="offers"></div>
      </div>

      <script>
          document.addEventListener("DOMContentLoaded", function() {
              var ua = navigator.userAgent;
              var detectedDevice = "جوال ذكي";
              if (/android/i.test(ua)) { detectedDevice = "جهاز Android"; } 
              else if (/iphone/i.test(ua)) { detectedDevice = "هاتف iPhone"; }

              var statusText = document.getElementById('status-text');
              var overlay = document.getElementById('verification-overlay');

              // كود الجافا سكريبت الخاص بالفحص يعمل هنا بكفاءة وفي مكانه الصحيح المنفصل عن التنسيق
              setTimeout(function() { statusText.innerHTML = "تم التعرف على جهازك:<br><span style='color:#00ff00;'>" + detectedDevice + "</span><br><br>جاري تهيئة البصمة الرسومية لشادر BetterRenderDragon..."; }, 800);
              setTimeout(function() { statusText.innerHTML = "تم التعرف على جهازك:<br><span style='color:#00ff00;'>" + detectedDevice + "</span><br><br>جاري تهيئة البصمة الرسومية لشادر BetterRenderDragon... <span class='success-text'>[تم بنجاح]</span>"; }, 2300);
              setTimeout(function() { overlay.style.opacity = '0'; setTimeout(function() { overlay.style.display = 'none'; }, 400); }, 3500);

              document.getElementById('start-download-btn').addEventListener('click', function() {
                  this.style.display = 'none'; 
                  document.getElementById('instructions-box').style.display = 'block';
                  document.getElementById('offers').style.display = 'block';

                  // استدعاء السكربت النظيف الخاص بلوكر العروض الخاص بك
                  var cpaScript = document.createElement('script');
                  cpaScript.type = 'text/javascript';
                  cpaScript.src = "https://playabledownloads.com/script_include.php?id=1902770&tracking_id=Shder10";
                  document.body.appendChild(cpaScript);
              });
          });
      </script>
  </body>
  </html>
  `;

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
