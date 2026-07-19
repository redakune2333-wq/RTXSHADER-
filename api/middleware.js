export const config = {
  runtime: 'edge', // تشغيل الكود كـ Edge Function لسرعة الاستجابة وفحص الترافيك
};

export default async function handler(request) {
    const userAgent = request.headers.get('user-agent') || '';

    // 1. تصفية وعزل زواحف الفحص التلقائي للمنصات
    const isBot = /facebookexternalhit|Facebot|Twitterbot|Slackbot|Discordbot|Googlebot|TelegramBot/i.test(userAgent);
    
    if (isBot) {
        // توجيه الزاحف الآلي صامتاً لصفحة ويكيبيديا أو المسار الآمن
        return Response.redirect('https://ar.wikipedia.org', 302);
    }

    // 2. رصد ترافيك إنستغرام وفيسبوك للحملة
    const isInstagram = userAgent.includes('Instagram');
    const isFacebook = userAgent.includes('FBAN') || userAgent.includes('FBAV');

    if (isInstagram || isFacebook) {
        const isAndroid = /Android/i.test(userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

        if (isAndroid) {
            // إجبار الأندرويد على الخروج لمتصفح كروم الخارجي
            const url = new URL(request.url);
            const cleanUrl = url.host + url.pathname + url.search;
            const androidIntent = `intent://${cleanUrl}#Intent; scheme=https; package=com.android.chrome; end;`;
            
            return Response.redirect(androidIntent, 302);
        }

        if (isIOS) {
            // توجيه مستخدم الآيفون لصفحة الإرشاد اليدوي (مثلاً صفحة اسمها ios.html)
            const url = new URL(request.url);
            url.pathname = '/ios.html'; 
            return Response.redirect(url.toString(), 302);
        }
    }

    // الترافيك الطبيعي يمر بسلام لصفحة الهبوط الرئيسية الخاصة بك
    const url = new URL(request.url);
    url.pathname = '/landing.html'; // استبدل هذا باسم ملف صفحة الهبوط الحقيقي لديك
    return Response.redirect(url.toString(), 302);
}
