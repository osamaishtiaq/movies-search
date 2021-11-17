import React, { useState, useEffect, Children } from "react";
import styled from "styled-components";
import Colors from "../theme/colors";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Slider = ({children, ...props}) => {
    const [offsetValue, setOffsetValue] = useState(0);
    const slideCount = Children.count(children);

    const sliderWidth = props.slideWidth * (slideCount - 4);

    useEffect(() => {
        console.log(offsetValue);
        console.log(slideCount);
    })

    const scrollBack = () => {
        if(offsetValue > 100){
            setOffsetValue(offsetValue - props.slideWidth);
        }
    }

    const scrollForward = () => {
        if(offsetValue !== sliderWidth){
            setOffsetValue(offsetValue + props.slideWidth);
        }
    }

    return (
        <SlideContainer offset={offsetValue} slideWidth={props.slideWidth}>
            <div className="wrapper">
                {children}
            </div>
            {slideCount > 5 ? (
                <div>
                    {offsetValue > 100 ? <button className="prevBtn" onClick={() => scrollBack()}>
                        <FaChevronLeft />
                    </button> : null}
                    {offsetValue < sliderWidth ? <button className="nextBtn" onClick={() => scrollForward()}>
                        <FaChevronRight />
                    </button> : null}
                </div>
            ) : null}
        </SlideContainer>
    );
}

const SlideContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 350px;
    justify-content: center;
    align-items: center;

    & .wrapper{
        width: auto;
        display: flex;
        position: absolute;
        transition: all 3s ease;
        left: -${(props) => props.offset}px;
    }

    & button{
        position: absolute;
        opacity: 0.5;
        cursor: pointer;
        border: 4px solid ${Colors.white};
        top: 40%;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${Colors.background};
        transition: all .7s ease;
        
        & svg{
            font-size: 20px;
            color: ${Colors.dark};
        }

        :hover{
            opacity: 1;
        }
    }

    & button.nextBtn{
        right: 10px;
    }

    & button.prevBtn{
       left: 10px;
    }
`;

export default Slider;