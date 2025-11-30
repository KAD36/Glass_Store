'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import { ArrowUpLeft } from 'lucide-react';
import styles from './ProjectCard.module.css';

interface ProjectProps {
    project: {
        title: string;
        slug: { current: string };
        description: string;
        images: any[];
    };
}

export default function ProjectCard({ project }: ProjectProps) {
    // Fallback image if no images are present
    const imageUrl = project.images?.[0]
        ? urlFor(project.images[0]).width(600).height(400).url()
        : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop';

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Link href={`/projects/${project.slug.current}`}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.description}>
                        {project.description?.substring(0, 100)}...
                    </p>
                    <span className={styles.link}>
                        عرض التفاصيل <ArrowUpLeft size={16} />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}
