'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderKanban, LogOut, Users, Globe, Home } from 'lucide-react';
import styles from './admin-layout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        // In a real app, call an API to clear cookies
        // For now, we just redirect since the middleware checks the cookie
        // We need to actually clear the cookie on the client or via API
        document.cookie = 'token=; Max-Age=0; path=/';
        router.push('/admin/login');
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
                    <h1 className={styles.logo}>مملكة <span>الزجاج</span></h1>
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
