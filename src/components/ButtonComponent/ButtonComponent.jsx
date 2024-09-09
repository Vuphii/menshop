import React  from "react";
import { Button } from "antd";

const ButtonComponent = ({size, type, style, textbutton, styleTextButton, disabled, ...rests}) => {
    return(
        <Button 
        style={{
            ...style,
            background: disabled ? '#ccc' : style.background
        }}
        size={size}
        type={type}

        {...rests}

    >
        <span style={styleTextButton}>{textbutton}</span>
    
    </Button>
    
    )

}
export default ButtonComponent