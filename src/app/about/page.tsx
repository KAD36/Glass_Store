import Image from 'next/image';
import { Users, Target } from 'lucide-react';
import styles from './about.module.css';

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>من نحن</h1>
                    <p className={styles.subtitle}>
                        مؤسسة سطور الماسة.. حيث تلتقي الخبرة الهندسية مع الفن المعماري لتقديم حلول زجاجية استثنائية.
                    </p>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-gold">رؤيتنا ورسالتنا</h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            نسعى لأن نكون الخيار الأول في المملكة العربية السعودية في مجال تركيب الزجاج والمرايا، من خلال تقديم خدمات تجمع بين الجودة العالية، التصميم المبتكر، والأسعار المنافسة.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            نؤمن بأن الزجاج ليس مجرد مادة بناء، بل هو عنصر جمالي يضيف روحاً للمكان. لذلك نهتم بأدق التفاصيل لضمان رضا عملائنا التام.
                        </p>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1556912173-3db996ea8c3e?q=80&w=1000&auto=format&fit=crop"
                            alt="About Us"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-slate-900/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8 text-gold">فريق العمل</h2>
                    <div className="max-w-3xl mx-auto glass-panel p-8 rounded-2xl">
                        <p className="text-gray-300 leading-relaxed text-lg mb-4">
                            يتميز فريق عملنا في مؤسسة سطور الماسة بخبرة هندسية وفنية متينة في مجال المقاولات وأعمال الزجاج السكريت والمرايا، حيث نلتزم بأعلى معايير الجودة في التنفيذ والتصميم لتلبية تطلعات عملائنا.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            نحن نفخر بتسليم مشاريعنا في الوقت المحدد وبدقة متناهية مع الاهتمام بأدق التفاصيل. يعمل فريقنا بأعلى مستويات الاحترافية لنضمن مخرجات تتجاوز التوقعات، فنحن لا نُقدم مجرد خدمة، بل نُقدم التزاماً هندسياً بالتميز المستدام.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
