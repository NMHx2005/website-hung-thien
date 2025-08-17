import React from 'react';
import { ShoppingCartOutlined, SoundOutlined, StarOutlined, CustomerServiceOutlined } from '@ant-design/icons'; // Sử dụng icon từ Ant Design
import './BenefitsSection.scss';

const BenefitsSection = () => {
    return (
        <div className="benefits-section">
            <div className='container'>
                <div className="section-title">
                    <span> Lợi ích khởi tạo Website với Hùng Thiên</span>
                </div>
                <div className="benefits-grid">
                    {/* Mục 1 */}
                    <div className="benefit-item">
                        <h3 className="benefit-title">Thiết kế chuyên nghiệp, chuẩn SEO</h3>
                        <div className="benefit-icon">
                            <ShoppingCartOutlined />
                        </div>
                        <p className="benefit-description">
                            Website được thiết kế hiện đại, thân thiện với người dùng và tối ưu hóa chuẩn SEO giúp nâng cao thứ hạng trên Google, thu hút nhiều khách hàng tiềm năng.
                        </p>
                    </div>

                    {/* Mục 2 */}
                    <div className="benefit-item">
                        <h3 className="benefit-title">Tốc độ tải nhanh, hoạt động ổn định</h3>
                        <div className="benefit-icon">
                            <SoundOutlined />
                        </div>
                        <p className="benefit-description">
                            Hùng Thiên sử dụng công nghệ tiên tiến và hạ tầng mạnh mẽ, đảm bảo website hoạt động mượt mà, tốc độ truy cập nhanh, không gián đoạn.
                        </p>
                    </div>

                    {/* Mục 3 */}
                    <div className="benefit-item">
                        <h3 className="benefit-title">Tích hợp đầy đủ chức năng cần thiết</h3>
                        <div className="benefit-icon">
                            <StarOutlined />
                        </div>
                        <p className="benefit-description">
                            Từ quản lý sản phẩm, đơn hàng đến tích hợp thanh toán, chat trực tuyến… mọi tính năng đều được tích hợp đầy đủ, giúp doanh nghiệp vận hành hiệu quả.
                        </p>
                    </div>

                    {/* Mục 4 */}
                    <div className="benefit-item">
                        <h3 className="benefit-title">Hỗ trợ và bảo trì lâu dài</h3>
                        <div className="benefit-icon">
                            <CustomerServiceOutlined />
                        </div>
                        <p className="benefit-description">
                            Khách hàng được hỗ trợ kỹ thuật tận tâm và bảo trì website định kỳ, đảm bảo hệ thống luôn an toàn, cập nhật và hoạt động ổn định theo thời gian.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitsSection;