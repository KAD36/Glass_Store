'use client';

import { Phone, Mail, MapPin } from 'lucide-react';
import LocationMap from '@/components/LocationMap';
import styles from './contact.module.css';

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <div className={styles.wrapper}>
                <div className={styles.info} style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 className={styles.title}>تواصل معنا</h1>
                    <p className={styles.subtitle}>
                        هل لديك مشروع في ذهنك؟ نحن هنا لتحويل أفكارك إلى واقع.
                        تواصل معنا اليوم للحصول على استشارة مجانية.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className={styles.contactItem}>
                            <h3><Phone size={20} /> الهاتف</h3>
                            <div dir="ltr" className="flex flex-col gap-1 items-center">
                                <p>+966 53 497 1867</p>
                                <p>+966 50 027 0622</p>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <h3><Mail size={20} /> البريد الإلكتروني</h3>
                            <p>almmlktllzjaj511@gmail.com</p>
                        </div>

                        <div className={styles.contactItem}>
                            <h3><MapPin size={20} /> العنوان</h3>
                            <p>المملكة العربية السعودية</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 max-w-6xl mx-auto w-full px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gold">موقعنا على الخريطة</h2>
                <LocationMap />
            </div>
        </div>
    );
}

