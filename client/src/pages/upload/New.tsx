import { useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../../components/commonStyle/fundamental";

const Btn = styled.button`
  border-radius: 2px;
  color: white;
  background-color: ${(props) => props.theme.accentColor};
  font-size: 24px;
  width: 160px;
  line-height: 56px;
  text-align: center;
  font-weight: bold;
`;

const Form = styled.form`
  margin: 0 auto;
  display: block;
  padding: 32px 0 32px 0;
  border-top: 2px solid ${(props) => props.theme.textColor};
  border-bottom: 2px solid black;
  div {
    display: flex;
    border-bottom: 0.5px solid gray;
    padding: 32px 0 32px 0;
  }
  div > h2 {
    font-size: 18px;
    width: 20%;
  }
  div > div {
    width: 80%;
    border-bottom: none;
    display: block;
    input {
      display: block;
      width: 100%;
      height: 50px;
      padding: 0 16px 0 16px;
      box-sizing: border-box;
    }
    p {
      margin-top: 24px;
      color: #4aa4ff;
      font-size: 14px;
      line-height: 22px;
    }
    p > b {
      font-weight: bold;
    }
  }
`;

const Title = styled.h1`
  font-size: 26px;
  line-height: 100px;
  span {
    font-size: 16px;
    margin-left: 32px;
    color: ${(props) => props.theme.accentColor};
  }
`;

const ImageLabel = styled.label`
  display: block;
  width: 200px;
  background-color: #fafafd;
  height: 200px;
  cursor: pointer;
  /* background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICAgIDxwYXRoIGZpbGw9IiNEQ0RCRTQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTI4LjQ3MSAzMkgzLjUzYy0uOTcxIDAtMS44OTQtLjQyMi0yLjUyOS0xLjE1N2wtLjAyNi0uMDNBNCA0IDAgMCAxIDAgMjguMTk4VjguNjA3QTQgNCAwIDAgMSAuOTc0IDUuOTlMMSA1Ljk2YTMuMzQzIDMuMzQzIDAgMCAxIDIuNTI5LTEuMTU2aDIuNTM0YTIgMiAwIDAgMCAxLjUzNy0uNzJMMTAuNC43MkEyIDIgMCAwIDEgMTEuOTM3IDBoOC4xMjZBMiAyIDAgMCAxIDIxLjYuNzJsMi44IDMuMzYzYTIgMiAwIDAgMCAxLjUzNy43MmgyLjUzNGMuOTcxIDAgMS44OTQuNDIzIDIuNTI5IDEuMTU3bC4wMjYuMDNBNCA0IDAgMCAxIDMyIDguNjA2djE5LjU5MWE0IDQgMCAwIDEtLjk3NCAyLjYxN2wtLjAyNi4wM0EzLjM0MyAzLjM0MyAwIDAgMSAyOC40NzEgMzJ6TTE2IDkuNmE4IDggMCAxIDEgMCAxNiA4IDggMCAwIDEgMC0xNnptMCAxMi44YzIuNjQ3IDAgNC44LTIuMTUzIDQuOC00LjhzLTIuMTUzLTQuOC00LjgtNC44YTQuODA1IDQuODA1IDAgMCAwLTQuOCA0LjhjMCAyLjY0NyAyLjE1MyA0LjggNC44IDQuOHoiLz4KPC9zdmc+Cg=="); */
  background-position: center;
  background-size: 20%;
  background-repeat: no-repeat;
`;

interface IProps {
  delivery: boolean;
}

const DeliveryLabel = styled.label<IProps>`
  font-size: 16px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
`;

function New(): JSX.Element {
  const [state, setState] = useState({
    file: null,
    base64URL: "",
  });

  const [delivery, setDelivery] = useState(false);
  const onClick = () => {
    setDelivery((prev) => {
      return !prev;
    });
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL: any = ""; // arrayBuffer 가 들어올 변수

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];

    getBase64(file).then((result: any) => {
      file["base64"] = result;

      setState({
        base64URL: result,
        file,
      });
    });
  };

  return (
    <Wrapper>
      <Title>
        기본정보<span>*필수항목</span>
      </Title>

      <Form
        method="POST"
        action="/productapi/upload"
        encType="multipart/form-data"
      >
        <div>
          <h2>상품이미지</h2>
          <div>
            {state.base64URL ? (
              <ImageLabel
                style={{
                  backgroundImage: `url(${state.base64URL})`,
                  backgroundSize: "cover",
                }}
                htmlFor="productImage"
              />
            ) : (
              <ImageLabel
                style={{
                  backgroundImage:
                    "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICAgIDxwYXRoIGZpbGw9IiNEQ0RCRTQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTI4LjQ3MSAzMkgzLjUzYy0uOTcxIDAtMS44OTQtLjQyMi0yLjUyOS0xLjE1N2wtLjAyNi0uMDNBNCA0IDAgMCAxIDAgMjguMTk4VjguNjA3QTQgNCAwIDAgMSAuOTc0IDUuOTlMMSA1Ljk2YTMuMzQzIDMuMzQzIDAgMCAxIDIuNTI5LTEuMTU2aDIuNTM0YTIgMiAwIDAgMCAxLjUzNy0uNzJMMTAuNC43MkEyIDIgMCAwIDEgMTEuOTM3IDBoOC4xMjZBMiAyIDAgMCAxIDIxLjYuNzJsMi44IDMuMzYzYTIgMiAwIDAgMCAxLjUzNy43MmgyLjUzNGMuOTcxIDAgMS44OTQuNDIzIDIuNTI5IDEuMTU3bC4wMjYuMDNBNCA0IDAgMCAxIDMyIDguNjA2djE5LjU5MWE0IDQgMCAwIDEtLjk3NCAyLjYxN2wtLjAyNi4wM0EzLjM0MyAzLjM0MyAwIDAgMSAyOC40NzEgMzJ6TTE2IDkuNmE4IDggMCAxIDEgMCAxNiA4IDggMCAwIDEgMC0xNnptMCAxMi44YzIuNjQ3IDAgNC44LTIuMTUzIDQuOC00LjhzLTIuMTUzLTQuOC00LjgtNC44YTQuODA1IDQuODA1IDAgMCAwLTQuOCA0LjhjMCAyLjY0NyAyLjE1MyA0LjggNC44IDQuOHoiLz4KPC9zdmc+Cg==)",
                }}
                htmlFor="productImage"
              />
            )}
            <p>
              <b>* 상품 이미지는 640x640에 최적화 되어 있습니다.</b> <br />
              - 이미지는 상품등록 시 정사각형으로 짤려서 등록됩니다.
              <br />
              -이미지를 클릭 할 경우 원본이미지를 확인할 수 있습니다.
              <br />
              -이미지를 클릭 후 이동하여 등록순서를 변경할 수 있습니다.
              <br />
              -큰 이미지일경우 이미지가 깨지는 경우가 발생할 수 있습니다.
              <br />
              최대 지원 사이즈인 640 X 640 으로 리사이즈 해서 올려주세요. (개당
              이미지 최대 10M)
            </p>
            <input
              style={{ display: "none" }}
              type="file"
              id="productImage"
              name="productImage"
              onChange={handleFileInputChange}
              required
            />
          </div>
        </div>

        <div>
          <h2>제목</h2>
          <div>
            <input
              type="text"
              placeholder="상품제목을 입력해주세요."
              name="name"
              required
            />
          </div>
        </div>

        <div>
          <h2>카테고리</h2>
          <div>
            <select name="categories" required>
              <option value="여성의류">여성의류</option>
              <option value="남성의류">남성의류</option>
              <option value="신발">신발</option>
              <option value="가방">가방</option>
              <option value="쥬얼리">주얼리</option>
              <option value="액세서리">패션 액세서리</option>
              <option value="디지털">디지털</option>
              <option value="스포츠">스포츠</option>
              <option value="차량">차량/오토바이</option>
              <option value="스타굿즈">스타굿즈</option>
              <option value="키덜트">키덜트</option>
              <option value="예술">예술</option>
              <option value="악기">악기</option>
              <option value="도서">도서</option>
              <option value="뷰티">뷰티/미용</option>
              <option value="인테리어">가구/인테리어</option>
              <option value="생활">생활</option>
              <option value="유아동">유아동/출산</option>
              <option value="펫">반려동물용품</option>
              <option value="기타">기타</option>
              <option value="지역서비스">지역 서비스</option>
              <option value="원룸">원룸</option>
              <option value="번개나눔">번개나눔</option>
              <option value="구인구직">구인구직</option>
              <option value="재능">재능</option>
              <option value="커뮤니티">커뮤니티</option>
            </select>
          </div>
        </div>

        <div>
          <h2>거래지역</h2>
          <div>
            <button>내 위치</button>
            <button>주소 검색</button>
            <input placeholder="지역" name="location" />
          </div>
        </div>

        <div>
          <h2>상태</h2>
          <select name="newProduct">
            <option value="중고상품">중고상품</option>
            <option value="새상품">새상품</option>
          </select>
        </div>

        <div>
          <h2>교환</h2>
          <div>
            <select name="change">
              <option value="교환불가">교환불가</option>
              <option value="교환가능">교환가능</option>
            </select>
          </div>
        </div>

        <div>
          <h2>가격</h2>
          <div>
            <input
              placeholder="가격"
              type="number"
              name="price"
              style={{ marginBottom: "16px" }}
            />

            <input
              type="checkbox"
              name="delivery"
              style={{
                width: "15px",
                height: "15px",
                display: "inline-block",
              }}
            />
            <label htmlFor="delivery" style={{ marginLeft: "8px" }}>
              배송비 포함
            </label>
          </div>
        </div>

        <div>
          <h2>설명</h2>
          <div>
            <textarea
              style={{
                width: "100%",
                height: "200px",
                padding: "20px",
                boxSizing: "border-box",
              }}
              id="description"
              name="description"
              placeholder="상품 설명을 입력해주세요. (10글자 이상)"
              minLength={10}
              required
            />
          </div>
        </div>

        <div>
          <h2>연관태그</h2>
          <div>
            <input
              placeholder="연관태그를 입력해주세요. (최대 5개)"
              name="hashtags"
              required
            />
          </div>
        </div>
        <div
          style={{
            paddingBottom: "70px",
            backgroundColor: "#FAFAFD",
            display: "flex",
            justifyContent: "right",
            paddingRight: "20px",
          }}
        >
          <Btn>등록하기</Btn>
        </div>
      </Form>
    </Wrapper>
  );
}

export default New;
