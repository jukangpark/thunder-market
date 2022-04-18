import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IUser } from "../interface";

interface IProps {
  shop: IUser | undefined;
}

const ShopInfoContainer = styled.div`
  width: 330px;
  padding: 0px 32px 118px;
  position: relative;
  border-right: 1px solid rgb(238, 238, 238);
  > div:first-child {
    padding: 0px 10px;
    h1 {
      font-size: 18px;
      padding: 48px 0px 16px;
      border-bottom: 1px solid rgb(238, 238, 238);
    }
    > button {
      width: 100%;
      height: 32px;
      border: 1px solid rgb(238, 238, 238);
      color: ${(props) => props.theme.btnColor};
      > img {
        width: 20px;
        height: 14px;
        margin-right: 3px;
      }
    }
  }
  > div:last-child {
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
    width: 100%;
    padding: 16px;
    > * {
      flex: 1 1 0%;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      height: 56px;
      font-size: 18px;
      -webkit-box-align: center;
      align-items: center;
      font-weight: 600;
      color: rgb(255, 255, 255);
    }
    > button:first-child {
      background: rgb(255, 164, 37);
      border: 1px solid rgb(243, 150, 20);
      margin-right: 10px;
    }
    > button:last-child {
      background: rgb(247, 0, 0);
      border: 1px solid rgb(223, 0, 0);
    }
  }
`;
const Comment = styled.div`
  > div {
    border-bottom: 1px solid rgb(238, 238, 238);
  }
  > div:first-child {
    padding: 30px 0px 16px;
    > span {
      margin-left: 5px;
      color: rgb(247, 47, 51);
    }
  }
  > div:nth-child(2) {
    display: flex;
    padding-top: 16px;
    > a {
      margin-right: 12px;
      display: flex;
      flex-shrink: 0;
      > img {
        border-radius: 50%;
        width: 32px;
        height: 32px;
      }
    }
    > div {
      padding-bottom: 16px;
      border-bottom: 1px solid rgb(238, 238, 238);
      > div:first-child {
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        color: rgb(178, 178, 178);
        margin-bottom: 5px;
      }
      > div:last-child {
        font-size: 13px;
        color: ${(props) => props.theme.btnColor};
        line-height: 1.4;
      }
    }
  }
  > div:last-child {
    height: 40px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-bottom: 1px solid rgb(238, 238, 238);
    > a {
      font-size: 13px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      color: ${(props) => props.theme.btnColor};
    }
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 16px;
  > div:first-child {
    > a {
      margin-right: 16px;
    }
  }
  > div:nth-child(2) {
    > a {
      display: block;
      margin: 4px 0px 11px;
    }
    > div {
      display: flex;
      > a:first-child {
        margin-right: 17px;
        position: relative;
        ::after {
          content: "";
          width: 1px;
          height: 12px;
          position: absolute;
          right: -8px;
          top: 1px;
          border-right: 1px solid rgb(204, 204, 204);
        }
      }
      > a {
        font-size: 13px;
        color: ${(props) => props.theme.btnColor};
      }
    }
  }
`;

