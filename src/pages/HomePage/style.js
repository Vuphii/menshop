import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperType = styled.div`
    display: flex;
    justify-content: flex-start; /* Căn chỉnh các phần tử con sang bên trái */
    align-items: center; /* Căn giữa các phần tử con theo chiều dọc */
    gap: 16px; /* Khoảng cách giữa các phần tử con */
    font-size: 15px; /* Kích thước phông chữ */
`;

 export const WrapperButtonMore = styled(ButtonComponent)`
   width: 100%;
    text-align: center;
    border-radius: 10px;
    
    &:hover {
        background-color: #212121; /* Màu nền khi hover */
        color: #fff; /* Màu chữ khi hover */
        border-radius: 20px;
        
        span {
            color: #fff; /* Màu chữ bên trong khi hover */
        }
    }
`;


export const WrapperProducts = styled.div`
        marginTop: 20px;
        display: flex;
        alignItems: center;
        gap: 20px;
        flex-wrap: wrap;

    
   
`;

