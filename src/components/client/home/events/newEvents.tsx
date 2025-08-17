import { Swiper, SwiperSlide } from 'swiper/react';
import "./newEvents.scss";
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

export const NewEvents = () => {
    const posts = [
        {
            id: 1,
            image: "https://storage.googleapis.com/a1aa/image/pvf9NsVXFzsSuBYZnONzBoGsKJax8wAcbxYfCaSlLg0.jpg",
            title: "Top 10 Trang Web AI Hỗ Trợ Lập Trình Viên Hiệu Quả Nhất",
            date: "16/02/2025",
            categories: ["TỔNG HỢP", "BLOG"],
            description: "Khám phá top 10 trang web AI giúp lập trình viên tăng hiệu suất làm việc, tối ưu hóa code và phát triển phần mềm thông minh hơn."
        },
        {
            id: 2,
            image: "https://storage.googleapis.com/a1aa/image/_P1vxtpzbNpuPdJc7wv7DTfudwoL_7WIrI1tT99sGtc.jpg",
            title: "Top 10 Trang Web AI Hỗ Trợ Viết Content Tự Động Hiệu Quả Nhất 2025",
            date: "16/02/2025",
            categories: ["TỔNG HỢP", "BLOG"],
            description: "Khám phá Top 10 trang web AI viết content tự động giúp bạn tạo nội dung blog, quảng cáo, email, mô tả sản phẩm nhanh chóng, chuẩn SEO và sáng tạo."
        },
        {
            id: 3,
            image: "https://storage.googleapis.com/a1aa/image/HWfTGqgjGISkQp4_e9Tn06_posfSwtYbf0deUvpSIKQ.jpg",
            title: "JS TIPS - Một số cách viết JS ngắn gọn hơn",
            date: "18/06/2023",
            categories: ["BLOG", "LẬP TRÌNH"],
            description: "Hôm nay Daca.vn gửi tới các bạn một số những tips để giúp bạn code JS một cách hiệu quả, ngắn gọn hơn."
        },
        {
            id: 4,
            image: "https://storage.googleapis.com/a1aa/image/HWfTGqgjGISkQp4_e9Tn06_posfSwtYbf0deUvpSIKQ.jpg",
            title: "JS TIPS - Một số cách viết JS ngắn gọn hơn",
            date: "18/06/2023",
            categories: ["BLOG", "LẬP TRÌNH"],
            description: "Hôm nay Daca.vn gửi tới các bạn một số những tips để giúp bạn code JS một cách hiệu quả, ngắn gọn hơn."
        },
        {
            id: 5,
            image: "https://storage.googleapis.com/a1aa/image/HWfTGqgjGISkQp4_e9Tn06_posfSwtYbf0deUvpSIKQ.jpg",
            title: "JS TIPS - Một số cách viết JS ngắn gọn hơn",
            date: "18/06/2023",
            categories: ["BLOG", "LẬP TRÌNH"],
            description: "Hôm nay Daca.vn gửi tới các bạn một số những tips để giúp bạn code JS một cách hiệu quả, ngắn gọn hơn."
        },
        {
            id: 6,
            image: "https://storage.googleapis.com/a1aa/image/HWfTGqgjGISkQp4_e9Tn06_posfSwtYbf0deUvpSIKQ.jpg",
            title: "JS TIPS - Một số cách viết JS ngắn gọn hơn",
            date: "18/06/2023",
            categories: ["BLOG", "LẬP TRÌNH"],
            description: "Hôm nay Daca.vn gửi tới các bạn một số những tips để giúp bạn code JS một cách hiệu quả, ngắn gọn hơn."
        }
    ];

    return (
        <div className="project__list">
            <div className="container">
                <div className="header__content">
                    <span>Tin Tức Sự Kiện</span>
                    <hr />
                    <p>Cung Cấp những sự kiện tuyệt vời mang nhiều ý nghĩa</p>
                </div>
                <div className="blog-posts">
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        freeMode={true}
                        pagination={{ clickable: true }}
                        modules={[FreeMode, Pagination, Autoplay]}
                        className="mySwiper"
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }}
                    >
                        {posts.map((post) => (
                            <SwiperSlide key={post.id}>
                                <div className="blog-post">
                                    <img src={post.image} alt={post.title} />
                                    <div className="blog-post-content">
                                        <h2>{post.title}</h2>
                                        <div className="meta">
                                            <i className="fas fa-calendar-alt"></i> {post.date}
                                            <i className="fas fa-folder"></i> {post.categories.join(", ")}
                                        </div>
                                        <p>{post.description}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};