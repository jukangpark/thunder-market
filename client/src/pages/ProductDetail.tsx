import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import HeaderMenu from "../components/HeaderMenu";
import { IProducts, IProps } from "../typeScript";

const Main = styled.div``;
const Container = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
`;
const ContainerWidth = styled.div`
  width: 1024px;
`;
const Wrapper = styled.div`
  display: flex;
  padding: 30px 0;
`;
const ImgWrapper = styled.div`
  border: 1px solid rgb(238, 238, 238);
  position: relative;
  width: 100%;
  height: 100%;
`;
const ImgBox = styled.div`
  width: 430px;
  height: 430px;
  flex-shrink: 0;
  margin-right: 40px;
`;
const ProductImg = styled.img<IProps>`
  width: 428px;
  height: 428px;
  position: absolute;
  transition: opacity 0.2s ease-in-out 0s;
  opacity: 1;
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
`;
const ImgBtnBox = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;
const ImgBtn = styled.button`
  width: 10px;
  height: 10px;
  opacity: 0.6;
  border-radius: 50%;
  background: ${(props) => props.theme.bgColor};
  border: 0px;
`;
const InfoContainer = styled.div`
  -webkit-box-flex: 1;
  flex-grow: 1;
`;
const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;
const TitleWrapper = styled.div`
  padding-bottom: 30px;
  border-bottom: 1px solid rgb(238, 238, 238);
  width: 100%;
`;
const Name = styled.div`
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: 600;
  line-height: 1.4;
