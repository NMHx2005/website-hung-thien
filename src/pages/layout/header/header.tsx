import { MenuOutlined } from "@ant-design/icons";
import "./header.scss"
import { Dropdown, MenuProps, Space } from "antd";

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
                                <MenuOutlined />
                            </div>
                        </Dropdown>
                    </Space>
                </Space>
                <div className="container" >
                    <div className="header__content--left">
                        <img src="/images/logo_HungThien.png"
                            alt="Logo with abstract design"
                            className="logo"
                        />
                        <div className="title" >HÙNG DÂN</div>
                    </div>
                    <div className="slogan" >CÔNG NGHỆ VÌ NHÂN DÂN</div>
                </div>
            </header>
        </>
    );
}

export default Header;