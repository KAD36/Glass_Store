import styles from './LocationMap.module.css';

export default function LocationMap() {
    return (
        <div className={styles.container}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.694627443834!2d46.7356893!3d24.7031893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2z2KfZhNmF2YXZhNipINin2YTYsNis2KfYrA!5e0!3m2!1sar!2ssa!4v1716930000000!5m2!1sar!2ssa"
                className={styles.map}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع مملكة الزجاج"
            />
            <div className={styles.overlay}>
                <h3>موقع المعرض</h3>
                <p>تفضل بزيارتنا للاطلاع على أحدث التصاميم والعينات.</p>
                <a
                    href="https://maps.app.goo.gl/XrAb9sUum19JfgtBA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    فتح في خرائط جوجل
                </a>
            </div>
        </div>
    );
}
