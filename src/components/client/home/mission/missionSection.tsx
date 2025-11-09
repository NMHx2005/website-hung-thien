import { motion } from 'framer-motion';
import './missionSection.scss';

const MissionSection = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
    };

    const paragraphVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        })
    };

    const paragraphs = [
        "Với tầm nhìn trở thành tập đoàn tiên phong trong nghiên cứu khoa học và ứng dụng công nghệ hiện đại.",
        "HÙNG DÂN luôn đặt con người làm trung tâm của sự phát triển. Chúng tôi tập trung tạo ra những giải pháp khoa học – công nghệ mang tính ứng dụng cao, phục vụ thiết thực cho đời sống con người, kinh tế và xã hội.",
        "\"Khoa học vì nhân - Công nghệ vì dân\" – là kim chỉ nam cho mọi hoạt động của HÙNG DÂN.",
        "Cam kết phát triển khoa học công nghệ gắn liền với lợi ích nhân dân, vì một tương lai tiến bộ và bền vững."
    ];

    return (
        <motion.section
            className="mission-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.45 }}
        >
            <div className="mission-overlay" aria-hidden />
            <div className="mission-content">
                <motion.div className="mission-heading" variants={fadeIn}>
                    <h1>KHOA HỌC VÌ NHÂN</h1>
                    <h1>CÔNG NGHỆ VÌ DÂN</h1>
                </motion.div>

                <motion.div className="mission-body" variants={fadeIn}>
                    <h2>CÔNG TY KHOA HỌC CÔNG NGHỆ HÙNG DÂN</h2>

                    {paragraphs.map((text, index) => (
                        <motion.p
                            key={text}
                            variants={paragraphVariants}
                            custom={index}
                            className={index === 2 ? "mission-principle" : undefined}
                        >
                            {text}
                        </motion.p>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default MissionSection;
