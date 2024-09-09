import { Upload } from "antd";
import styled from "styled-components";

export const WrapperContentHeader = styled.h1`
    font-size: 16px;
    color: #333;
`;
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid #ccc;
    width: 600px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 30px;

`;
export const WrapperLabel = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 32px;
    font-weight: 600;
    width: 60px;
    text-align: left;
`;
export const WrapperInput = styled.div`
    display: flex;
    gap: 20px;
    align-items: center; 
`;

export const WrapperUploadFIle = styled(Upload)`
      &.ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
     & .ant-upload-list-item-info {
        display: none;
      }

`;