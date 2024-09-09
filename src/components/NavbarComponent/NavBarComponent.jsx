import React from "react";
import { WrapperContent, WrapperLabelText, WrapperPriceText, WrapperTextValue } from "./style";
import { Checkbox, Rate } from "antd";

const   NavbarComponent = () => {
    const checkboxContent = () => {}
    const renderContent = (type, options) => {
        switch(type) {
            case "text":
                return options.map((option) => {
                    return <WrapperTextValue>{option}</WrapperTextValue>
        
                });
            case "checkbox":
                return (
                    <Checkbox.Group
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}
                        onChange={checkboxContent}
                    >
                        {options.map((option, index) => (
                            <Checkbox key={index} style={{ marginLeft: 0 }} value={option.value}>
                                {option.label}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                );
            case "star":
                return options.map((option, index) => (
                    <div key={index} style={{ display: 'flex', gap: '4px'}}>
                        <Rate disabled defaultValue={option} />
                        <span>{`từ ${option} sao`}</span>
                    </div>
                ));
            case "price":
                return options.map((option, index) => (
                    <WrapperPriceText>{option}</WrapperPriceText>
                ));
                default:
                    return null
    }
};
    return(
        <div>
            <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {renderContent('text', ['T-shirt', 'Shirt', 'Jacket'])}
            </WrapperContent>
            <br></br>
            <WrapperContent>    
                {renderContent('checkbox', [
                    {value:'size1', label: 'S'},
                    {value:'size2', label: 'M'},
                    {value:'size3', label: 'L'},
                    {value:'size4', label: 'XL'}

                ])}
            </WrapperContent>
            <br></br>
             <WrapperContent>
                {renderContent("star", [3, 4, 5])}
            </WrapperContent>
            <br></br>
             <WrapperContent>
                {renderContent("price", ['duoi 200000vnd', 'tren 200000vnd'])}
            </WrapperContent>
        </div>
    )

}

export default NavbarComponent;