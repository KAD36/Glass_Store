'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderKanban, LogOut, Users, Globe, Home } from 'lucide-react';
import styles from './admin-layout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/admin/login');
            router.refresh(); // Refresh to ensure middleware catches the missing cookie
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Don't show layout on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const navItems = [
        { href: '/admin/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
        { href: '/admin/projects', label: 'المشاريع', icon: FolderKanban },
        { href: '/admin/about', label: 'من نحن', icon: Users },
        { href: '/admin/contact', label: 'معلومات التواصل', icon: Globe },
    ];

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h1 className={styles.logo}>مؤسسه سطور الماسه <span>للمقاولات العامة</span></h1>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    <Link href="/" className={styles.navLink} target="_blank">
                        <Home size={20} />
                        <span>عرض الموقع</span>
                    </Link>
                </nav>

                <button onClick={handleLogout} className={styles.logoutBtn}>
                    <LogOut size={20} />
                    <span>تسجيل الخروج</span>
                </button>
            </aside>

            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
