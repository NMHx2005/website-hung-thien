import React from 'react';
import './missionSection.scss';

const MissionSection = () => {
    return (
        <section className="mission-section">
            <div className="mission-content">
                <div className="mission-heading">
                    <h1>KHOA HỌC VÌ NHÂN</h1>
                    <h1>CÔNG NGHỆ VÌ DÂN</h1>
                </div>

                <div className="mission-body">
                    <h2>CÔNG TY KHOA HỌC CÔNG NGHỆ HÙNG DÂN</h2>

                    <p>
                        Với tầm nhìn trở thành tập đoàn tiên phong trong nghiên cứu khoa học và ứng dụng công nghệ hiện đại.
                    </p>

                    <p>
                        HÙNG DÂN luôn đặt con người làm trung tâm của sự phát triển. Chúng tôi tập trung tạo ra những giải pháp khoa học – công nghệ mang tính ứng dụng cao, phục vụ thiết thực cho đời sống con người, kinh tế và xã hội.
                    </p>

                    <p className="mission-principle">
                        "Khoa học vì nhân - Công nghệ vì dân" – là kim chỉ nam cho mọi hoạt động của HÙNG DÂN
                    </p>

                    <p>
                        Cam kết phát triển khoa học công nghệ gắn liền với lợi ích nhân dân, vì một tương lai tiến bộ và bền vững.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
