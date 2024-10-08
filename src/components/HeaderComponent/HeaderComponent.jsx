import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover, Row} from 'antd';
import { WrapperHeader, WrapperText, WrapperText2, WrapperImg, WrapperContentPopup } from './style';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'; 
import logo from '../../imgs/logo.png';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/useSlide';
import {hoverStyle, normalStyle, styleAvatar, styleUser, styleCart} from '../../components/HeaderComponent/style'; // Nhập các kiểu CSS đúng cách
import { searchProduct } from '../../redux/slides/productSlide';




const HeaderComponent = ({isHiddenSearch = false, isHiddenCart = false}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [isOpenPoup, setIsOpenPoup] = useState(false);
    const [isClickedCart, setIsClickedCart] = useState(false);
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);


    const handleNavigateLogin = () => {
        navigate('/signin');
    }
    console.log('user', user);
    
    const handleLogout = async () => {
        await UserService.logOutUser()
        dispatch(resetUser())
    }
    useEffect(() => {
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopup onClick={()=> handleClickNavigate('profile')}>Infor User</WrapperContentPopup>
            {user?.isAdmin && ( // Corrected the typo here
                <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quan ly he thong</WrapperContentPopup>
            )}
            <WrapperContentPopup  onClick={() => handleClickNavigate('my-order')}> Don hang cua toi </WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout}> Log out </WrapperContentPopup>



        </div>
    );
    const handleClickNavigate = (type) => {
        if(type === 'profile'){
            navigate('/profile');
        }else if(type === 'admin'){
            navigate('/system/admin');
        }else if(type === 'my-order'){
            navigate('/my-order');
        }else{
            handleLogout();
        }
        setIsOpenPoup(false);
    }
       
   const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));    
    console.log('e',e.target.value);
   }
    return (
        <WrapperHeader style={{justifyContent: isHiddenCart && isHiddenSearch ? 'space-between' : 'unset'}} gutter={16}>
        <Col span={10} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <WrapperImg
                        src={logo} // Sử dụng biến logo đã nhập
                        alt="Logo"
                    />
                    <WrapperText>
                        <WrapperText2>
                            MEN SHOP
                        </WrapperText2>
                        STORE
                    </WrapperText>
                </div>
        </Col>
        {!isHiddenSearch && (
            <Col span={9}>
                    <ButtonInputSearch

                        size="large"
                        placeholder="Tìm kiếm sản phẩm"
                        textbutton="Search"
                        onChange={onSearch}

                    />
            </Col>
        )}
        <Col span={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
                   {!isHiddenCart && (
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                            <div 
                                style={isClickedCart ? hoverStyle : normalStyle}
                                onClick={() => navigate('/order')}
                            >
                                <span style={{ marginRight: '8px' }}>Cart</span>
                            </div>
                            <Badge  count={order?.orderItems?.length} size='small'>
                                <ShoppingCartOutlined style={styleCart} />
                            </Badge>
                        </div>
                   )}
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        {user?.access_token ? (
                            <>
                                <Popover content = {content} trigger="click" open={isOpenPoup}>
                                    <div 
                                        style={isOpenPoup ? hoverStyle : normalStyle}
                                        onClick={() => setIsOpenPoup((prev) => !prev)}
        
                                         >
                                            {user.name.length ? user.name : user?.email}
                                    </div>
                                </Popover>
                            </>
                        ) : (
                            <div onClick={handleNavigateLogin} style={{cursor: 'pointer', ...normalStyle}}>
                                <span style={{ marginRight: '8px', cursor: 'pointer'}}>Sign in/Sign out</span>
                            </div>
                        )}
                        {userAvatar ? (<img src={userAvatar} alt='avatar' style={styleAvatar}/>):(
                        <UserOutlined style={styleUser} />)}
                    </div>
                </div>
            </Col>
    </WrapperHeader>
    )
}

export default HeaderComponent;