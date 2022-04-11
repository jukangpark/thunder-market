import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IUser } from "../interface";
import { FollowBtn } from "./commonStyle/fundamental";

interface IProps {
  shop: IUser | undefined;
}

const ShopInfoContainer = styled.div`
  padding: 0px 32px 118px;
  box-sizing: border-box;
`;

const ProfileContainer = styled.div`
  display: flex;
  div {
    margin-top: 20px;
  }
  div:nth-child(0) {
    width: 20%;
  }
  div:nth-child(1) {
    text-align: center;
  }
`;

const ShopInfo = ({ shop }: IProps) => {
  const navigate = useNavigate();

  const index = shop?.email.indexOf("@");

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
        <div>
          <h1>상점정보</h1>
          <ProfileContainer>
            <div>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgZmlsbD0iI0ZBRkFGQSIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+CiAgICAgICAgPHBhdGggZD0iTTM2LjIxNiA0MS42ODNjLjI0OC0xLjkzMS40OTgtMy44NjIuNzUtNS43OTRoNi43OWwtLjI4MyA1LjUzN2MwIC4wMTcuMDA3LjAzNC4wMDcuMDUxLS4wMDIuMDEtLjAwMi4wMi0uMDAyLjAzLS4wOTggMS44NzYtMS44OTcgMy4zOTItNC4wMzUgMy4zOTItMS4wNjYgMC0yLjAxOC0uMzktMi42MTUtMS4wNzItLjUxLS41ODUtLjcyMi0xLjMyNS0uNjEyLTIuMTQ0em04Ljg4OCA0LjA3OGMxLjIyNCAxLjI4OSAzLjAwOSAyLjAyOCA0Ljg5IDIuMDI4IDEuODkgMCAzLjY3NC0uNzQgNC45LTIuMDMzLjEwNy0uMTEyLjIwNy0uMjI4LjMwNC0uMzQ1IDEuMjggMS40NDcgMy4yMTcgMi4zNzggNS4zNSAyLjM3OC4xMTIgMCAuMjE2LS4wMjcuMzI4LS4wMzJWNjMuNkgzOS4xMTVWNDcuNzU3Yy4xMTIuMDA1LjIxNS4wMzIuMzI4LjAzMiAyLjEzMyAwIDQuMDcxLS45MzEgNS4zNTEtMi4zOC4wOTkuMTIxLjIuMjM4LjMxLjM1MnptMS41NDUtOS44NzJoNi42OThsLjI4MiA1LjYxOWMwIC4wMTUtLjAwNy4wMjctLjAwNy4wNGwuMDA0LjA4NmEyLjkzOSAyLjkzOSAwIDAgMS0uODI2IDIuMTMyYy0xLjM2NyAxLjQ0LTQuMjMzIDEuNDQxLTUuNjA0LjAwM2EyLjk1IDIuOTUgMCAwIDEtLjgzLTIuMTQybC4wMDQtLjA3OGMwLS4wMTYtLjAwOC0uMDMtLjAwOC0uMDQ4bC4yODctNS42MTJ6bTE2LjM3NiAwYy4yNTIgMS45MzMuNTAyIDMuODY1Ljc1MyA1LjgwNC4xMDkuODEtLjEwNCAxLjU0Ny0uNjE0IDIuMTMyLS41OTYuNjgzLTEuNTUgMS4wNzQtMi42MTYgMS4wNzQtMi4xMzcgMC0zLjkzMi0xLjUxNC00LjAzNC0zLjM4OGEuMzU5LjM1OSAwIDAgMC0uMDAzLS4wNDRjMC0uMDE1LjAwNi0uMDI3LjAwNi0uMDRsLS4yNzgtNS41MzhoNi43ODZ6TTM2LjIyNiA0Ni45NDZ2MTguMDk4YzAgLjc5OC42NDYgMS40NDUgMS40NDQgMS40NDVoMjQuNjVjLjc5OSAwIDEuNDQ1LS42NDcgMS40NDUtMS40NDVWNDYuOTQ2Yy41OS0uMzI4IDEuMTM3LS43MTkgMS41NzUtMS4yMiAxLjA2MS0xLjIxNCAxLjUyMi0yLjc4NSAxLjMwMS00LjQxLS4zLTIuMzU1LS42MDctNC43MDctLjkxOC03LjA2YTEuNDQzIDEuNDQzIDAgMCAwLTEuNDMxLTEuMjU3SDM1LjY5OWMtLjcyNCAwLTEuMzM4LjUzOC0xLjQzMSAxLjI1Ny0uMzExIDIuMzU0LS42MTcgNC43MDctLjkxNiA3LjA1LS4yMjEgMS42MzcuMjQgMy4yMDggMS4zIDQuNDIxLjQzOS41MDIuOTg0Ljg5MyAxLjU3NCAxLjIyeiIgZmlsbD0iI0NDQyIvPgogICAgPC9nPgo8L3N2Zz4K"
                alt="shop"
                style={{ width: "48px" }}
              />
            </div>
            <div>
              <div>{shop?.email.slice(0, index)}</div>
              <div>상품 {shop?.products.length}</div>
              <div>팔로워 {shop?.followers.length}</div>
            </div>
          </ProfileContainer>
        </div>
        <div>
          <FollowBtn onClick={handleFollow}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAcCAYAAAATFf3WAAAAAXNSR0IArs4c6QAAAfZJREFUWAntVrFOAkEQ5VYjjZ9gjKWcP0BNYeIPkFjYaWHUxo6CC4GCzkpiY2dhwg+YUEBBox8gWBo+wMoGizvn4WKysLN3c3diwybHZmfem3nM7d6sV0g4ms3mQRiGpwQ/pGdX0yY095RS90EQvGpbrpMXF63b7W6Nx+ObKIrOCasYfOh53l2pVLquVqtfDMZqbjQaERw0W7VwCWfBIG40Gj2RuAsyuLAKGGDBmZFz+nElLaBylKciyFXRHAHFDWUFYs/p1+qOsOAFB9wFc+olK1AfCNbvyKg01wFJ7nIJwGlNO7JwjZybxspczD8lpjXZaok7P60cnfO7KsjFWqndVcEJKfFTqgHXGNx3bl45zu+qYM/IIFtk4RqZWIFoX4QMDXSyRai5ydAxKFYgeivaVwx/yQ1Onn2ZFYjM6K009ZdU8Ia+5vAIoccpEI3f9/0jqkqH4rpeNy4LHWCll4U4vdYbhI30X9ctm5a1TVKB31dMtxDVarUuqdGfUIB9erYlgSzYT7K90SfnoV6v39Iede1hC/3HNBPYbrf3ptPpI5nKLDKb47lYLB7XarV3aRjchNUfi4OmMnIgl1TgBo0rIp5JiSnwO8Ph8GMwGLxIuLhcYs+tZKTJhZLjQKxqiHNBYNbTKvlz4lziTStRkwd2LTBrFb8B8aSntyo1wCwAAAAASUVORK5CYII="
              alt="팔로우하기"
              style={{ width: "20px" }}
            />
            팔로우 하기
          </FollowBtn>
        </div>
        <div></div>
        <div></div>
        <div>
          <h1>상점후기</h1>
        </div>
      </div>
      <div>
        <button>연락하기</button>
        <button>바로구매</button>
      </div>
    </ShopInfoContainer>
  );
};

export default ShopInfo;
