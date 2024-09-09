import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)
`
    width: 200px;
    &img {
        height: 200px
        width: 200px;
    },
    position: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`

export const StyleNameProduct = styled.div`
font-size: 12px; /* Kích thước chữ */
  color: #333; /* Màu chữ */
  margin-top: 10px; /* Khoảng cách phía trên */
  text-align: left; /* Căn trái chữ */
  text-transform: uppercase; /* Chuyển đổi thành chữ in hoa */
  /* Các thuộc tính CSS khác nếu cần */

`
export const NameProduct = styled.div`
  font-size: 14px; /* Kích thước chữ cho mô tả sản phẩm */
  color: #666; /* Màu chữ cho mô tả */
  margin-top: 3px; /* Khoảng cách phía trên cho mô tả */
  text-align: left; /* Căn trái cho mô tả */
  font-weight: bold; /* In đậm chữ */

`;
export const WrapperReportText = styled.div`
  font-size: 11px;
  color: #333;
  margin-top: 5px;
  text-align: left;
  display: flex;
  align-items: center;
`;

export const PriceWrapper = styled.div`
  display: flex;           /* Sử dụng flexbox để căn chỉnh theo chiều ngang */
  justify-content: flex-start; /* Căn chỉnh về phía bên trái */
  align-items: center;
  margin-top: 5px;
`;
export const WrapperPriceText = styled.div`
  font-size: 16px;
  color: #d32f2f; /* Màu đỏ cho giá */
  font-weight: bold;
  text-align: left;
  margin-right: 10px; /* Khoảng cách giữa giá và mức giảm giá */
  margin: 4px 0;
`;

export const WrapperDiscountText = styled.span`
  font-size: 12px;
  color: #d32f2f; /* Màu đỏ cho mức giảm giá */
  text-align: left;
  margin-left: 5px; /* Khoảng cách giữa mức giảm giá và đơn vị giảm giá */
  

`;
export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height 24px;
    color: rgb(120, 120, 120)

`