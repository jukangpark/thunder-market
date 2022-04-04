import styled from "styled-components";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'

const Wrapper = styled.div`
    max-width: 1024px;
    position: relative;
    margin: 0 auto;
    background-color: white;
`
const SlickSlide = styled.div`
    div {
        text-align: center;
    }
    img {
        display: block;
    }
`
const SlickBtn = styled.button`
    cursor: pointer;
    outline: none;
    background-color: transparent;
`
const SlideImg = styled.img`
    height: 298.25px;
    margin: 0 auto;
`
const RestyledSlider = styled(Slider)`
    .slick-arrow {
        z-index: 1;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 15px;
        height: 30px;
        ::before {
            position: absolute;
            display: inline-block;
            content: "";
            font-family: "Noto Sans KR", sans-serif;
            width: 10px;
            height: 10px;
            top: 8px;
            right: 10px;
        }
    }
    .slick-prev {
        left: calc(50% - 500px);
        background-image: url("data:image/png;base64,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");
    }
    .slick-next {
        right: calc(50% - 500px);
        background-image: url("data:image/png;base64,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");
    }
    .slick-slider, .slick-list {
        transform: translateZ(0);
    }
`
const MainSlide = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        SlideToScroll: 1,
        draggable: true,
        style: { position: "relative", display: "block" },
    }
    return (
        <Wrapper>
            <RestyledSlider {...settings}>
                <SlickSlide>
                    <SlickBtn>
                        <SlideImg src="https://media.bunjang.co.kr/images/nocrop/799185237.jpg" />
                    </SlickBtn>
                </SlickSlide>
                <SlickSlide>
                    <SlickBtn>
                        <SlideImg src="https://media.bunjang.co.kr/images/nocrop/794647554.jpg" />
                    </SlickBtn>
                </SlickSlide>
                <SlickSlide>
                    <SlickBtn>
                        <SlideImg src="https://media.bunjang.co.kr/images/nocrop/794647434.jpg" />
                    </SlickBtn>
                </SlickSlide>
            </RestyledSlider>
        </Wrapper>
    )
}
export default MainSlide;