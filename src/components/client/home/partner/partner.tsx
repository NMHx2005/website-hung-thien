import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "./partner.scss";

interface Logo {
    id: number;
    src: string;
    alt: string;
}

const Partner = () => {
    const [logos] = useState<Logo[]>([
        { id: 1, src: "https://storage.googleapis.com/a1aa/image/A5a8FN7cxr1Zu6EWiQmAhRxzN1pCBJaxnS44or7nbjQ.jpg", alt: "Logo of Đất Nền Miền Bắc" },
        { id: 2, src: "https://storage.googleapis.com/a1aa/image/WEUP8s-akK7CWDj8HMOSaWncdYtMcala10Wu7e9W46c.jpg", alt: "Logo of Sunflower" },
        { id: 3, src: "https://storage.googleapis.com/a1aa/image/mw6CE1fLSXV_vAQSqIk4eM40ptv7YmR-I9jCc0bXMms.jpg", alt: "Logo of Home" },
        { id: 4, src: "https://storage.googleapis.com/a1aa/image/D6Mf-J8oibx3XirLrhIyWuhI20NC91lumxh7AG9USxI.jpg", alt: "Logo of NTC" },
        { id: 5, src: "https://storage.googleapis.com/a1aa/image/ZtwfXceWiT5KSM3Ig-F6GEvZTIaXLHGO6PMS6na9Ni4.jpg", alt: "Logo of Hong Ha" },
        { id: 6, src: "https://storage.googleapis.com/a1aa/image/HQZHueAHrM9D6M8rkcSFUpxXh82zVz2JHZymGCUV1GE.jpg", alt: "Logo of Sonha" },
        { id: 7, src: "https://storage.googleapis.com/a1aa/image/A5a8FN7cxr1Zu6EWiQmAhRxzN1pCBJaxnS44or7nbjQ.jpg", alt: "Logo of TechCorp" },
        { id: 8, src: "https://storage.googleapis.com/a1aa/image/WEUP8s-akK7CWDj8HMOSaWncdYtMcala10Wu7e9W46c.jpg", alt: "Logo of GreenLeaf" },
        { id: 9, src: "https://storage.googleapis.com/a1aa/image/mw6CE1fLSXV_vAQSqIk4eM40ptv7YmR-I9jCc0bXMms.jpg", alt: "Logo of BlueSky" },
        { id: 10, src: "https://storage.googleapis.com/a1aa/image/D6Mf-J8oibx3XirLrhIyWuhI20NC91lumxh7AG9USxI.jpg", alt: "Logo of StarTech" },
        { id: 11, src: "https://storage.googleapis.com/a1aa/image/ZtwfXceWiT5KSM3Ig-F6GEvZTIaXLHGO6PMS6na9Ni4.jpg", alt: "Logo of OceanWave" },
        { id: 12, src: "https://storage.googleapis.com/a1aa/image/HQZHueAHrM9D6M8rkcSFUpxXh82zVz2JHZymGCUV1GE.jpg", alt: "Logo of BrightFuture" },
        { id: 13, src: "https://storage.googleapis.com/a1aa/image/A5a8FN7cxr1Zu6EWiQmAhRxzN1pCBJaxnS44or7nbjQ.jpg", alt: "Logo of CloudNine" },
        { id: 14, src: "https://storage.googleapis.com/a1aa/image/WEUP8s-akK7CWDj8HMOSaWncdYtMcala10Wu7e9W46c.jpg", alt: "Logo of SilverLining" },
        { id: 15, src: "https://storage.googleapis.com/a1aa/image/mw6CE1fLSXV_vAQSqIk4eM40ptv7YmR-I9jCc0bXMms.jpg", alt: "Logo of GoldenPath" },
    ]);

    return (
        <div className="partner">
            <div className="container">
                <div className="partner__title">+2.000 khách hàng đã sử dụng Dịch Vụ</div>
                <div className="partner__underline"></div>
                <div className="partner__subtitle">
                    Sự hài lòng của khách hàng chính là thành công lớn nhất của chúng tôi
                </div>
                <div className="partner__logos">
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={5} // Mặc định là 5 cho desktop
                        loop={true}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                        }}
                        freeMode={true}
                        modules={[FreeMode, Autoplay]}
                        breakpoints={{
                            // Khi màn hình nhỏ hơn 768px (mobile)
                            320: {
                                slidesPerView: 2, // Chỉ hiển thị 1 slide
                                spaceBetween: 20, // Giảm khoảng cách cho mobile
                            },
                            // Có thể thêm breakpoint trung gian nếu muốn
                            768: {
                                slidesPerView: 3, // Tablet
                                spaceBetween: 30,
                            },
                            // Desktop giữ nguyên 5
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }}
                    >
                        {logos.map((logo) => (
                            <SwiperSlide key={logo.id}>
                                <div className="partner__logo-item">
                                    <img src={logo.src} alt={logo.alt} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Partner;