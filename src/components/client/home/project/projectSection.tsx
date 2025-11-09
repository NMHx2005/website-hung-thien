import { motion } from 'framer-motion';
import { HeartOutlined } from '@ant-design/icons';
import './projectSection.scss';

const ProjectSection = () => {
    return (
        <motion.section
            className="project-section"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="project-backdrop" aria-hidden />
            <div className="project-container">
                <motion.div
                    className="project-visual"
                    initial={{ opacity: 0, x: -50, rotate: -6 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="phone-mockup">
                        <div className="phone-screen">
                            <motion.div
                                className="heart-icon"
                                animate={{ scale: [1, 1.1, 1], rotate: [0, 8, 0] }}
                                transition={{ repeat: Infinity, repeatDelay: 2.5, duration: 2 }}
                            >
                                <HeartOutlined />
                            </motion.div>
                            <div className="project-name">YÊU</div>
                        </div>
                    </div>
                    <div className="phone-glow" aria-hidden />
                </motion.div>

                <motion.div
                    className="project-content"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                    <span className="project-label">Dự án</span>

                    <h2 className="project-title">
                        Giới thiệu dự án công nghệ thu gom tái chế rác YÊU
                    </h2>

                    <p className="project-description">
                        YÊU là dự án công nghệ hướng đến xây dựng một hệ sinh thái thu gom và tái chế rác thông minh, kết nối cộng đồng với các giải pháp môi trường bền vững. Lấy cảm hứng từ ý nghĩa cốt lõi của tình yêu – sự quan tâm, sẻ chia và gìn giữ.
                    </p>

                    <div className="project-highlight">
                        <h3>Sứ mệnh</h3>
                        <p>
                            Tạo ra một nền tảng công nghệ thúc đẩy thu gom, phân loại và tái chế rác hiệu quả, đồng thời nâng cao ý thức bảo vệ môi trường trong cộng đồng bằng sự kết nối, minh bạch và tiện lợi.
                        </p>
                    </div>

                    <motion.button
                        className="learn-more-btn"
                        type="button"
                        whileHover={{ y: -4, boxShadow: "0 18px 32px rgba(249, 58, 101, 0.35)" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Tìm hiểu thêm
                    </motion.button>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ProjectSection;