`;
const PriceBox = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: flex-end;
`;
const Price = styled.div`
  font-size: 40px;
  font-weight: 500;
`;
const Won = styled.span`
  font-size: 28px;
  font-weight: 400;
  margin-left: 5px;
`;
const AppDownBtn = styled.div`
  background-color: transparent;
  cursor: pointer;
  outline: none;
`;
const AppDownImg = styled.img`
  width: 216px;
  aspect-ratio: auto 216 / 30;
  height: 30;
`;
const DetailWrapper = styled.div``;
const NumDetail = styled.div`
  height: 30px;
  margin-top: 15px;
  margin-bottom: 25px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;
const NumBox = styled.div`
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  div {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(204, 204, 204);
    font-size: 16px;
    height: 100%;
    ::after {
      content: "";
      width: 1px;
      height: 12px;
      border-right: 1px solid rgb(238, 238, 238);
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  img {
    margin-right: 5px;
  }
`;
const Num = styled.div``;
const LovedImg = styled.img`
  width: 16px;
  height: 16px;
`;

const WatchedImg = styled.img`
  width: 21px;
  height: 13px;
`;

const TimeImg = styled.img`
  width: 16px;
  height: 16px;
`;
const TextDetail = styled.div`
  div {
    display: flex;
    ::before {
      content: "";
      position: absolute;
      top: 7px;
      left: 6px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: rgb(204, 204, 204);
    }
  }
`;
const Text = styled.div`
  margin-bottom: 25px;
`;
const Request = styled.div`
  position: relative;
  width: 90px;
  padding-left: 15px;
  color: rgb(153, 153, 153);
`;
const Response = styled.div`
  display: flex;
  position: relative;
`;
const LocationImg = styled.img`
  width: 12px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
`;
const BtnBox = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  > * {
    flex: 1 1 0%;
    font-weight: 600;
    margin-right: 10px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    height: 56px;
    font-size: 18px;
    -webkit-box-align: center;
    align-items: center;
  }
`;

const ZimBox = styled.div`
  position: relative;
`;
const ZimBtn = styled.button`
  width: 100%;
  height: 100%;
  font-weight: 600;
  background: rgb(204, 204, 204);
  color: rgb(255, 255, 255);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  line-height: 1;
  cursor: pointer;
  span {
    margin-left: 5px;
    font-size: 18px;
  }
`;
const Message = styled.button`
  background: rgb(255, 164, 37);
  border: 1px solid rgb(243, 150, 20);
  color: rgb(255, 255, 255);
  cursor: pointer;
`;
const DirectBuy = styled.button`
  margin-right: 0;
  background: rgb(247, 0, 0);
  border: 1px solid rgb(223, 0, 0);
  color: rgb(255, 255, 255);
  cursor: pointer;
`;
const ProductDetail = () => {
  const [product, setProduct] = useState<IProducts>();
  const { id } = useParams();

  console.log(product);
  useEffect(() => {
    fetch(`/productapi/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <Main>
      <HeaderMenu />
      <Header />
      <Container>
        <ContainerWidth>
          <Wrapper>
            <ImgBox>
              <ImgWrapper>
                <ProductImg imageUrl={`${product?.imageUrl.replaceAll("\\", "/")}`} />
                <ImgBtnBox>
                  <ImgBtn></ImgBtn>
                </ImgBtnBox>
              </ImgWrapper>
            </ImgBox>
            <InfoContainer>
              <InfoWrapper>
                <TitleWrapper>
                  <Name>{product?.name}</Name>
                  <PriceBox>
                    <Price>
                      {product?.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      <Won>원</Won>
                    </Price>
                    <AppDownBtn>
                      <AppDownImg src="data:image/png;base64,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" />
                    </AppDownBtn>
                  </PriceBox>
                </TitleWrapper>
                <DetailWrapper>
                  <NumDetail>
                    <NumBox>
                      <Num>
                        <LovedImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAjhJREFUWAnFl1uPKUEUhbdCxF2Iu7h78f9/ixdexANeSNxCkJnz1ZwSRncrM0OvhK6ufVmrdiu1O/DxD/INq9VKFouFbDYbOR6PEggEJBKJSDqdlkKhIKFQ6FvE1+3pdJL5fC7EHw4HIXU4HJZEIiHZbFZSqdRdXOBaAEHj8VjW6/Wdo5kIBoNSLBalVCppYcxDNJvNNPn5fDaud9dkMimNRkMvxhgvAna7nQyHQ2EVNmBV3W5Xu45GI10tmziq1+v1JBaLaXctANLBYKDLbZPE+MTjcT3cbrdmyurKY+n3+/pRKiImk8nT5MRB/Cw5cfyu4ARqv9/LcrnUN+/8ghNuxcBhI7xcC5xwK7aMX4BbsfX8AtzKa9++Whjcij8WvwC3Yk/6BbiV+TPxQwTcKpPJ+MGtOeFWHBB+PAY44VYctZxu7waccOuzIJ/Pv7UKrB5OoAUopfQ5/a4q0BPAeRHAgG4nl8vpyVd+wQGXwZeM/3f1el2i0aix/fmV3HBc40YAZel0Oq4933Xgs2M6IXKb0pv4GwFM0ny22+1Lv2ccf3Pl195qtW56QZPvTgAG9mez2fwTEZCTy6kjhstRAAba6FqtxvBXIAe53OAqgADeASqVilvsw3liyeEFTwEElstl/fFK4mSzjXsogOSshBcRW+BrWzkrARBXq1UrEZDjawtrAUYEpXXDs+TkeUoAAZTWScRPyMnn/JqLxQPm+U6nU+2FIDPnEeZourycOlofTF4LeODqav4EUxqvNxGf2nsAAAAASUVORK5CYII=" />
                        0
                      </Num>
                      <Num>
                        <WatchedImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAaCAYAAADMp76xAAAAAXNSR0IArs4c6QAABAdJREFUWAm9mFtIFFEYx9tZ11UW1tLoaoGEPShqq3ahgogyIgnqQXqIgih6qKgEH4JIqCgIIoowIrSn6i0irOxCQdAN7wb2IiSlSUZuGJGyumu/b9lZZo8zs7ObdeBwvvNd/uc/53zznWFcs9Js7e3tczVNWzs1NbUKiErGfJfLNYcxVyCRg8g/GAeZdiC3eTyeN2VlZd/Enm5zpRLY09Pjm5yc3EnMbghUMbpTiYd8BP8X9Dt+v/9uYWHhz1TixdcR4YGBgezh4eFD+J+gz5XAGWijYFzKycm5nArxpIQ5+hqAr9AXzgBJM4ggqXWyvLz8uplR1VkShmgOR3iVo9+jBv2LOWs9pu+H+JAdvilhyC4j6AldxqSNhT7g1Oh2u59mZWV9loDx8fGl4XB4C+IBHrpIdA7ad7C2V1RUvLPynUa4u7s7wIvVQsB8qyCDfgK5jgUaWChs0MdFyLo7OjoOo7hI98QN1sJvsHaB+cDMJYFwV1fXCnblJY5+M2dFN8GOVgcCgWeK3nQKdhXYDzE6IR2GdA2k76lgmq7o7OxcBGAzcydkJazOKVlxjvnWieyguTmZ25y21PiEFt3h/v7+rJGRkddYyhOsFhOe/gMvR6lVGliEzZL0YGPep5DTw16vd2VJScmAjhnd4WAweBaFI7KxwEaVLCQyIHOafB2ULrLo9IVkjMU0GnVJ5PmhUOim0UejIqwGuNaoTCZLNVB9yNFTkUikHqzF0kUWnepnFqv6GOdgbWYDDuo6jaduYOLWFU5Gvgk+qX4A73ei08ue6ms3B/ui3LbiozExLUd2AOxSQnWx850h2+f8/PyQYGksfoRxMhVguRRUf06qyYnOLFaNM87BjdAP0KMbq1Fu2phcMDolk2M3WIIbOGf5JjgD1hfpIosuwYmJWazqo8yvGG++6NH29vZmjo2NPcdxveJsOoXQ/yprXcKpsrLyt04kWtaKi4tDPp9vB0T6dIPdSN4Xxa5bO7dpNomR2GkGEwVchjIyMrYbyYpbwstDGSqkHL0CdJ4Jhqr6l1ezfNhvhGynumj8ahYDOSc7vI7+UeZJmke+DajjR3lAy7IoNvERX/CcfEd8pRBsMCMrfBJ2WCdITi8gpx8xD+g6u1FyGvtff15KSlLjt5aWllpumClhIdfX1+cdHR09D0gtu2TpZ/cgKdqasrOzj/M+/bKLS0qEb4JN5PU1QJbbAaVrY0M+UQKPkY73nWAkJSwgkoe84fsQ6+lLRDcD7Stkz3FV35Aq5RTPEWEdLFavt7HQXnTVPEimbnM4ThDbQtytvLy85oKCgnGHcXG3lAjHoxAogbNJlTWIq6VDQn6k5DLmih+y/EgJMsqPlFaOvZW3/y0v1A+xp9v+ADhPuomDsZuZAAAAAElFTkSuQmCC" />
                        {product?.meta.views}
                      </Num>
                      <Num>
                        <TimeImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAuRJREFUWAnFV01rE1EUzUwSMWATENpFRNyIi0YI+eiui4LoogWFgkvBH6Dgpip+dONKgivdC3XlpkWELkTQRVw1H4QwWQmhLrKwq1IwxHyM54zvDck4mc6bTO3AY97MO/eeM/e9d+c+LeLzqlQq8Wg0ujIajW6ZprkIs7SmaRfQN9HvsOG5pev6h+Fw+LVYLPb9uNaOAzUajYXBYPAcPHeATR2HF+OHEPMuFou9yGazP71spgowDONMt9t9BOMNtDkvJx5jRxgrJRKJl5lM5rcbzlVArVabR6i3YbDsZhTgXRlTs57P5w+ctv8IAPkiwr2LdskJnuUZU7KPtgoRrXE/EwL45SDeC5tcEgoRS+OR0OUg55xhPyly8tA3OcgleW0BYsEpzTnm9THaknTm874suCy4JYBbDU9c7UoXvugzwllRMvoL3hCcEUsA9zneB91qAfgjc4IzojPD4UuYZP7rRU5y60yvYPab4cIUmSK3ztweplcVX+TWEYqMilGYWHJzEabDdKroK60jO52aAHLbiUhReShwTIHJNcBiYqYLX/IxoIMOIxBYANLweRIXCoWb2FJrEPJdUUiHa8BQNLLh2EY7+IM+a7fbZ3O53G4ymbwKf08B+GWDPDrAtrR6vX4dNdwnD5yfoR9w9hCReE9ws9m82Ov1XqF728sYUbuhMR0CxEoljGz4DdPyQP6gqtXqXayxt1NEHOL9vFWQAPgawHtTgEqvEQm4Mrcg5An6VxDdL24OMPYGEbtvCeCvsd/vcwGF+UdkZRyFmHMuAo7i8fhlVsxWHhClc8kFOMur1BRy+izJct1ORCydMVCehdGnbVlwWXBbAOt2zNs6wrbv05EyjL7JMX5GsAXQG6tVgFZPQgR90vd4RUzOCQFCRAtAFpphTkeZPkE+cSZwFSBEHGCerqG/icbjVdCLtpv05fxy6dDahvLB7X5qh1OnGMfxnFUUj+dWLYHtJo/nBhaZ0vH8D6NELRJSWvu9AAAAAElFTkSuQmCC" />
                        2시간 전
                      </Num>
                    </NumBox>
                  </NumDetail>
                  <TextDetail>
                    <Text>
                      <Request>상품상태</Request>
                      <Response>{product?.newProduct}</Response>
                    </Text>
                    <Text>
                      <Request>교환여부</Request>
                      <Response>{product?.change}</Response>
                    </Text>
                    <Text>
                      <Request>배송비</Request>
                      <Response style={{ color: "rgb(110, 71, 238)" }}>
                        {product?.delivery ? "배송비 포함" : "배송비 별도"}
                      </Response>
                    </Text>
                    <Text>
                      <Request>거래지역</Request>
                      <Response style={{ paddingLeft: "17px" }}>
                        <LocationImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAA2Lt7lAAAAAXNSR0IArs4c6QAAA0VJREFUSA2tVktoE0EYnmwejUlDCYUcJD3YGooJGA1RYgJtKh6KtJ6q+EAvvQn25EnEHjx56qGgCJ5EPCqIBxE1j/YmiFJSYkvQBiExqRRJNNGkid+/uMvsdjZJtQOT+Z/fN/+/M7sxsQ4jkUgcNJlMV9rtdhTrEEK9mD8x85ifYX/qcrmehMNhsgmHSWRNpVKHkHwXMy7y8zYQVyjW6/XO+3y+X7yP5B0EyWRyDvY7SLLrgzvpIFrBvDQ+Pr7Cx2kI0JKbcN7mA3Yjg2ALG4tOTExklTyVADu/DOdDxfGvK0g+2e32E5FI5CthSPSzvLy8H8t9kv93YJMH6vX6ooIjEzQajVtw7FOMe7DOpNPpEOFIODFDKGt2D0BVCGzW1Gq15mUCKJOYFtW7C6Gvr48NDw8zbFCUdSqTydgI+KTI281GoH6/nw0MDMgEuVxOk4JNO0ql0nEJwlGNp0dlZGREBscDZRsbG8IsbOKwhB+ryEs7xHETuZjH42G4uQx9ZmgDazabwjgY21SBWe9Vyg+FQszpdGrcDoeDjY6Oyrb19XVWqVQ0fl4BzjYd0y+8kZdtNhsLBoMqidlsZoFAgNFaLBZZoVDgw3fIIMhRi1J6D6piq6urrFwuM56Edk4VVatVtra2pk/T6MCtDg4OLlGLEhrPX0VPQu2i3lO/qe/U/y7jFar9LcXj8TcI/CgK5kmoLTSy2Syr1WqicI1NkqRHZKAWtaDc0Hg5hSfJ5/Nsc3OT8xqKH3AYnpFXvYJ4mz4G2AWjFGyEEVm3gbgtq9V6LBaLyTdPftlREh7mLJxvjQB6BG+iG2cVcMJSCaLRaA0gZ0CSNyLpwT43Njb2mo9TCciIL1ERBFOYxreHz+Zk5CziwNzjTLKoPgPegU/nJPTnmDtuOR+nyAB/iW/xaazbik1ZNRUoRlTyAsHXFL3Tirhsf3//ORE45QkJyEHlImmB5A7jG07MFP4XfTeKMSSgBJR9HSTyedYDwN6AbYY/MfoY0jsSAKTldrsvYn2nT8aJu4pWJvV2vd6RgILxNv1hsVimQaK+dSEvAPyBHkykC0+RKBAn6wiAl+BLo3VE2PVtRzhdK1DIsOP3aMs0qjnfKzjl/gFgkydRSXu9AAAAAABJRU5ErkJggg==" />
                        {product?.location}
                      </Response>
                    </Text>
                  </TextDetail>
                  <BtnBox>
                    <ZimBox>
                      <ZimBtn>
                        <LovedImg src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTcuMDA1IDEuMDQ1aC4yMzNjLjI4LjIyOC41MzcuNDkuNzYyLjc3Ny4yMjUtLjI4OC40ODEtLjU0OS43NjItLjc3N2guMjMzYTYuMTYgNi4xNiAwIDAgMC0uMDktLjExM0M5LjY4NC4zNDQgMTAuNjI4IDAgMTEuNiAwIDE0LjA2NCAwIDE2IDIuMTEgMTYgNC43OTZjMCAzLjI5Ni0yLjcyIDUuOTgxLTYuODQgMTAuMDYyTDggMTZsLTEuMTYtMS4xNTFDMi43MiAxMC43NzcgMCA4LjA5MiAwIDQuNzk2IDAgMi4xMSAxLjkzNiAwIDQuNCAwYy45NzIgMCAxLjkxNi4zNDQgMi42OTUuOTMyYTYuMTYgNi4xNiAwIDAgMC0uMDkuMTEzeiIvPgo8L3N2Zz4K" />
                        <span>찜</span>
                        <span>0</span>
                      </ZimBtn>
                    </ZimBox>
                    <Message>연락하기</Message>
                    <DirectBuy>바로구매</DirectBuy>
                  </BtnBox>
                </DetailWrapper>
              </InfoWrapper>
            </InfoContainer>
          </Wrapper>
        </ContainerWidth>
      </Container>
    </Main>
  );
};

export default ProductDetail;
