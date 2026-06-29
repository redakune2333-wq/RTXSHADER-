export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  const ua = request.headers.get('user-agent') || '';

  // 1. نظام حظر البوتات ومراجعي المنصات الاجتماعية لحماية الحساب من الإغلاق
  const isBot = /bot|crawler|spider|facebook|twitter|instagram|headless|selenium|puppeteer/i.test(ua) || 
                request.headers.get('sec-ch-ua-mobile') === '?0';

  if (isBot) {
    return Response.redirect('https://ar.wikipedia.org/wiki/ماينكرافت', 302);
  }

  // 2. الفحص الجغرافي السيرفري (دول الخليج المستهدفة + المغرب MA لأجل اختباراتك)
  const allowedCountries = ['SA', 'AE', 'KW', 'QA', 'OM', 'BH', 'MA']; 
  const fallbackURL = "https://www.google.com";

  if (!allowedCountries.includes(country.toUpperCase())) {
    return Response.redirect(fallbackURL, 302);
  }

  // 3. بناء الواجهة الرسومية المتكاملة مع السكربت الخاص بك
  const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>بوابة التنزيل - RTX Bedrock</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    
    <style>
        body, html {
            margin: 0!important;
            padding: 0!important;
            width: 100%!important;
            height: 100%!important;
            background-color: #FFFFFF!important;
            font-family: 'Cairo', sans-serif!important;
            color: #111!important;
            overflow-x: hidden!important;
        }

        /* 1. نافذة التحقق الرمادية الداكنة السيكولوجية */
        #verification-overlay {
            position: fixed!important;
            top: 0!important;
            left: 0!important;
            width: 100%!important;
            height: 100%!important;
            background-color: #1a1a1a!important;
            z-index: 999999!important;
            display: flex!important;
            justify-content: center!important;
            align-items: center!important;
            text-align: center!important;
            padding: 20px!important;
            box-sizing: border-box!important;
            transition: opacity 0.4s ease!important;
        }

       .verification-box {
            background-color: #2a2a2a!important;
            padding: 30px 20px!important;
            border-radius: 12px!important;
            border: 1px solid #444!important;
            max-width: 90%!important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5)!important;
        }

       .verification-text {
            color: #e0e0e0!important;
            font-size: 18px!important;
            line-height: 1.6!important;
            font-weight: 700!important;
        }

       .success-text {
            color: #00ff00!important;
            display: block!important;
            margin-top: 10px!important;
            font-size: 20px!important;
            font-weight: 900!important;
        }

        /* 2. الهوية التقنية لأعلى الصفحة */
       .top-header {
            width: 100%!important;
            padding: 15px 20px!important;
            background: #FFFFFF!important;
            box-sizing: border-box!important;
            text-align: left!important;
            direction: ltr!important;
            border-bottom: 2px solid #f0f0f0!important;
        }

       .brand-name {
            font-size: 22px!important;
            font-weight: 900!important;
            color: #000000!important;
            text-transform: uppercase!important;
            display: block!important;
            letter-spacing: -0.5px!important;
        }

       .mod-name {
            font-size: 14px!important;
            font-weight: 700!important;
            color: #666666!important;
            display: block!important;
            margin-top: -4px!important;
        }

        /* 3. حاوية المحتوى الرئيسية وصور المعاينة */
       .content-container {
            max-width: 500px!important;
            margin: 0 auto!important;
            padding: 20px!important;
            box-sizing: border-box!important;
        }

       .hook-text {
            font-size: 17px!important;
            font-weight: 800!important;
            text-align: center!important;
            color: #000000!important;
            margin-bottom: 12px!important;
            margin-top: 25px!important;
            line-height: 1.5!important;
        }

       .image-box {
            width: 100%!important;
            border-radius: 10px!important;
            overflow: hidden!important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1)!important;
            margin-bottom: 20px;
        }

       .image-box img {
            width: 100%!important;
            height: auto!important;
            display: block!important;
        }

        /* 4. مؤشر التوجيه لأسفل الصفحة */
       .scroll-down {
            text-align: center!important;
            margin: 35px 0 25px 0!important;
        }

       .scroll-text {
            font-size: 20px!important;
            font-weight: 900!important;
            color: #000000!important;
            display: block!important;
        }

       .down-arrow {
            font-size: 28px!important;
            color: #000000!important;
            animation: bounce 1.5s infinite!important;
            display: block!important;
            margin-top: 5px!important;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }

        /* 5. منطقة العروض والتحكم الصارم بتنسيقات شبكة CPAGrip الإعلانية */
       .cpa-instructions {
            font-size: 15px!important;
            font-weight: 700!important;
            color: #333333!important;
            text-align: center!important;
            background: #f9f9f9!important;
            border: 1px solid #eeeeee!important;
            padding: 15px!important;
            border-radius: 8px!important;
            line-height: 1.6!important;
            margin-bottom: 20px!important;
        }

        #offers, .offers, .offer_list, ul {
            list-style: none!important;
            padding: 0!important;
            margin: 0!important;
            display: block!important;
        }

        /* تدمير جينات التصميم الافتراضية للشبكة وحقن تصميم أزرار أزرق موثوق ونظيف */
        #offers a, .offer_row a, .offers a, .grid_element a, .offers_container a {
            display: block!important;
            background: linear-gradient(135deg, #2196F3, #1976D2)!important;
            color: #FFFFFF!important;
            padding: 18px 15px!important;
            margin-bottom: 12px!important;
            border-radius: 8px!important;
            text-decoration: none!important;
            font-size: 16px!important;
            font-weight: 800!important;
            text-align: center!important;
            white-space: normal!important;
            line-height: 1.4!important;
            box-shadow: 0 4px 6px rgba(33, 150, 243, 0.3)!important;
            border: none!important;
            height: auto!important;
            position: relative!important;
            overflow: hidden!important;
        }

        #offers a:hover, .offer_row a:hover {
            background: #1565C0!important;
        }

       .offer_desc, .offer_amount, .offer_help, .offer_payout {
            display: none!important;
        }
    </style>
