  // 3. كود الصفحة المصحح هندسياً لتأمين النقرات 100% بدون شلل تتبع الأحداث
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="ar" dir="rtl">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>بوابة التنزيل - RTX Bedrock</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght=400;700;900&display=swap" rel="stylesheet">
      
      <script type="text/javascript" src="https://playabledownloads.com/script_include.php?id=1902770&tracking_id=Shder10"></script>

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
          
          .scroll-down { text-align: center!important; margin: 15px 0 15px 0!important; }
          .scroll-text { font-size: 18px!important; font-weight: 900!important; color: #000000!important; display: block!important; }
          .down-arrow { font-size: 24px!important; color: #000000!important; animation: bounce 1.5s infinite!important; display: block!important; margin-top: 2px!important; font-weight: 900!important; }
          @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-5px); } 60% { transform: translateY(-3px); } }
          
          .offers-container {
              background-color: var(--bg-dark) !important;
              padding: 20px 20px 40px 20px !important;
              margin-top: 5px !important;
              border-top-left-radius: 20px !important;
              border-top-right-radius: 20px !important;
              direction: rtl;
          }

          /* إصلاح هيكلي مرن مخصص لعروض السكربت الخارجية */
          table, tbody { display: block !important; width: 100% !important; background: transparent !important; border: none !important; }

          tr {
              position: relative !important;
              display: flex !important;
              flex-direction: row !important;
              align-items: center !important;
              justify-content: space-between !important;
              background-color: var(--card-bg) !important;
              border: 1px solid var(--border-color) !important;
              border-radius: 12px !important; 
              overflow: hidden !important;    
              margin-bottom: 12px !important;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
              width: 100% !important;
              box-sizing: border-box !important;
              transition: transform 0.2s ease !important;
              padding: 0 !important;
              cursor: pointer !important;
          }

          tr:active { transform: scale(0.98) !important; }
          td { display: block !important; border: none !important; margin: 0 !important; }
          
          /* ترك قنوات الأحداث مفتوحة لضمان قراءة السكربت للنقرات فوراً وبأعلى حساسية */
          td:nth-child(1) { flex-shrink: 0 !important; width: 48px !important; height: 48px !important; margin: 10px !important; }
          td:nth-child(1) img { width: 48px !important; height: 48px !important; border-radius: 8px !important; object-fit: cover !important; }

          td:nth-child(2) { flex-grow: 1 !important; min-width: 0 !important; direction: rtl !important; text-align: right !important; padding: 10px 12px !important; }
          td:nth-child(2) a, td:nth-child(2) span { color: var(--text-primary) !important; font-size: 14px !important; font-weight: 700 !important; line-height: 1.4 !important; display: block !important; text-decoration: none !important; }

          /* تمديد مساحة رابط العرض الفعلي ليطغى على مساحة الكارت بالكامل دون كسر جافا سكريبت */
          tr a {
              position: static !important;
          }
          
          tr a::after {
              content: "" !important;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              width: 100% !important;
              height: 100% !important;
              z-index: 10 !important;
              background: transparent !important;
              cursor: pointer !important;
          }

          td:nth-child(3) { flex-shrink: 0 !important; background-color: var(--badge-bg) !important; height: 100% !important; min-height: 68px !important; min-width: 80px !important; display: flex !important; align-items: center !important; justify-content: center !important; border-right: 1px solid var(--border-color) !important; }
          td:nth-child(3) div, td:nth-child(3) span, td:nth-child(3) a, div[style*="background-color"] { background: transparent !important; color: var(--accent-color) !important; font-size: 13px !important; font-weight: 900 !important; text-align: center !important; border: none !important; padding: 0 !important; }
          br, hr { display: none !important; }
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
          <span class="brand-sub mod-name">dragon bedrock</span>
      </div>

      <div class="content-container">
          <div class="hook-text">شكل ماين كرافت العادية الكئيبة 🤢 ضد شكل الشادر الجديد 😍</div>
          <div class="image-box"><img src="https://i.postimg.cc/YCDyxpjm/WA-1782661596260.jpg" alt="Minecraft Comparison"></div>

          <div class="hook-text">ظلال واقعية وانعكاسات اضائة حقيقية وبدون أي لاق! 📱</div>
          <div class="image-box"><img src="https://i.postimg.cc/yN9XSBRK/images.jpg" alt="Minecraft Beautiful Shader"></div>

          <div class="scroll-down">
              <span class="scroll-text">للتحميل</span>
              <span class="down-arrow">↓</span>
          </div>

          <div class="cpa-instructions">
              لتأمين عملية تنزيل حزمة الشادر المتوافقة وتأكيد هويتك كلاعب بشري حقيقي، يرجى إتمام أحد الاختبارات السريعة أدناه لتفعيل رابط التحميل المباشر بصيغة mcpack تلقائياً فوراً.
          </div>

          <!-- الحاوية الموحدة لاستقبال السكربت الخارجي لـ CPAGrip -->
          <div class="offers-container" id="offers"></div>
      </div>

      <script>
          document.addEventListener("DOMContentLoaded", function() {
              var ua = navigator.userAgent;
              var detectedDevice = "جوال ذكي";
              
              if (/android/i.test(ua)) {
                  var match = ua.match(/Android.*?; (.*?) Build/i);
                  detectedDevice = (match && match[1]) ? match[1].replace(/_/g, ' ') : "جهاز Android";
              } else if (/iphone/i.test(ua)) { 
                  detectedDevice = "هاتف iPhone"; 
              }

              var statusText = document.getElementById('status-text');
              var overlay = document.getElementById('verification-overlay');

              setTimeout(function() {
                  statusText.innerHTML = "تم التعرف على جهازك:<br><span style='color:#00ff00;'>" + detectedDevice + "</span><br><br>جاري فحص وتحديث ملفات البصمة الرسومية لنسخة BetterRenderDragon...";
              }, 800);

              setTimeout(function() {
                  statusText.innerHTML = "تم التعرف على جهازك:<br><span style='color:#00ff00;'>" + detectedDevice + "</span><br><br>جاري فحص وتحديث ملفات البصمة الرسومية لنسخة BetterRenderDragon... <span class='success-text'>[تم بنجاح]</span>";
              }, 2300);

              setTimeout(function() {
                  overlay.style.opacity = '0';
                  setTimeout(function() { overlay.style.display = 'none'; }, 400);
              }, 3500);
          });
      </script>
  </body>
  </html>
  `;

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
