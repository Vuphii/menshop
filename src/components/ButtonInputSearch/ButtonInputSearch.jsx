import React from 'react';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';


const ButtonInputSearch = (props) => {
    const { size, placeholder, textbutton, backgroundColor = '#fff', backgroundColorButton= '#e9e9e9'} = props;
    return (
        <div style={{display: 'flex', backgroundColor: "#d9d9d9"}}>

            <InputComponent
                size={size}
                placeholder={placeholder}
                style={{backgroundColor: backgroundColor}}
                
                
            />
            <ButtonComponent
                size='large'
                style={{ backgroundColor: backgroundColorButton, fontWeight: 'bold' }}
                textbutton={textbutton}>
    
            </ButtonComponent>
        </div>
    );
}

export default ButtonInputSearch;