</head>
<body>

    <!-- شاشة الفحص الرقمي المؤقتة لتأصيل المصداقية سيكولوجياً -->
    <div id="verification-overlay">
        <div class="verification-box">
            <span class="verification-text" id="status-text">جاري فحص وتأمين بيئة تشغيل النظام الحاضر...</span>
        </div>
    </div>

    <!-- ترويسة الموقع الساكنة -->
    <div class="top-header">
        <span class="brand-name">RTX bedrock</span>
        <span class="brand-sub mod-name">dragon bedrock</span>
    </div>

    <!-- محتوى الصفحة الإقناعي -->
    <div class="content-container">
        
        <div class="hook-text">شكل ماين كرافت العادية الكئيبة 🤢 ضد شكل الشادر الجديد 😍</div>
        <div class="image-box">
            <img src="https://i.postimg.cc/YCDyxpjm/WA-1782661596260.jpg" alt="Minecraft Comparison">
        </div>

        <div class="hook-text">ظلال واقعية وانعكاسات ماء حقيقية وبدون أي لاق! 📱</div>
        <div class="image-box">
            <img src="https://i.postimg.cc/yN9XSBRK/images.jpg" alt="Minecraft Beautiful Shader">
        </div>

        <div class="scroll-down">
            <span class="scroll-text">للتحميل</span>
            <span class="down-arrow">↓</span>
        </div>

        <div class="cpa-instructions">
            لتأمين عملية تنزيل حزمة الشادر المتوافقة وتأكيد هويتك كلاعب بشري حقيقي، يرجى إتمام أحد الاختبارات السريعة أدناه لتفعيل رابط التحميل المباشر بصيغة mcpack تلقائياً فوراً.
        </div>

        <!-- المنطقة المستهدفة لحقن السكربت تلقائياً وعرض الخيارات النظيفة -->
        <div class="offers" id="offers">
            <script type="text/javascript" src="https://playabledownloads.com/script_include.php?id=1902763"></script>
        </div>

    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var ua = navigator.userAgent;
            var detectedDevice = "جوال ذكي";

            if (/android/i.test(ua)) {
                var match = ua.match(/Android.*?; (.*?) Build/i);
                if (match && match[1]) {
                    detectedDevice = match[1].replace(/_/g, ' ');
                } else {
                    detectedDevice = "جهاز Android";
                }
            } else if (/iPhone/i.test(ua)) {
                detectedDevice = "هاتف iPhone";
            }

            var statusText = document.getElementById('status-text');
            var overlay = document.getElementById('verification-overlay');

            // محاكاة الفحص السريع لحماية معدل الارتداد (2.5 ثانية إجمالياً)
            setTimeout(function() {
                statusText.innerHTML = "تم التعرف على جهازك:<br><span style='color:#00ff00;'>" + detectedDevice + "</span><br><br>جاري تحديث ملفات البصمة الرسومية لنسخة BetterRenderDragon...";
            }, 700);

            setTimeout(function() {
                statusText.innerHTML = "تم التعرف على جهازك:<br><span style='color:#00ff00;'>" + detectedDevice + "</span><br><br>جاري تحديث ملفات البصمة الرسومية لنسخة BetterRenderDragon... <span class='success-text'>[تم بنجاح]</span>";
            }, 1800);

            setTimeout(function() {
                overlay.style.opacity = '0';
                setTimeout(function() {
                    overlay.style.display = 'none';
                }, 400);
            }, 2500);
        });
    </script>
</body>
</html>
  `;

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
<script type="text/javascript" src="https://playabledownloads.com/script_include.php?id=1902763"></script>
