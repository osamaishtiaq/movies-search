import styled from "styled-components"
import Colors from "../theme/colors"

const Loader = () => {
    return(
        <LoadingScreen>
            <h1>Loading...</h1>
        </LoadingScreen>
    )
}

const LoadingScreen = styled.div`
    height: 100vh;
    width: 100vw;
    backgorund: ${Colors.dark};
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Colors.pink};
`;

export default Loader;