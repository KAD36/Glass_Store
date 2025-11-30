import Link from 'next/link';
import Image from 'next/image';
import { client, urlFor } from '@/lib/sanity';
import { Plus, Pencil } from 'lucide-react';
import DeleteProjectButton from '@/components/admin/DeleteProjectButton';
import styles from './projects.module.css';

// We need to force dynamic rendering to ensure the list is up to date
export const dynamic = 'force-dynamic';

async function getProjects() {
    return await client.fetch(`
    *[_type == "project"] | order(publishedAt desc) {
      _id,
      title,
      description,
      images
    }
  `);
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>إدارة المشاريع</h1>
                <Link href="/admin/projects/new" className={styles.addButton}>
                    <Plus size={20} />
                    <span>إضافة مشروع</span>
                </Link>
            </div>

            <div className={styles.tableContainer}>
                {projects.length > 0 ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>الصورة</th>
                                <th>عنوان المشروع</th>
                                <th>الوصف</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project: any) => (
                                <tr key={project._id}>
                                    <td>
                                        {project.images?.[0] && (
                                            <Image
                                                src={urlFor(project.images[0]).width(100).height(100).url()}
                                                alt={project.title}
                                                width={60}
                                                height={40}
                                                className={styles.projectImage}
                                            />
                                        )}
                                    </td>
                                    <td>{project.title}</td>
                                    <td>{project.description?.substring(0, 50)}...</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/projects/${project._id}`} className={styles.editBtn} title="تعديل">
                                                <Pencil size={16} />
                                            </Link>
                                            <DeleteProjectButton id={project._id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className={styles.empty}>
                        <p>لا توجد مشاريع حالياً</p>
                    </div>
                )}
            </div>
        </div>
    );
}
