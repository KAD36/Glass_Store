'use client';

import { Trash2 } from 'lucide-react';
import { deleteProject } from '@/app/actions/projectActions';
import { useTransition } from 'react';
import styles from '@/app/admin/projects/projects.module.css';

export default function DeleteProjectButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
            startTransition(async () => {
                await deleteProject(id);
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            className={styles.deleteBtn}
            disabled={isPending}
            title="حذف"
        >
            <Trash2 size={16} />
        </button>
    );
}
