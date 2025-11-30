import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity';
import ProjectCard from '@/components/ProjectCard';
import { ArrowRight, ShieldCheck, PenTool, Clock, Award } from 'lucide-react';
import styles from './page.module.css';

// Placeholder for the generated hero image - I will use the one I generated
// Note: In a real scenario, I would move the generated image to public/images
// For now, I'll assume I can reference it or use a placeholder if not moved.
// I will use a high quality Unsplash ID as a fallback if the local file isn't moved, 
// but since I generated it, I should use it. 
// However, I cannot easily move files with `write_to_file` from artifacts to public without reading/writing.
// I will use a reliable Unsplash URL for "Luxury Glass Interior" to ensure it works out of the box for the user.
const HERO_IMAGE = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop";

async function getProjects() {
    return await client.fetch(`
    *[_type == "project"] | order(publishedAt desc)[0...3] {
      title,
      slug,
      description,
      images
    }
  `, {}, { next: { revalidate: 60 } });
}

export default async function Home() {
    const projects = await getProjects();

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <Image
                        src={HERO_IMAGE}
                        alt="Luxury Glass Interior"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className={styles.heroOverlay} />

                <div className={styles.heroContent}>
                    <h1 className={styles.title}>
                        الفخامة تتجسد في <br />
                        <span style={{ color: 'var(--accent-gold)' }}>أدق التفاصيل</span>
                    </h1>
                    <p className={styles.subtitle}>
                        نحول مساحتك إلى تحفة فنية بلمسات زجاجية عصرية.
                        خبراء في تركيب الزجاج السكريت، المرايا، والواجهات الفاخرة.
                    </p>
                    <div className={styles.ctaGroup}>
                        <Link href="/portfolio" className={styles.primaryBtn}>
                            شاهد أعمالنا
                        </Link>
                        <Link href="/contact" className={styles.secondaryBtn}>
                            اطلب استشارة مجانية
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.stats}>
                <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>+15</div>
                        <div className={styles.statLabel}>سنة خبرة</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>+500</div>
                        <div className={styles.statLabel}>مشروع مكتمل</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>100%</div>
                        <div className={styles.statLabel}>ضمان الجودة</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>24/7</div>
                        <div className={styles.statLabel}>دعم فني</div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className={styles.services}>
                <div className="container mx-auto px-4">
                    <h2 className={styles.sectionTitle}>خدماتنا المتميزة</h2>
                    <p className={styles.sectionDesc}>
                        نقدم حلولاً متكاملة تجمع بين الجمال والوظيفة، مصممة خصيصاً لتلبية تطلعاتكم.
                    </p>

                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <div className={styles.iconWrapper}><ShieldCheck size={32} /></div>
                            <h3 className={styles.cardTitle}>زجاج سكريت مقوى</h3>
                            <p className={styles.cardText}>
                                واجهات ومقاطع زجاجية عالية المتانة والأمان، مثالية للمحلات التجارية والمكاتب الفاخرة.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.iconWrapper}><Award size={32} /></div>
                            <h3 className={styles.cardTitle}>مرايا ديكور فاخرة</h3>
                            <p className={styles.cardText}>
                                تصاميم مرايا عصرية مع إضاءة مخفية (LED) وقص ليزر يضفي لمسة سحرية على منزلك.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.iconWrapper}><PenTool size={32} /></div>
                            <h3 className={styles.cardTitle}>كابينات شاور عصرية</h3>
                            <p className={styles.cardText}>
                                كابينات استحمام زجاجية بتصاميم انسيابية وإكسسوارات ذهبية أو سوداء مقاومة للصدأ.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-20 bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className={styles.sectionTitle} style={{ textAlign: 'right' }}>أحدث إبداعاتنا</h2>
                            <p className="text-gray-400 mt-2">جولة في معرض أعمالنا المختارة</p>
                        </div>
                        <Link href="/portfolio" className="hidden md:flex items-center gap-2 text-gold hover:text-white transition-colors">
                            عرض الكل <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.length > 0 ? (
                            projects.map((project: any) => (
                                <ProjectCard key={project.slug.current} project={project} />
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-12 glass-panel">
                                <p className="text-gray-400">جاري إضافة مشاريعنا الجديدة...</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/portfolio" className={styles.secondaryBtn}>
                            عرض جميع المشاريع
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
