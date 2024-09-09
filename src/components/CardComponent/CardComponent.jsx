import React from "react";
import product1 from '../../imgs/product1.png'
import { NameProduct, PriceWrapper, StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell, } from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { converPrice } from "../../utils";

const CardComponent = (props) => {
    const {countInStock, description, images, name, price, rating, type, colors, sizes, selled, discount, id} = props;
    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        navigate(`/detailproduct/${id}`);
    }
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{width: '200%', height: '200px'}}
            style={{ width: 240}}
            bodyStyle={{ padding: '10px' }} // Sử dụng bodyStyle để áp dụng kiểu cho phần thân
            cover={
                <img alt="example" src={images || product1} style={{height: 300}} />

            }
            onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
            disabled={countInStock === 0}
        >
            <StyleNameProduct>{type}</StyleNameProduct>
            <NameProduct>{name}</NameProduct>
            <WrapperReportText>
                <span style={{marginRight: '4px'}}>{rating}</span><StarFilled style={{ color: '#fadb14', marginRight: '5px', fontSize: '12px'}} /> 
                < WrapperStyleTextSell> ban {selled || 1000}+</WrapperStyleTextSell>
            </WrapperReportText>
             <WrapperPriceText>
               <span style={{marginRight: '10px'}}> {converPrice(price)}VND </span>
                <WrapperDiscountText>
                    <span> {discount || -20}%</span>
                </WrapperDiscountText>
             </WrapperPriceText>

        </WrapperCardStyle>
    )


}

export default CardComponent