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
                            <Link href="/portfolio">معرض الأعمال</Link>
                            <Link href="/contact">تواصل معنا</Link>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h4>خدماتنا</h4>
                        <div className={styles.links}>
                            <Link href="/#services">زجاج سكريت مقوى</Link>
                            <Link href="/#services">مرايا ديكور فاخرة</Link>
                            <Link href="/#services">كابينات شاور عصرية</Link>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h4>تواصل معنا</h4>
                        <div className={styles.contactInfo}>
                            <div className="flex flex-col gap-4">
                                <a href="tel:+966574391597" className={styles.contactLink}>
                                    <Phone size={18} className="text-gold" />
                                    <span dir="ltr">+966 57 439 1597</span>
                                </a>
                                <a href="https://wa.me/966534971867" className={styles.contactLink}>
                                    <span className="text-gold font-bold">WA</span>
                                    <span dir="ltr">+966 53 497 1867</span>
                                </a>
                            </div>

                            <a href="mailto:almmlktllzjaj511@gmail.com" className={styles.contactLink}>
                                <Mail size={18} className="text-gold" />
                                <span>almmlktllzjaj511@gmail.com</span>
                            </a>

                            <a href="https://maps.app.goo.gl/4PRDcvLDx1qjveNL8" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                                <MapPin size={18} className="text-gold" />
                                <span>المملكة العربية السعودية - الرياض</span>
                            </a>
                        </div>
                        <div className={styles.socialLinks}>
                            <a href="https://youtube.com/channel/UCCJW7lWNiRmYEUrEFAHpC9g?si=W2ZDSpuNqDsIXQ9h" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
                                <Youtube size={22} />
                            </a>
                            <a href="https://x.com/GlassAluminumOm?t=NOFu-j3HxlHoMgjOJ7PZDQ&s=09" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
                                <Twitter size={22} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className="flex justify-center items-center mt-6">
                        <p className={styles.developerSignature}>
                            تصميم وتطوير: 
                            <a href="https://wa.me/967773768606" target="_blank" rel="noopener noreferrer" className={styles.developerName}>
                                المهندس يوسف الصبري
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
