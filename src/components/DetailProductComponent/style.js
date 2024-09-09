import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 55px;
    width: 55px;
    padding: 3px;
`;
export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`;
export const WrapperStyleNameProduct = styled.h1`
    font-size: 16px;
    background: #d9d9d9;
    font-weight: bold;
    font-height: 32px;
    word-break: break-word;
    border-radius: 20px;
    padding: 20px;
    margin-right: 200px;
`;
export const WrapperStyleTextSell = styled.div`
    span.rating{
        font-size: 18px;
        line-height 24px;
        font-weight: 500;
    };
    span.sell{
        font-size: 15px;
        line-height 24px;
        color: red;
    };    
`;
export const WrapperPriceProduct = styled.div`
    background: rgb(255, 255, 255);
    border-radius: 4px;
`
export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    line-height 40px;
    margin-right: 10px;
    font-weight: bold;
    padding: 5px;
`;
export const WrapperAddressProduct = styled.div`
    span.diachi{
       font-size: 18px;
       font-weight: 500;
    };
    span.adress {
        text- decoration:underline;
        font-size: 15px;
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    };
    span.change-address {
        color: blue;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
    }


`;
export const WrapperDescriptionProduct = styled.div`
   span.description{
   font-size: 18px;
   font-weight: 500;
   };
   span.mota{
   };
`;

export const WrapperQualityProduct = styled.div`
    display: flex;
    border-radius: 2px;
    align-items: center;
    border: 1px solid #ccc;
    width: 120px;
    border-radius: 4px;
    gap: 4px;
   
    
    `;
export const WrapperBtQualityProduct = styled.span`
`;

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 80px;
        border-top: none;
        border-bottom: none;
        &.ant.input-number-handler-wrap {
            display: none;
        }
    };
    
`;

export const WrapperColorSelect = styled.div`
margin-top: 10px;
span {
    font-size: 18px;
    font-weight: 500;
}
`;
export const ColorSwatch = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: ${(props) => props.color};
    border: ${(props) => props.isSelected ? '2px solid black' : '2px solid transparent'};
    cursor: pointer;
    box-shadow: ${(props) => props.isSelected ? '0 0 0 2px rgba(0,0,0,0.2)' : 'none'};
`;

export const WrapperSizeSelect = styled.div`
    margin-top: 10px;
    span {
        font-size: 18px;
        font-weight: 500;
    }
`;

export const SizeButton = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.isSelected ? '#333' : '#e0e0e0'};
    color: ${(props) => props.isSelected ? '#fff' : '#333'};
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    border: 1px solid #ccc;
`;