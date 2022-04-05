import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    top: 102px;
    right: calc(50% - 617px);
    z-index: 20;
`
const Wrapper = styled.div`
    width: 90px;
    > div {
        padding: 10px;
        width: 100%;
        border: 1px solid rgb(204, 204, 204);
        background: ${(props) => props.theme.bgColor};
        margin-bottom: 6px;
        box-sizing: border-box;
        :first-child {
            border: 1px solid rgb(102, 102, 102);
        }
        :last-child {
            padding: 0;
            margin-bottom: 0;
            color: black;
        }
    }
`
const FirstBox = styled.div`

`
const FirstText = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: ${(props) => props.theme.btnColor};
    text-align: center;
    margin-bottom: 8px;
`
const FirstImg = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
`
const FirstLink = styled.a`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-size: 12px;
    color: rgb(204, 204, 204);
    font-weight: 600;
`
const HeartImg = styled.img`
    width: 9px;
    height: 9px;
    margin-right: 5px;
`
const SecondBox = styled.div`
    
`
const SecondText = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: ${(props) => props.theme.btnColor};
    text-align: center;
    margin-bottom: 8px;
`
const Current = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    margin-bottom: 10px;
`
const CurrentNum = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    font-size: 12px;
    color: ${(props) => props.theme.accentColor};
    font-weight: 600;
    width: 38px;
    border-bottom: 2px dotted rgb(136, 136, 136);
    padding-bottom: 10px;
`
const CurrentImgBox = styled.div`
    width: 100%;
`
const CurrentImgLink = styled.a`
    display: block;
    width: 100%;
    margin-bottom: 5px;
    border: 1px solid transparent;
    position: relative;
    font-size: 13px;
    :last-child {
        margin-bottom: 0;
    }
`
const CurrentImgCover = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
`
const CurrentImg = styled.img`
    width: 100%;
`
const CurrentBtnBox = styled.div`
    margin-top: 8px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
`
const CurrentBtn = styled.button`
    width: 15px;
    height: 15px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border: 1px solid rgb(229, 229, 229);
`
const CurrentBtnImg = styled.img`
    width: 5px;
    height: 9px;
`
const CurrentBtnNum = styled.div`
    font-size: 12px;
    color: rgb(136, 136, 136);
    margin: 0 10px;
`
const DownloadBox = styled.div`
    
