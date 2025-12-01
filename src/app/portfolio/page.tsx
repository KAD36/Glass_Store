import { client } from '@/lib/sanity';
import ProjectCard from '@/components/ProjectCard';
import styles from './portfolio.module.css';

async function getProjects() {
    return await client.fetch(`
    *[_type == "project"] | order(publishedAt desc) {
      title,
      slug,
      description,
      images
    }
  `, {}, { next: { revalidate: 60 } });
}

export default async function PortfolioPage() {
    const projects = await getProjects();

    return (
        <div className="min-h-screen">
            <header className={styles.header}>
                <div className="container mx-auto px-4">
                    <h1 className={styles.title}>معرض الأعمال</h1>
                    <p className={styles.subtitle}>
                        تصفح مجموعتنا المختارة من المشاريع التي نفذناها بكل فخر وإتقان.
                        كل مشروع يحكي قصة نجاح وتميز.
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4">
                <div className={styles.grid}>
                    {projects.length > 0 ? (
                        projects.filter((p: any) => p.slug?.current).map((project: any) => (
                            <ProjectCard key={project.slug.current} project={project} />
                        ))
                    ) : (
                        <div className="col-span-full">
                            <div className={styles.empty}>
                                <p>لا توجد مشاريع حالياً. سيتم إضافة المزيد قريباً.</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
