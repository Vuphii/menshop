import React from "react";
import { WrapperinputStyle } from "./style";

const InputForm = (props) => {
    const { placeholder = 'nhap Text', ...rests }= props;
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value);
    }

    return (
        <WrapperinputStyle
            placeholder={placeholder}
            value={props.value}
            {...rests}
            onChange={handleOnchangeInput}
        />
    )
}
export default InputForm