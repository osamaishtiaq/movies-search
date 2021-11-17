import styled from "styled-components";
import Colors from "../theme/colors";

export const Title = ({children, ...props}) => {
    return(
        <Text color={props.color} size={props.size}>{children}</Text>
    );
}

const Text = styled.h1`
    color: ${(props) => props.color ? `${props.color}`: `${Colors.dark}`};
    font-size: ${(props) => props.size}em;
    font-weight: 600;
    margin-block-start: 0em;
    margin-block-end: 0em;
`;