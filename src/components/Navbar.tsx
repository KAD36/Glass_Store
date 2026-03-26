'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Gem } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${styles.scrolled}`}>
            <div className={styles.container}>
                <div className={styles.mobileTopRow}>
                    <Link href="/" className={styles.logo}>
                        <Gem className="w-8 h-8 text-yellow-500" />
                        <span>مؤسسه سطور الماسه <span className={styles.logoSpan}>للمقاولات العامة</span></span>
                    </Link>
                    <a href="tel:+966574391597" className={styles.mobileCallButtonInline}>
                        اتصل بنا
                    </a>
                </div>

                <div className={styles.desktopMenu}>
                    <Link href="/" className={styles.link}>الرئيسية</Link>
                    <Link href="/portfolio" className={styles.link}>أعمالنا</Link>
                    <Link href="/#services" className={styles.link}>الخدمات</Link>
                    <Link href="/about" className={styles.link}>من نحن</Link>
                    <Link href="/contact" className={styles.link}>تواصل معنا</Link>
                    <a href="tel:+966574391597" className={styles.callButton}>
                        اتصل بنا
                    </a>
                </div>
                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                {isOpen && (
                    <div className={styles.mobileMenu}>
                        <Link href="/" className={styles.mobileLink} onClick={() => setIsOpen(false)}>الرئيسية</Link>
                        <Link href="/#services" className={styles.mobileLink} onClick={() => setIsOpen(false)}>الخدمات</Link>
                        <Link href="/about" className={styles.mobileLink} onClick={() => setIsOpen(false)}>من نحن</Link>
                        <Link href="/contact" className={styles.mobileLink} onClick={() => setIsOpen(false)}>تواصل معنا</Link>
                        <a href="tel:+966574391597" className={styles.mobileCallButton}>
                            اتصل بنا
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}
