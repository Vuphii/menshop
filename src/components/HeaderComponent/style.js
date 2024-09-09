import styled from 'styled-components';
import { Row } from 'antd';

export const WrapperHeader = styled(Row)`
    padding: 10px 50px; /* Padding cho WrapperHeader */
    background-color: #d9d9d9; /* Màu nền */
    align-items: center; /* Căn giữa nội dung theo chiều dọc trong WrapperHeader */
    flex-wrap: nowrap; /*
    width: 1270px;
`;

export const WrapperText = styled.div`
    font-size: 14px;
    color: #000;
    background-color: #e9e9e9; /* Màu nền của văn bản */
    font-weight: bold;
    border-radius: 10px;
    padding: 5px;
    display: inline-flex; /* Đảm bảo bao quanh nội dung */
    align-items: center;
    
`;

export const WrapperText2 = styled.div`
    font-size: 18px;
    color: #FFF;
    background-color: #212121; /* Màu nền của văn bản trong WrapperText2 */
    font-weight: bold;
    border-radius: 25px;
    padding: 5px;
    display: inline-flex; /* Đảm bảo bao quanh nội dung */
    align-items: center;
    margin-right: 10px; /* Khoảng cách giữa MEN SHOP và STORE */
`;

export const WrapperImg = styled.img`
    margin-right: 20px; /* Khoảng cách giữa logo và văn bản */
    height: 50px; /* Chiều cao của logo */
    width: auto; /* Giữ tỷ lệ gốc của logo */
`;

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        background: red;
        color: white; 
    }
`;
export const commonStyle = {
    cursor: 'pointer',
    padding: '5px 8px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s, color 0.3s',
};

export const normalStyle = {
    ...commonStyle,
    backgroundColor: '#212121',
    color: 'white',
};

export const hoverStyle = {
    ...commonStyle,
    backgroundColor: '#d9d9d9',
    color: '#212121',
    fontWeight: 'bold', // Thay đổi trọng số font khi hover
};
export const styleAvatar = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '#212121 4px solid'
};
export const styleUser = {
    fontSize: '24px', 
    background: '#212121', 
    color: 'white',  
    padding: '7px', 
    borderRadius: '50%',  
    objectFit: 'cover',
};
export const styleCart = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'center',
    border: '#212121 4px solid',
    color: '#000',
    backgroundColor: 'white',
    fontSize: '24px', 


};