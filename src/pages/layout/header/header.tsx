import { MenuOutlined } from "@ant-design/icons";
import "./header.scss";
import { Dropdown, MenuProps, Space } from "antd";
import logo from "@/assets/images/logo_HungThien.png";

const Header = () => {

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Tư Vấn Ngay
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Liên Hệ
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Cộng Tác
                </a>
            ),
        },
    ];

    return (
        <>
            {/* <Space direction="vertical">
                <Space wrap>
                    <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                        <Button>bottomRight</Button>
                    </Dropdown>
                </Space>
            </Space> */}
            <header className="header" >
                <Space direction="vertical">
                    <Space wrap>
                        <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                            {/* <Button>bottomRight</Button> */}
                            <div className="menu-icon" >
                                <MenuOutlined style={{ fontSize: '24px' }} />
                            </div>
                        </Dropdown>
                    </Space>
                </Space>
                <div className="container">
                    <div className="header__content--left">
                        <img
                            src={logo}
                            alt="Hung Thien logo"
                            className="header__logo-image"
                        />
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;