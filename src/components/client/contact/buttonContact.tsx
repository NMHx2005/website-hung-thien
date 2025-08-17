import React, { useState, useEffect, useRef } from 'react';
import { MessageOutlined, CloseOutlined, PhoneOutlined } from '@ant-design/icons'; // Thêm CloseOutlined cho nút X
import './ButtonContact.scss';

const ButtonContact = () => {
    const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng popup
    const popupRef = useRef(null); // Ref để kiểm tra click bên ngoài

    // Xử lý mở/đóng popup
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    // Xử lý click bên ngoài để đóng popup && !popupRef.current.contains(event.target)
    const handleClickOutside = (event: any) => {
        if (popupRef.current) {
            setIsOpen(false);
        }
    };

    // Thêm sự kiện click bên ngoài khi popup mở
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="contact-button">
            <div className="pulse-effect">
                <div className="content-wrapper" onClick={togglePopup}>
                    <div className="icon-wrapper">
                        {isOpen ? (
                            <CloseOutlined className="chat-icon" />
                        ) : (
                            <MessageOutlined className="chat-icon" />
                        )}
                    </div>
                    <span className="contact-text">Liên hệ</span>
                </div>
            </div>

            {/* Popup */}
            {isOpen && (
                <div className="contact-popup" ref={popupRef}>
                    <div className="popup-item">
                        <a
                            href="https://m.me/your-messenger-id"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="popup-icon messenger-icon"> </div>
                            <span>Messenger</span>
                        </a>
                    </div>
                    <div className="popup-item">
                        <a
                            href="https://zalo.me/your-zalo-id"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="popup-icon zalo-icon"></div>
                            <span>Zalo</span>
                        </a>
                    </div>
                    <div className="popup-item">
                        <a href="tel:+1234567890">
                            <div className="popup-icon phone-icon">

                            </div>
                            <span>Gọi ngay</span>
                        </a>
                    </div>
                    {/* <div className="close-button" onClick={togglePopup}>
                        <CloseOutlined className="close-icon" />
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default ButtonContact;