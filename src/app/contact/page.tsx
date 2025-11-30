'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import LocationMap from '@/components/LocationMap';
import styles from './contact.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <h1 className={styles.title}>تواصل معنا</h1>
                    <p className={styles.subtitle}>
                        هل لديك مشروع في ذهنك؟ نحن هنا لتحويل أفكارك إلى واقع.
                        تواصل معنا اليوم للحصول على استشارة مجانية.
                    </p>

                    <div className={styles.contactItem}>
                        <h3><Phone size={20} /> الهاتف</h3>
                        <p dir="ltr">+966 53 497 1867</p>
                        <p dir="ltr">+966 50 027 0622</p>
                    </div>

                    <div className={styles.contactItem}>
                        <h3><Mail size={20} /> البريد الإلكتروني</h3>
                        <p>info@mamlakat-alzujaj.com</p>
                    </div>

                    <div className={styles.contactItem}>
                        <h3><MapPin size={20} /> العنوان</h3>
                        <p>المملكة العربية السعودية</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.group}>
                        <label className={styles.label}>الاسم الكامل</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={styles.input}
                            placeholder="أدخل اسمك"
                        />
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>البريد الإلكتروني</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={styles.input}
                            placeholder="example@domain.com"
                        />
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>تفاصيل المشروع</label>
                        <textarea
                            required
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className={styles.textarea}
                            placeholder="أخبرنا المزيد عن مشروعك..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className={styles.button}
                    >
                        {status === 'loading' ? 'جاري الإرسال...' : 'إرسال الطلب'}
                    </button>

                    {status === 'success' && (
                        <p className={styles.success}>تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</p>
                    )}
                    {status === 'error' && (
                        <p className={styles.error}>حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.</p>
                    )}
                </form>
            </div>

            <div className="mt-20 max-w-6xl mx-auto w-full">
                <h2 className="text-3xl font-bold text-center mb-8 text-gold">موقعنا على الخريطة</h2>
                <LocationMap />
            </div>
        </div>
    );
}
