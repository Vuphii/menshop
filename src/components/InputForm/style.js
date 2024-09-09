import { Input } from "antd";
import styled from "styled-components";

export const WrapperinputStyle = styled(Input)`
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none;
        &: focus {
            bacground-color: rgb:(232, 240, 254);

        
        }
`;