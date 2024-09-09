import React  from "react";
import { Input } from "antd";
import { SearchOutlined } from '@ant-design/icons'; 

const InputComponent = ({size, placeholder, style, ...rests }) => {
    return(
        <Input 
        size={size}
        placeholder={placeholder}
        prefix={<SearchOutlined />} 
        style={style}
        {...rests}

        
    />
    
    )

}
export default InputComponent