import FormContact from "./formContact";
import "./footer.scss"

const Footer = () => {
    return (
        <>
            <FormContact />
            <div className="header__footer">
                <div className="title__footer">CÔNG TY KHOA HỌC CÔNG NGHỆ HÙNG DÂN</div>
                <div className="nav__footer">
                    <div>
                        <a href="#">Trang chủ</a>
                        <a href="#">Tham gia cổ đông</a>
                        <a href="#">Giới thiệu</a>
                    </div>
                    <div>
                        <a href="#">Tin tức sự kiện</a>
                        <a href="#">Tuyển dụng</a>
                        <a href="#">Liên hệ</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;