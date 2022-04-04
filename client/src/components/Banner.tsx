import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    margin: 16px auto 0px;
    max-width: 1024px;
    height: 200px;
`
const BannerImg = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 0;
`
const ImgShadow = styled.div`
    position: absolute;
    width: 94px;
    height: 94px;
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 7px;
    padding: 8px;
    background-color: rgb(255, 255, 255);
    top: 53px;
    left: 155px;
    bottom: 53px;
`
const QRImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`
const Banner = () => {
    return(
        <Wrapper>
            <BannerImg src="/uploads/product/appdownload-banner.75b0fd5a.png" />
            <ImgShadow>
                <QRImg src="data:image/png;base64,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" />
            </ImgShadow>
        </Wrapper>
    )
}
export default Banner;