'use client';

import { useState, useEffect, useTransition } from 'react';
import { client } from '@/lib/sanity';
import { updateAboutPage } from '@/app/actions/settingsActions';
import styles from '@/app/admin/projects/project-form.module.css'; // Reuse styles

export default function AboutSettingsPage() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [vision, setVision] = useState('');
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        client.fetch(`*[_type == "about"][0]`).then((data) => {
            if (data) {
                setTitle(data.title || '');
                setSubtitle(data.subtitle || '');
                setVision(data.vision || '');
            }
            setLoading(false);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('vision', vision);
        // Team handling would go here

        startTransition(async () => {
            try {
                await updateAboutPage(formData);
                alert('تم حفظ البيانات بنجاح');
            } catch (error) {
                console.error(error);
                alert('حدث خطأ أثناء الحفظ');
            }
        });
    };

    if (loading) return <div>جاري التحميل...</div>;

    return (
        <div className={styles.formContainer}>
            <h1 className="text-2xl font-bold mb-6 text-slate-800">محتوى صفحة من نحن</h1>

            <form onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <label className={styles.label}>العنوان الرئيسي</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.group}>
                    <label className={styles.label}>العنوان الفرعي</label>
                    <textarea
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        rows={3}
                        className={styles.textarea}
                    />
                </div>

                <div className={styles.group}>
                    <label className={styles.label}>الرؤية والرسالة</label>
                    <textarea
                        value={vision}
                        onChange={(e) => setVision(e.target.value)}
                        rows={5}
                        className={styles.textarea}
                    />
                </div>

                <button type="submit" disabled={isPending} className={styles.submitBtn}>
                    {isPending ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
            </form>
        </div>
    );
}
