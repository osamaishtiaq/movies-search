import styled from "styled-components";

export const Container = ({children, ...props}) => {
    return(
        <Cont 
            justify={props.justify} 
            direction={props.direction} 
            align={props.align} 
            height={props.height}
            wrap={props.wrap}
            fullWidth={props.fullWidth}
        >
            {children}
        </Cont>
    )
}

const Cont = styled.div`
    display: flex;
    flex: 1;

    ${(props) => props.fullWidth ? `padding: 0` : `padding: 0 8rem`};

    flex-wrap: ${(props) => props.wrap};
    height: ${(props) => props.height};
    flex-direction: ${(props) => props.direction};
    align-items: ${(props) => props.align};
    justify-content: ${(props) => props.justify};
`;