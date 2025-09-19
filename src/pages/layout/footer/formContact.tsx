import React from 'react';
import { Button } from 'antd';
import "./footer.scss"


const FormContact = () => {
    // Optional: Add form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    return (
        <div className="footer__contact">
            <div className="container">
                <h1>Gửi yêu cầu tư vấn miễn phí</h1>
                <p>Hùng Dân - Công Ty Thiết Kế Website Uy Tín, Chuyên Nghiệp, Chuẩn SEO</p>
                <div className="footer__content">
                    <form onSubmit={handleSubmit}>
                        <input
                            required
                            maxLength={11}
                            data-msg="Vui lòng nhập số điện thoại"
                            data-rule-phonevn=""
                            data-msg-phonevn="Số điện thoại chưa chính xác"
                            name="phone"
                            type="text"
                            placeholder="Số điện thoại cần tư vấn"
                        />
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="button-main"
                        >
                            Đăng ký tư vấn
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormContact;