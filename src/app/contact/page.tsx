'use client';

import { Phone, Mail, MapPin, Youtube, Twitter } from 'lucide-react';
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
                            <div dir="ltr" className="flex flex-col gap-6 items-center w-full mt-2">
                                <a href="tel:+966505771354" className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold hover:bg-white/10 transition-all duration-300 group">
                                    <Phone size={20} className="text-gold group-hover:scale-110 transition-transform" />
                                    <span className="text-xl font-semibold tracking-wide text-white group-hover:text-gold transition-colors">+966 50 577 1354</span>
                                </a>
                                <a href="tel:+966534971867" className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold hover:bg-white/10 transition-all duration-300 group">
                                    <Phone size={20} className="text-gold group-hover:scale-110 transition-transform" />
                                    <span className="text-xl font-semibold tracking-wide text-white group-hover:text-gold transition-colors">+966 53 497 1867</span>
                                </a>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <h3><Mail size={20} /> البريد الإلكتروني</h3>
                            <a href="mailto:almmlktllzjaj511@gmail.com" className="hover:text-gold transition-colors text-lg">almmlktllzjaj511@gmail.com</a>
                        </div>

                        <div className={styles.contactItem}>
                            <h3><MapPin size={20} /> العنوان</h3>
                            <a href="https://maps.app.goo.gl/4PRDcvLDx1qjveNL8" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-lg">المملكة العربية السعودية - الرياض</a>
                        </div>

                        <div className={`${styles.contactItem} md:col-span-3 flex justify-center gap-8 mt-4 py-8`}>
                            <a href="https://youtube.com/channel/UCCJW7lWNiRmYEUrEFAHpC9g?si=W2ZDSpuNqDsIXQ9h" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 hover:bg-red-600 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 group border border-white/10">
                                <Youtube size={24} className="group-hover:text-white" /> <span className="font-bold">YouTube</span>
                            </a>
                            <a href="https://x.com/GlassAluminumOm?t=NOFu-j3HxlHoMgjOJ7PZDQ&s=09" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 hover:bg-black px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 group border border-white/10">
                                <Twitter size={24} className="group-hover:text-white" /> <span className="font-bold">Twitter</span>
                            </a>
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

