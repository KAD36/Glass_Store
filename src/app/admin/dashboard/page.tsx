import Link from 'next/link';
import { client } from '@/lib/sanity';
import { FolderPlus, Globe, LayoutTemplate, ArrowUpRight } from 'lucide-react';
import styles from './dashboard.module.css';

export const dynamic = 'force-dynamic';


async function getStats() {
    const projectsCount = await client.fetch(`count(*[_type == "project"])`);
    return { projectsCount };
}

export default async function DashboardPage() {
    const stats = await getStats();

    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.title}>لوحة التحكم</h1>
                <p className={styles.subtitle}>مرحباً بك في لوحة إدارة مملكة الزجاج</p>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <LayoutTemplate size={24} />
                    </div>
                    <div className={styles.statInfo}>
                        <h3>عدد المشاريع</h3>
                        <p>{stats.projectsCount}</p>
                    </div>
                </div>
                {/* Add more stats here if needed */}
            </div>

            <h2 className="text-xl font-bold mb-6 text-slate-800">روابط سريعة</h2>
            <div className={styles.actions}>
                <Link href="/admin/projects/new" className={styles.actionCard}>
                    <div className={styles.actionIcon}>
                        <FolderPlus size={24} />
                    </div>
                    <span>إضافة مشروع جديد</span>
                    <ArrowUpRight size={16} className="absolute top-4 left-4 text-slate-300" />
                </Link>

                <Link href="/" target="_blank" className={styles.actionCard}>
                    <div className={styles.actionIcon}>
                        <Globe size={24} />
                    </div>
                    <span>عرض الموقع</span>
                    <ArrowUpRight size={16} className="absolute top-4 left-4 text-slate-300" />
                </Link>
            </div>
        </div>
    );
}
