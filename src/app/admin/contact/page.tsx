'use client';

import { useState, useEffect, useTransition } from 'react';
import { updateContactInfo, getContactInfo } from '@/app/actions/settingsActions';
import styles from '@/app/admin/projects/project-form.module.css'; // Reuse styles

export default function ContactSettingsPage() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        getContactInfo().then((data: any) => {
            if (data) {
                setEmail(data.email || '');
                setPhone(data.phone || '');
                setAddress(data.address || '');
            }
            setLoading(false);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);

        startTransition(async () => {
            try {
                await updateContactInfo(formData);
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
            <h1 className="text-2xl font-bold mb-6 text-slate-800">معلومات التواصل</h1>

            <form onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <label className={styles.label}>البريد الإلكتروني</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        dir="ltr"
                    />
                </div>

                <div className={styles.group}>
                    <label className={styles.label}>رقم الهاتف</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={styles.input}
                        dir="ltr"
                    />
                </div>

                <div className={styles.group}>
                    <label className={styles.label}>العنوان</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <button type="submit" disabled={isPending} className={styles.submitBtn}>
                    {isPending ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
            </form>
        </div>
    );
}
