import React, { useState, useEffect, useRef } from 'react';
import { MessageOutlined, CloseOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'; // Thêm CloseOutlined cho nút X
import './ButtonContact.scss';

const ButtonContact = () => {
    const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng popup
    const popupRef = useRef<HTMLDivElement>(null); // Ref để kiểm tra click bên ngoài

    // Xử lý mở/đóng popup
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    // Xử lý click bên ngoài để đóng popup
    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
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
                            href="https://zalo.me/0349740717"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="popup-icon zalo-icon">
                                <MessageOutlined />
                            </div>
                            <span>Zalo</span>
                        </a>
                    </div>
                    <div className="popup-item">
                        <a href="tel:0349740717">
                            <div className="popup-icon phone-icon">
                                <PhoneOutlined />
                            </div>
                            <span>Gọi ngay</span>
                        </a>
                    </div>
                    <div className="popup-item">
                        <a
                            href="mailto:hungnhandan@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="popup-icon email-icon">
                                <MailOutlined />
                            </div>
                            <span>Email</span>
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