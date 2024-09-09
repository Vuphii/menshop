import { Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
    background: rgb(255, 255, 255);
    padding: 9px 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    span {
        color: rgb(36, 36, 36);
        font-weight: 400;
        font-size: 13px;
    }
`
export const WrapperLeft = styled.div`
    width: 910px;
`
export const WrapperListOrder = styled.div`
`
export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: 9px 16px;
    background: #fff;
    margin-top: 12px;
`
export const WrapperPriceDiscount = styled.span`
    color: #999;
    font-size: 12px;
    text-decoration: line-through;
    margin-left: 4px;

`
export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    width: 84px;
    border-radius: 4px;
    border: 1px solid #ccc;
`

export const WrapperRight = styled.div`
    width: 320px;
    margin-left: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-direction: column;

`
export const WrapperInfo = styled.div`
    padding: 17px 20px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    width: 100%;
`
export const WrapperTotal = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 17px 20px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #f0f8ff;
`

export const LAble = styled.span`
    font-weight: bold;
    font-size: 12px;
    color: #0000;
`
export const WrapperRadio = styled(Radio.Group)`
    margin-top: 6px;
    background: rgb(240, 248, 255);
    border: 1px solid rgb(194, 255, 255);
    border-radius: 4px;
    padding: 16px;
    gap: 12px;
    width: 500px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    height: 100px;
`