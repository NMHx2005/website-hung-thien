import React from 'react';
import { ShoppingCartOutlined, SoundOutlined, StarOutlined, CustomerServiceOutlined } from '@ant-design/icons'; // Sử dụng icon từ Ant Design
import './BenefitsSection.scss';

const BenefitsSection = () => {
    return (
        <div className="benefits-section">
            <div className='container'>
                <div className="section-title">
                    <span> Lợi ích khi làm việc với Hùng Dân</span>
                </div>
                <div className="benefits-grid">
                    {/* Mục 1 */}
                    <div className="benefit-item">
                        <h3 className="benefit-title">Thiết kế website chuyên nghiệp</h3>
                        <div className="benefit-icon">
                            <ShoppingCartOutlined />
                        </div>
                        <p className="benefit-description">
                            Hùng Dân cung cấp dịch vụ thiết kế website hiện đại, responsive tối ưu cho mọi thiết bị, giao diện thân thiện và trải nghiệm người dùng tuyệt vời.
                        </p>
                    </div>

                    {/* Mục 2 */}
                    <div className="benefit-item">
                        <h3 className="benefit-title">Xây dựng thiết kế UI/UX hiện đại</h3>
                        <div className="benefit-icon">
                            <SoundOutlined />
                        </div>
                        <p className="benefit-description">
                            Hùng Dân chuyên xây dựng thiết kế giao diện người dùng (UI) và trải nghiệm người dùng (UX) hiện đại, tối ưu hóa cho từng đối tượng khách hàng.
                        </p>
                    </div>

                    {/* Mục 3 */}
                    <div className="benefit-item">
                        <h3 className="benefit-title">Phát triển ứng dụng web toàn diện</h3>
                        <div className="benefit-icon">
                            <StarOutlined />
                        </div>
                        <p className="benefit-description">
                            Hùng Dân phát triển các ứng dụng web đa nền tảng, từ website doanh nghiệp đến hệ thống quản lý phức tạp, đáp ứng mọi nhu cầu kinh doanh.
                        </p>
                    </div>

                    {/* Mục 4 */}
                    <div className="benefit-item">
                        <h3 className="benefit-title">Đội ngũ chuyên gia giàu kinh nghiệm</h3>
                        <div className="benefit-icon">
                            <CustomerServiceOutlined />
                        </div>
                        <p className="benefit-description">
                            Hùng Dân sở hữu đội ngũ chuyên gia giàu kinh nghiệm trong lĩnh vực thiết kế website, xây dựng thiết kế đồ họa và phát triển phần mềm, đảm bảo chất lượng cao.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitsSection;