import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';

    // 1. تحديد وعزل عناكب الفحص والزواحف الآلية التابعة للمنصات
    const isBot = /facebookexternalhit|Facebot|Twitterbot|Slackbot|Discordbot|Googlebot|TelegramBot/i.test(userAgent);
    
    if (isBot) {
        // توجيه الزاحف الآلي صامتاً إلى الصفحة الآمنة المعتمدة (ويكيبيديا أو صفحة محايدة)
        return NextResponse.rewrite(new URL('/safe-neutral-page', request.url));
    }

    // 2. معالجة طلبات المستخدمين الحقيقيين من داخل إنستغرام وفيسبوك
    const isInstagram = userAgent.includes('Instagram');
    const isFacebook = userAgent.includes('FBAN') || userAgent.includes('FBAV');

    if (isInstagram || isFacebook) {
        const isAndroid = /Android/i.test(userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

        if (isAndroid) {
            // مستخدم أندرويد حقيقي: إجباره على الخروج لمتصفح كروم الخارجي فوراً
            const host = request.nextUrl.host;
            const path = request.nextUrl.pathname;
            const search = request.nextUrl.search;
            const cleanUrl = `${host}${path}${search}`;
            
            const androidIntent = `intent://${cleanUrl}#Intent; scheme=https; package=com.android.chrome; end;`;
            return NextResponse.redirect(new URL(androidIntent));
        }

        if (isIOS) {
            // مستخدم آيفون حقيقي: توجيهه لصفحة تحتوي على سكريبت الإرشاد اليدوي للخروج
            return NextResponse.rewrite(new URL('/cpa-offers-ios-escape', request.url));
        }
    }

    // الترافيك الطبيعي القادم من المتصفحات الأساسية للجهاز يدخل مباشرة
    return NextResponse.next();
}

export const config = {
    matcher: ['/'],
};
