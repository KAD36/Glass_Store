import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/lib/sanity';
import styles from './page.module.css';

async function getProject(slug: string) {
    return await client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      title,
      description,
      images,
      publishedAt
    }
  `, { slug }, { next: { revalidate: 60 } });
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const slug = decodeURIComponent(params.slug);
    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/portfolio" className={styles.backLink}>← العودة للمشاريع</Link>
                <h1 className={styles.title}>{project.title}</h1>
                <p className={styles.date}>{new Date(project.publishedAt).toLocaleDateString('ar-SA')}</p>
            </div>

            <div className={styles.gallery}>
                {project.images?.map((image: any, index: number) => (
                    <div key={index} className={styles.imageWrapper}>
                        <Image
                            src={urlFor(image).url()}
                            alt={`${project.title} - ${index + 1}`}
                            width={1200}
                            height={800}
                            className={styles.image}
                        />
                    </div>
                ))}
            </div>

            <div className={styles.content}>
                <h2>تفاصيل المشروع</h2>
                <p className={styles.description}>{project.description}</p>
            </div>
        </div>
    );
}
