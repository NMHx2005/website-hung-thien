import { motion } from "framer-motion";
import "./partner.scss";

const Partner = () => {
    const services = [
        "Tư vấn chiến lược chuyển đổi số toàn diện",
        "Xây dựng hệ thống vận hành & CRM chuyên biệt",
        "Thiết kế nhận diện thương hiệu đa kênh",
        "Tạo lập trải nghiệm khách hàng đột phá"
    ];

    const stats = [
        { value: "x+", label: "Năm đồng hành cùng doanh nghiệp" },
        { value: "2000+", label: "Dự án triển khai thành công" },
        { value: "98%", label: "Khách hàng quay lại hợp tác" }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const listVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2 + i * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    return (
        <motion.section
            className="brand-hero"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={containerVariants}
        >
            <div className="brand-hero__glow brand-hero__glow--primary" aria-hidden />
            <div className="brand-hero__glow brand-hero__glow--secondary" aria-hidden />
            <div className="container">
                <div className="brand-hero__layout">
                    <motion.div className="brand-hero__content" variants={containerVariants}>
                        <span className="brand-hero__badge">Giải pháp chuyển đổi số</span>
                        <h2 className="brand-hero__heading">
                            Đồng hành xây dựng thương hiệu dẫn đầu kỷ nguyên số
                        </h2>
                        <p className="brand-hero__description">
                            Từ chiến lược vận hành đến trải nghiệm khách hàng, Hùng Thiên thiết kế lộ trình tăng trưởng
                            phù hợp cho từng doanh nghiệp để bạn bứt phá ở bất kỳ giai đoạn nào.
                        </p>
                        <motion.ul
                            className="brand-hero__services"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.35 }}
                        >
                            {services.map((service, index) => (
                                <motion.li
                                    key={service}
                                    custom={index}
                                    variants={listVariants}
                                >
                                    <span className="brand-hero__index">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span>{service}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                        <div className="brand-hero__cta">
                            <motion.button
                                className="brand-hero__btn brand-hero__btn--primary"
                                whileHover={{ y: -3, boxShadow: "0 18px 38px rgba(249, 58, 101, 0.45)" }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                            >
                                Liên hệ tư vấn
                            </motion.button>
                            <motion.button
                                className="brand-hero__btn brand-hero__btn--ghost"
                                whileHover={{ y: -3, boxShadow: "0 18px 32px rgba(247, 91, 91, 0.25)" }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                            >
                                Nhận brochure
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.aside className="brand-hero__panel" variants={containerVariants}>
                        <motion.div
                            className="brand-hero__stats"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.45 }}
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="brand-hero__stat"
                                    custom={index}
                                    variants={listVariants}
                                >
                                    <span className="brand-hero__stat-value">{stat.value}</span>
                                    <span className="brand-hero__stat-label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="brand-hero__card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="brand-hero__card-header">
                                <span className="brand-hero__card-badge">Case Study</span>
                                <span className="brand-hero__card-legend">Bộ giải pháp 90 ngày</span>
                            </div>
                            <h3 className="brand-hero__card-title">
                                Tăng trưởng 3x leads cho doanh nghiệp công nghệ chỉ sau một quý
                            </h3>
                            <p className="brand-hero__card-description">
                                Nâng cấp hệ thống CRM, tái thiết kế website và xây dựng chiến dịch trải nghiệm khách hàng đa kênh
                                giúp doanh nghiệp tối ưu quy trình vận hành & gấp ba lượng khách hàng tiềm năng.
                            </p>
                            <div className="brand-hero__card-footer">
                                <div className="brand-hero__avatar">
                                    <span>HT</span>
                                </div>
                                <div>
                                    <div className="brand-hero__client-name">Nguyễn Tiến Hùng</div>
                                    <div className="brand-hero__client-role">Giám đốc điều hành Hung Dan</div>
                                </div>
                                <motion.button
                                    className="brand-hero__view-more"
                                    type="button"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Xem chi tiết
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.aside>
                </div>
            </div>
        </motion.section>
    );
};

export default Partner;