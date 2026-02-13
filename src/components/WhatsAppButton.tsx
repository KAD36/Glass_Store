'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
    const pathname = usePathname();

    // Don't show on admin pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <Link
            href="https://wa.me/9665074391597"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
            aria-label="Contact via WhatsApp"
        >
            <MessageCircle size={32} fill="white" strokeWidth={1.5} />
            <span className={styles.tooltip}>تواصل معنا</span>
        </Link>
    );
}
