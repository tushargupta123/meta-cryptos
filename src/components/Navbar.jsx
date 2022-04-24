import React,{useState, useEffect} from 'react';
import { Button , Menu , Typography , Avatar } from 'antd';
import { NavLink } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined,MenuOutlined } from '@ant-design/icons';

const Navbar = () => {
const [activeMenu, setActiveMenu] = useState(true);
const [screenSize, setScreenSize] = useState(null);

useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize',handleResize);
},[]);

useEffect(() => {
    if(screenSize < 760) {
        setActiveMenu(false);
    } else {
        setActiveMenu(true);
    }
},[screenSize]);

    return (
        <>
        <div className="nav-container">
            <div className="logo-conatiner">
        <Typography.Title level={2} className="logo">
        <Avatar src="https://i.ibb.co/Z11pcGG/cryptocurrency.png" size='large'/>
           <NavLink to="/"> Cryptoverse</NavLink>
        </Typography.Title>
        <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
            <MenuOutlined />
        </Button>
        </div>
        {activeMenu && (
        <Menu theme='dark'>
            <Menu.Item icon={<HomeOutlined />}>
                <NavLink to='/'>Home</NavLink>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
                <NavLink to='/cryptocurrencies'>Cryptocurrencies</NavLink>
            </Menu.Item> 
            <Menu.Item icon={<MoneyCollectOutlined />}>
                <NavLink to='/exchanges'>Exchanges</NavLink>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
                <NavLink to='/news'>News</NavLink>
            </Menu.Item>
        </Menu>
        )}
        </div>
        </>
    )
}

export default Navbar;