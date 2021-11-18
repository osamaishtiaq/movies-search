import React from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 12,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1424 },
      items: 5,
    },
    smallerDesktop: {
      breakpoint: { max: 1424, min: 1124 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1124, min: 950 },
      items: 3,
    },
    smallerTablet: {
      breakpoint: { max: 950, min: 604 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 604, min: 0 },
      items: 1,
    },
  };

const Slider = ({ children }) => {
    return (
        <SlideContainer>
            <Carousel containerClass="carouselContainer" responsive={responsive} autoPlay={true} >
                {children}
            </Carousel>
        </SlideContainer>
    );
}

const SlideContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 450px;
    justify-content: flex-start;
    align-items: flex-start;

    .carouselContainer{
        width: 100%;
        height: 100%;
    }
`;

export default Slider;