`
const DownloadText = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: ${(props) => props.theme.btnColor};
    text-align: center;
    margin-bottom: 8px;
`
const DownloadImgBox = styled.div`
    box-shadow:  rgb(0 0 0 / 12%) 0px 0px 7px 0px;
    width: 50px;
    height: 50px;
    padding: 8px;
    margin: 16px auto 6px;
`
const DownloadImg = styled.img`
    display: block;
    width: 50px;
    height: 50px;
`
const DirectTopBox = styled.div`
`
const DirectTopBtn = styled.button`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 40px;
    width: 100%;
    font-weight: 600;
    font-size: 13px;
    color: rgb(102, 102, 102);
    cursor: pointer;
`
const SideSlider = () => {
    const onClick = (document: any) => {
        document.scrollingElement?.scrollTop()
    }
    return (
        <Container>
            <Wrapper>
                <FirstBox>
                    <FirstText>찜한상품</FirstText>
                    <FirstImg>
                        {/* 좋아요 누르면 이곳에 좋아요 한 만큼 숫자가 올라가야함 */}
                        <FirstLink>
                            <HeartImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAX1JREFUOBGdk7FLw0AUxnPXFhdHRdBdVJBCGgedBP8GoYJQHMRBRNBF1EGnTkopXcRBBEFB/A+cnNuIhEBHQcFBnHRolsTfqwZiWmLSg8t733vf++7d5U4Zv8NxnDHP846Ai8xxpdRDEAT7lmU5YKPZbE5hlonPYfPknrB18m9YQ8nHtu0l3/dvcEcER8ZnLpcrUzTLPGYORXLifmity6Zp3ivXdYc7nU4b0kSMlArS4Tu1MxqR7UFFZCVqRxE71DjzqZZOJi1o1CaTOamy0xraSypqAoldPcvWHhM4aVO2LhQKNbb3lbYizqPWI1bVxWLxla4O4oQMeI9L2ZYzMnDqXKxqhuIuVWpKpVJNQPdmhwI8gxP8nRD/Y09pYDfk/BGSYKvVarDVzZDQz3IuDTrZiuZ6hBBRvL0z7HqUGPqInPO2NrBBGBPbIyRBEaOzC9yK4Mi4pJO1uIjk+wpJAjGN2BXuimDGNSKriPg/MMMXsTw/4BbBO/EzlA5O/QbfD5IxtG4t8AAAAABJRU5ErkJggg==" />
                            0
                        </FirstLink>
                    </FirstImg>
                </FirstBox>
                <SecondBox>
                    <SecondText>최근본상품</SecondText>
                    <Current>
                        <CurrentNum>
                            5
                            {/* 이곳에 최근 본 상품의 수 */}
                        </CurrentNum>
                    </Current>
                    <CurrentImgBox>
                        <CurrentImgLink>
                            <CurrentImg src="https://media.bunjang.co.kr/product/182962402_1_1648593260_w140.jpg" />
                            <CurrentImgCover></CurrentImgCover>
                        </CurrentImgLink>
                        <CurrentImgLink>
                            <CurrentImg src="https://media.bunjang.co.kr/product/183688321_1_1648699461_w140.jpg" />
                        </CurrentImgLink>
                        <CurrentImgLink>
                            <CurrentImg src="https://media.bunjang.co.kr/product/183570194_1_1648594942_w140.jpg" />
                        </CurrentImgLink>
                    </CurrentImgBox>
                    <CurrentBtnBox>
                        <CurrentBtn>
                            <CurrentBtnImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAAEVsH/dAAAAAXNSR0IArs4c6QAAAWZJREFUKBVjYACChoaG7SBiIYgDBo2NjftgbGQaqOgkiM8EFZRDloSwZ86cycXQ3t6ugCnV2dnJiyIKtObG/v37WcCCIFf09PSIoKgACn5FEYBxgNawAiWvgviMMEEQDbRaiYWF5SVcrLu7Wwxo0Qa4AMgZQIEjcIFVq1axwcyCCwJVvIBzoAwmRkbGCU1NTZboEgxA1TOANqtgk9jS1tYmDJJAcSfQwtNCQkI2KILI2oHOlPn+/fthoNix+vr6WAyFQPsEf/78eQDoqJeCgoK+eXl5P1Gs6evr4/z8+fP2////83JwcDhVVFR8RLaBEehx5mvXrq0CChpwcnLalpeXP0NWAGOzXL9+PQ3I8WFmZvbFpQikGO5GoO86gfw0VlZW++rq6ksgSWQAVwgSBLqPCRiAS4FMC2DU2dTU1DyFKUZRCBOcP38+x6NHj3YA+VxAjzkDnfQZq0KYBlAM/P79eynQ9HgA91p/71jKrhEAAAAASUVORK5CYII=" />
                        </CurrentBtn>
                        <CurrentBtnNum>1/2</CurrentBtnNum>
                        <CurrentBtn>
                            <CurrentBtnImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAAEVsH/dAAAAAXNSR0IArs4c6QAAAVhJREFUKBVtUC1Pw0AYvtJ2mRkYRAVYkhrAkjASxPYDCFTjZhBYmjb9TGiTOhAoSkKCWAIa12SC4HB0CQqNwC0touW5pnespSfu3ufj3i/iOM4tYQfgmeA6YUT7tW37k3IrtfDQNJRlKXAmiqL1ypfn+QbxPO+YS0jzzcFyEMdxH+Ib5f4yAaCpu16v51Zm13XPQBxWgF4AIw7qgJYewrnTFggK3Pu+v9klJEEQrFGhXf1dVdVdNjapB13VNO2Hp/k3FdpacJUGcOQNAkBAj+fI54uiODYM46VtYJh3hCxXIDV82DdN84MZ2MuNlEiSRJrNZk8It2RZHuq6/tVpZGQYhoMsyxLgTFGU8WQyWTQyMiN9p9OpmKbpI8JtSZL2Oo1YwzUMGsofoPycfmwYsQG9KIoLZBhhA6/UwI5EAxhOsaIbQRCOMP2AicuvBOESprllWf1loR3/AksYejyOGFk5AAAAAElFTkSuQmCC" />
                        </CurrentBtn>
                    </CurrentBtnBox>
                </SecondBox>
                <DownloadBox>
                    <DownloadText>
                        앱 다운로드
                    </DownloadText>
                    <DownloadImgBox>
                        <DownloadImg src="data:image/png;base64,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" />
                    </DownloadImgBox>
                </DownloadBox>
                <DirectTopBox>
                    <DirectTopBtn onClick={onClick}>
                        TOP
                    </DirectTopBtn>
                </DirectTopBox>
            </Wrapper>
        </Container>
    )
}

export default SideSlider;
