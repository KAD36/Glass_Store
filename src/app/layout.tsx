import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
    title: 'مؤسسه سطور الماسه للمقاولات العامة',
    description: 'رواد تركيب الزجاج السكريت، الواجهات، والمرايا في المملكة العربية السعودية. تصاميم عصرية وتنفيذ احترافي.',
    openGraph: {
        title: 'مؤسسه سطور الماسه للمقاولات العامة',
        description: 'رواد تركيب الزجاج السكريت، الواجهات، والمرايا في المملكة العربية السعودية.',
        url: 'https://mamlakat-alzujaj.com',
        siteName: 'مؤسسه سطور الماسه للمقاولات العامة',
        locale: 'ar_SA',
        type: 'website',
    },
    metadataBase: new URL('https://mamlakat-alzujaj.com'),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl">
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
                <WhatsAppButton />
                <Footer />
            </body>
        </html>
    );
}
