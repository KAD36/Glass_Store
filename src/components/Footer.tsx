import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h3>مملكة الزجاج</h3>
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
                            <p><Phone size={18} /> 0534971867</p>
                            <p><Phone size={18} /> 0500270622</p>
                            <p><Mail size={18} /> info@mamlakat-alzujaj.com</p>
                            <p><MapPin size={18} /> المملكة العربية السعودية</p>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} مملكة الزجاج. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
}
