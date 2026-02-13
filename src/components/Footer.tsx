import Link from 'next/link';
import { Phone, Mail, MapPin, Youtube, Twitter } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h3>مؤسسه سطور الماسه للمقاولات العامة</h3>
                        <p>
                            نقدم أرقى حلول الزجاج والمرايا بتصاميم عصرية وتنفيذ متقن.
                            شريكك الأمثل لتحويل مساحتك إلى تحفة فنية.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h4>روابط سريعة</h4>
                        <div className={styles.links}>
                            <Link href="/">الرئيسية</Link>
                            <Link href="/about">من نحن</Link>
                            <Link href="/portfolio">أعمالنا</Link>
                            <Link href="/contact">تواصل معنا</Link>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h4>تواصل معنا</h4>
                        <div className={styles.contactInfo}>
                            <div className="flex flex-col gap-4">
                                <a href="tel:+9665074391597" dir="ltr" className="flex items-center gap-3 hover:text-yellow-500 transition-colors group">
                                    <Phone size={18} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                                    <span>+966 507 439 1597</span>
                                </a>
                            </div>

                            <a href="mailto:almmlktllzjaj511@gmail.com" className="flex items-center gap-3 hover:text-yellow-500 transition-colors mt-2 group">
                                <Mail size={18} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                                <span>almmlktllzjaj511@gmail.com</span>
                            </a>

                            <a href="https://maps.app.goo.gl/4PRDcvLDx1qjveNL8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-yellow-500 transition-colors group">
                                <MapPin size={18} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                                <span>المملكة العربية السعودية - الرياض</span>
                            </a>
                        </div>
                        <div className="flex gap-8 mt-8 pt-6 border-t border-white/10 justification-start">
                            <a href="https://youtube.com/channel/UCCJW7lWNiRmYEUrEFAHpC9g?si=W2ZDSpuNqDsIXQ9h" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-red-600 hover:text-white transition-all duration-300 group shadow-lg hover:shadow-red-900/20" aria-label="YouTube">
                                <Youtube size={22} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="https://x.com/GlassAluminumOm?t=NOFu-j3HxlHoMgjOJ7PZDQ&s=09" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-black hover:text-white transition-all duration-300 group shadow-lg hover:shadow-gray-900/20" aria-label="Twitter">
                                <Twitter size={22} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>© 2026 مؤسسه سطور الماسه للمقاولات العامة. جميع الحقوق محفوظة.</p>
                        <p className="flex items-center gap-1 text-sm text-gray-400">
                            تصميم وتطوير:
                            <a href="https://wa.me/967773768606" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors font-semibold">
                                يوسف الصبري
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
