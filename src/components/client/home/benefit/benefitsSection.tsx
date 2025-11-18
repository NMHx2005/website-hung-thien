import { motion } from 'framer-motion';
import { ShoppingCartOutlined, SoundOutlined, StarOutlined, CustomerServiceOutlined } from '@ant-design/icons'; // Sử dụng icon từ Ant Design
import './BenefitsSection.scss';

const BenefitsSection = () => {
    const benefits = [
        {
            title: 'Thiết kế website chuyên nghiệp',
            icon: <img src="./images/iconwebx.png" alt="web" style={{ width: '100%', height: '100%' }} />,
            description:
                'Hùng Dân cung cấp dịch vụ thiết kế website hiện đại, responsive tối ưu cho mọi thiết bị, giao diện thân thiện và trải nghiệm người dùng tuyệt vời.'
        },
        {
            title: 'Xây dựng thiết kế UI/UX hiện đại',
            icon: <img src="./images/iconngoisao.png" alt="ux" style={{ width: '100%', height: '100%' }} />,
            description:
                'Hùng Dân chuyên xây dựng thiết kế giao diện người dùng (UI) và trải nghiệm người dùng (UX) hiện đại, tối ưu hóa cho từng đối tượng khách hàng.'
        },
        {
            title: 'Xây dựng CRM ERP quản lý doanh nghiệp',
            icon: <img src="./images/iconapp.png" alt="erp" style={{ width: '100%', height: '100%' }} />,
            description:
                'Hùng Dân phát triển các ứng dụng web đa nền tảng, từ website doanh nghiệp đến hệ thống quản lý phức tạp, đáp ứng mọi nhu cầu kinh doanh.'
        },
        {
            title: 'Đội ngũ chuyên gia giàu kinh nghiệm',
            icon: <img src="./images/crmerp.png" alt="crm" style={{ width: '100%', height: '100%' }} />,
            description:
                'Hùng Dân sở hữu đội ngũ chuyên gia giàu kinh nghiệm trong lĩnh vực thiết kế website, xây dựng thiết kế đồ họa và phát triển phần mềm, đảm bảo chất lượng cao.'
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 35 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="benefits-section">
            <div className="benefits-container">
                <motion.div
                    className="section-heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-badge">Lợi ích</span>
                    <h2>Lợi ích khi làm việc với Hùng Dân</h2>
                    <p>
                        Kết hợp chuyên môn đa lĩnh vực với công nghệ tiên tiến, chúng tôi tạo nên giá trị lâu dài
                        và trải nghiệm vượt trội cho doanh nghiệp của bạn.
                    </p>
                </motion.div>

                <motion.div
                    className="benefits-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {benefits.map((benefit) => (
                        <motion.div
                            key={benefit.title}
                            className="benefit-item"
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                        >
                            <div className="benefit-icon">{benefit.icon}</div>
                            <h3 className="benefit-title">{benefit.title}</h3>
                            <p className="benefit-description">{benefit.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BenefitsSection;