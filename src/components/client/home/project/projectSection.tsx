import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import './projectSection.scss';

const ProjectSection = () => {
    return (
        <section className="project-section">
            <div className="project-container">
                <div className="project-visual">
                    <div className="phone-mockup">
                        <div className="phone-screen">
                            <div className="heart-icon">
                                <HeartOutlined />
                            </div>
                            <div className="project-name">YÊU</div>
                        </div>
                    </div>
                </div>

                <div className="project-content">
                    <div className="project-label">DỰ ÁN</div>

                    <h1 className="project-title">
                        GIỚI THIỆU DỰ ÁN CÔNG NGHỆ THU GOM TÁI CHẾ RÁC YÊU
                    </h1>

                    <div className="project-description">
                        <p>
                            YÊU là dự án công nghệ hướng đến xây dựng một hệ sinh thái thu gom và tái chế rác thông minh, kết nối cộng đồng với các giải pháp môi trường bền vững. Lấy cảm hứng từ ý nghĩa cốt lõi của tình yêu – sự quan tâm, sẻ chia và gìn giữ. YÊU không chỉ là một cái tên, mà là một lời nhắc nhở yêu con người, yêu đời, yêu môi trường chính là yêu chính mình và tương lai của thế hệ sau.
                        </p>
                    </div>

                    <div className="project-mission">
                        <h3 className="project-title">Sứ mệnh:</h3>
                        <p className="project-text">
                            Tạo ra một nền tảng công nghệ thúc đẩy thu gom, phân loại và tái chế rác hiệu quả, đồng thời nâng cao ý thức bảo vệ môi trường trong cộng đồng bằng sự kết nối, minh bạch và tiện lợi.
                        </p>
                    </div>

                    <button className="learn-more-btn">
                        TÌM HIỂU THÊM
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;