const ShopInfo = ({ shop }: IProps) => {
  console.log(shop);

  const navigate = useNavigate();

  const handleFollow = () => {
    fetch(`/user/${shop?._id}/followings`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        }
        if (data.message === undefined) {
          alert("로그인 먼저 해주세요");
          navigate("/login");
        }
      });
  };
  return (
    <ShopInfoContainer>
      <div>
        <h1>상점정보</h1>
        <ProfileContainer>
          <div>
            <Link to={`/shop/${shop?._id}/products`}>
              <img
                src={
                  shop?.profileImageUrl
                    ? shop?.profileImageUrl
                    : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgZmlsbD0iI0ZBRkFGQSIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+CiAgICAgICAgPHBhdGggZD0iTTM2LjIxNiA0MS42ODNjLjI0OC0xLjkzMS40OTgtMy44NjIuNzUtNS43OTRoNi43OWwtLjI4MyA1LjUzN2MwIC4wMTcuMDA3LjAzNC4wMDcuMDUxLS4wMDIuMDEtLjAwMi4wMi0uMDAyLjAzLS4wOTggMS44NzYtMS44OTcgMy4zOTItNC4wMzUgMy4zOTItMS4wNjYgMC0yLjAxOC0uMzktMi42MTUtMS4wNzItLjUxLS41ODUtLjcyMi0xLjMyNS0uNjEyLTIuMTQ0em04Ljg4OCA0LjA3OGMxLjIyNCAxLjI4OSAzLjAwOSAyLjAyOCA0Ljg5IDIuMDI4IDEuODkgMCAzLjY3NC0uNzQgNC45LTIuMDMzLjEwNy0uMTEyLjIwNy0uMjI4LjMwNC0uMzQ1IDEuMjggMS40NDcgMy4yMTcgMi4zNzggNS4zNSAyLjM3OC4xMTIgMCAuMjE2LS4wMjcuMzI4LS4wMzJWNjMuNkgzOS4xMTVWNDcuNzU3Yy4xMTIuMDA1LjIxNS4wMzIuMzI4LjAzMiAyLjEzMyAwIDQuMDcxLS45MzEgNS4zNTEtMi4zOC4wOTkuMTIxLjIuMjM4LjMxLjM1MnptMS41NDUtOS44NzJoNi42OThsLjI4MiA1LjYxOWMwIC4wMTUtLjAwNy4wMjctLjAwNy4wNGwuMDA0LjA4NmEyLjkzOSAyLjkzOSAwIDAgMS0uODI2IDIuMTMyYy0xLjM2NyAxLjQ0LTQuMjMzIDEuNDQxLTUuNjA0LjAwM2EyLjk1IDIuOTUgMCAwIDEtLjgzLTIuMTQybC4wMDQtLjA3OGMwLS4wMTYtLjAwOC0uMDMtLjAwOC0uMDQ4bC4yODctNS42MTJ6bTE2LjM3NiAwYy4yNTIgMS45MzMuNTAyIDMuODY1Ljc1MyA1LjgwNC4xMDkuODEtLjEwNCAxLjU0Ny0uNjE0IDIuMTMyLS41OTYuNjgzLTEuNTUgMS4wNzQtMi42MTYgMS4wNzQtMi4xMzcgMC0zLjkzMi0xLjUxNC00LjAzNC0zLjM4OGEuMzU5LjM1OSAwIDAgMC0uMDAzLS4wNDRjMC0uMDE1LjAwNi0uMDI3LjAwNi0uMDRsLS4yNzgtNS41MzhoNi43ODZ6TTM2LjIyNiA0Ni45NDZ2MTguMDk4YzAgLjc5OC42NDYgMS40NDUgMS40NDQgMS40NDVoMjQuNjVjLjc5OSAwIDEuNDQ1LS42NDcgMS40NDUtMS40NDVWNDYuOTQ2Yy41OS0uMzI4IDEuMTM3LS43MTkgMS41NzUtMS4yMiAxLjA2MS0xLjIxNCAxLjUyMi0yLjc4NSAxLjMwMS00LjQxLS4zLTIuMzU1LS42MDctNC43MDctLjkxOC03LjA2YTEuNDQzIDEuNDQzIDAgMCAwLTEuNDMxLTEuMjU3SDM1LjY5OWMtLjcyNCAwLTEuMzM4LjUzOC0xLjQzMSAxLjI1Ny0uMzExIDIuMzU0LS42MTcgNC43MDctLjkxNiA3LjA1LS4yMjEgMS42MzcuMjQgMy4yMDggMS4zIDQuNDIxLjQzOS41MDIuOTg0Ljg5MyAxLjU3NCAxLjIyeiIgZmlsbD0iI0NDQyIvPgogICAgPC9nPgo8L3N2Zz4K"
                }
                alt="shop"
                style={{ width: "48px", height: "48px", borderRadius: "50%" }}
              />
            </Link>
          </div>
          <div>
            <Link to={`/shop/${shop?._id}/products`}>{shop?.username}</Link>
            <div>
              <Link to={`/`}>상품 {shop?.products.length}</Link>
              <Link to={`/`}>팔로워 {shop?.followers.length}</Link>
            </div>
          </div>
        </ProfileContainer>
        <button onClick={handleFollow}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAcCAYAAAATFf3WAAAAAXNSR0IArs4c6QAAAfZJREFUWAntVrFOAkEQ5VYjjZ9gjKWcP0BNYeIPkFjYaWHUxo6CC4GCzkpiY2dhwg+YUEBBox8gWBo+wMoGizvn4WKysLN3c3diwybHZmfem3nM7d6sV0g4ms3mQRiGpwQ/pGdX0yY095RS90EQvGpbrpMXF63b7W6Nx+ObKIrOCasYfOh53l2pVLquVqtfDMZqbjQaERw0W7VwCWfBIG40Gj2RuAsyuLAKGGDBmZFz+nElLaBylKciyFXRHAHFDWUFYs/p1+qOsOAFB9wFc+olK1AfCNbvyKg01wFJ7nIJwGlNO7JwjZybxspczD8lpjXZaok7P60cnfO7KsjFWqndVcEJKfFTqgHXGNx3bl45zu+qYM/IIFtk4RqZWIFoX4QMDXSyRai5ydAxKFYgeivaVwx/yQ1Onn2ZFYjM6K009ZdU8Ia+5vAIoccpEI3f9/0jqkqH4rpeNy4LHWCll4U4vdYbhI30X9ctm5a1TVKB31dMtxDVarUuqdGfUIB9erYlgSzYT7K90SfnoV6v39Iede1hC/3HNBPYbrf3ptPpI5nKLDKb47lYLB7XarV3aRjchNUfi4OmMnIgl1TgBo0rIp5JiSnwO8Ph8GMwGLxIuLhcYs+tZKTJhZLjQKxqiHNBYNbTKvlz4lziTStRkwd2LTBrFb8B8aSntyo1wCwAAAAASUVORK5CYII="
            alt="팔로우"
            style={{ width: "20px" }}
          />
          팔로우
        </button>
        {shop?.products.slice(0, 2).map((product, index) => (
          <img
            style={{ width: "120px" }}
            key={index}
            src={product.imageUrl}
            alt="can't do that"
          />
        ))}
        <Comment>
          <div>
            상점후기
            <span>{shop?.reviews.length}</span>
          </div>
          {shop?.reviews.map((review) => (
            <div>
              <Link to={`/`}>
                <img
                  src={
                    review.owner.profileImageUrl
                      ? review.owner.profileImageUrl
                      : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgZmlsbD0iI0ZBRkFGQSIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+CiAgICAgICAgPHBhdGggZD0iTTM2LjIxNiA0MS42ODNjLjI0OC0xLjkzMS40OTgtMy44NjIuNzUtNS43OTRoNi43OWwtLjI4MyA1LjUzN2MwIC4wMTcuMDA3LjAzNC4wMDcuMDUxLS4wMDIuMDEtLjAwMi4wMi0uMDAyLjAzLS4wOTggMS44NzYtMS44OTcgMy4zOTItNC4wMzUgMy4zOTItMS4wNjYgMC0yLjAxOC0uMzktMi42MTUtMS4wNzItLjUxLS41ODUtLjcyMi0xLjMyNS0uNjEyLTIuMTQ0em04Ljg4OCA0LjA3OGMxLjIyNCAxLjI4OSAzLjAwOSAyLjAyOCA0Ljg5IDIuMDI4IDEuODkgMCAzLjY3NC0uNzQgNC45LTIuMDMzLjEwNy0uMTEyLjIwNy0uMjI4LjMwNC0uMzQ1IDEuMjggMS40NDcgMy4yMTcgMi4zNzggNS4zNSAyLjM3OC4xMTIgMCAuMjE2LS4wMjcuMzI4LS4wMzJWNjMuNkgzOS4xMTVWNDcuNzU3Yy4xMTIuMDA1LjIxNS4wMzIuMzI4LjAzMiAyLjEzMyAwIDQuMDcxLS45MzEgNS4zNTEtMi4zOC4wOTkuMTIxLjIuMjM4LjMxLjM1MnptMS41NDUtOS44NzJoNi42OThsLjI4MiA1LjYxOWMwIC4wMTUtLjAwNy4wMjctLjAwNy4wNGwuMDA0LjA4NmEyLjkzOSAyLjkzOSAwIDAgMS0uODI2IDIuMTMyYy0xLjM2NyAxLjQ0LTQuMjMzIDEuNDQxLTUuNjA0LjAwM2EyLjk1IDIuOTUgMCAwIDEtLjgzLTIuMTQybC4wMDQtLjA3OGMwLS4wMTYtLjAwOC0uMDMtLjAwOC0uMDQ4bC4yODctNS42MTJ6bTE2LjM3NiAwYy4yNTIgMS45MzMuNTAyIDMuODY1Ljc1MyA1LjgwNC4xMDkuODEtLjEwNCAxLjU0Ny0uNjE0IDIuMTMyLS41OTYuNjgzLTEuNTUgMS4wNzQtMi42MTYgMS4wNzQtMi4xMzcgMC0zLjkzMi0xLjUxNC00LjAzNC0zLjM4OGEuMzU5LjM1OSAwIDAgMC0uMDAzLS4wNDRjMC0uMDE1LjAwNi0uMDI3LjAwNi0uMDRsLS4yNzgtNS41MzhoNi43ODZ6TTM2LjIyNiA0Ni45NDZ2MTguMDk4YzAgLjc5OC42NDYgMS40NDUgMS40NDQgMS40NDVoMjQuNjVjLjc5OSAwIDEuNDQ1LS42NDcgMS40NDUtMS40NDVWNDYuOTQ2Yy41OS0uMzI4IDEuMTM3LS43MTkgMS41NzUtMS4yMiAxLjA2MS0xLjIxNCAxLjUyMi0yLjc4NSAxLjMwMS00LjQxLS4zLTIuMzU1LS42MDctNC43MDctLjkxOC03LjA2YTEuNDQzIDEuNDQzIDAgMCAwLTEuNDMxLTEuMjU3SDM1LjY5OWMtLjcyNCAwLTEuMzM4LjUzOC0xLjQzMSAxLjI1Ny0uMzExIDIuMzU0LS42MTcgNC43MDctLjkxNiA3LjA1LS4yMjEgMS42MzcuMjQgMy4yMDggMS4zIDQuNDIxLjQzOS41MDIuOTg0Ljg5MyAxLjU3NCAxLjIyeiIgZmlsbD0iI0NDQyIvPgogICAgPC9nPgo8L3N2Zz4K"
                  }
                  alt=""
                />
              </Link>
              <div>{review.text}</div>
            </div>
          ))}
          <div>
            <Link to={`/`}>상점후기 더보기</Link>
          </div>
        </Comment>
      </div>
      <div>
        <button>연락하기</button>
        <button>바로구매</button>
      </div>
    </ShopInfoContainer>
  );
};

export default ShopInfo;
