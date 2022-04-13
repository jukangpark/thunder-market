import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";
import { IUser } from "../../interface";

const Container = styled.div`
  padding-bottom: 100px;
`;

const Wrapper = styled.div`
  height: 260px;
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgb(238, 238, 238);
`;
const ProfileBox = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  > a:first-child {
    margin-bottom: 20px;
    cursor: pointer;
  }
  > a:nth-child(2) {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 13px;
  }
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;

const ProductsAndFollower = styled.div`
  display: flex;
  color: ${(props) => props.theme.btnColor};
  margin-bottom: 15px;
  font-size: 12px;
  b {
    font-weight: bolder;
  }
  > a:nth-child(1) {
    margin-right: 20px;
    position: relative;
    width: 100px;
    text-align: right;
    ::after {
      content: "";
      width: 1px;
      height: 11px;
      border-right: 1px solid ${(props) => props.theme.btnColor};
      position: absolute;
      top: 1px;
      right: -11px;
    }
  }
  > a:nth-child(2) {
    width: 100px;
  }
`;

const FollowingBox = styled.button`
  width: 150px;
  height: 40px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  font-size: 13px;
  border: 1px solid ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.accentColor};
  cursor: pointer;
`;
const FollowingImg = styled.img`
  margin-right: 3px;
  width: 21px;
  height: 14px;
`;
const ProductBox = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  gap: 10px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  > a {
    margin-right: 18px;
  }
`;
const ProductImg = styled.img`
  width: 190px;
  height: 190px;
`;
const Following = () => {
  const [followings, setFollowings] = useState<IUser[]>();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/user/${id}/followings`)
      .then((res) => res.json())
      .then((data) => setFollowings(data));
  }, []);

  return (
    <Container>
      <ShopHeader>
        <Title>
          팔로잉
          <span>{followings?.length}</span>
        </Title>
      </ShopHeader>
      <div>
        {followings?.map((user, index) => {
          return (
            <Wrapper key={index}>
              <ProfileBox>
                <Link to={`shop`}>
                  <ProfileImg
                    src={
                      user.profileImageUrl
                        ? user.profileImageUrl
                        : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgZmlsbD0iI0ZBRkFGQSIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+CiAgICAgICAgPHBhdGggZD0iTTM2LjIxNiA0MS42ODNjLjI0OC0xLjkzMS40OTgtMy44NjIuNzUtNS43OTRoNi43OWwtLjI4MyA1LjUzN2MwIC4wMTcuMDA3LjAzNC4wMDcuMDUxLS4wMDIuMDEtLjAwMi4wMi0uMDAyLjAzLS4wOTggMS44NzYtMS44OTcgMy4zOTItNC4wMzUgMy4zOTItMS4wNjYgMC0yLjAxOC0uMzktMi42MTUtMS4wNzItLjUxLS41ODUtLjcyMi0xLjMyNS0uNjEyLTIuMTQ0em04Ljg4OCA0LjA3OGMxLjIyNCAxLjI4OSAzLjAwOSAyLjAyOCA0Ljg5IDIuMDI4IDEuODkgMCAzLjY3NC0uNzQgNC45LTIuMDMzLjEwNy0uMTEyLjIwNy0uMjI4LjMwNC0uMzQ1IDEuMjggMS40NDcgMy4yMTcgMi4zNzggNS4zNSAyLjM3OC4xMTIgMCAuMjE2LS4wMjcuMzI4LS4wMzJWNjMuNkgzOS4xMTVWNDcuNzU3Yy4xMTIuMDA1LjIxNS4wMzIuMzI4LjAzMiAyLjEzMyAwIDQuMDcxLS45MzEgNS4zNTEtMi4zOC4wOTkuMTIxLjIuMjM4LjMxLjM1MnptMS41NDUtOS44NzJoNi42OThsLjI4MiA1LjYxOWMwIC4wMTUtLjAwNy4wMjctLjAwNy4wNGwuMDA0LjA4NmEyLjkzOSAyLjkzOSAwIDAgMS0uODI2IDIuMTMyYy0xLjM2NyAxLjQ0LTQuMjMzIDEuNDQxLTUuNjA0LjAwM2EyLjk1IDIuOTUgMCAwIDEtLjgzLTIuMTQybC4wMDQtLjA3OGMwLS4wMTYtLjAwOC0uMDMtLjAwOC0uMDQ4bC4yODctNS42MTJ6bTE2LjM3NiAwYy4yNTIgMS45MzMuNTAyIDMuODY1Ljc1MyA1LjgwNC4xMDkuODEtLjEwNCAxLjU0Ny0uNjE0IDIuMTMyLS41OTYuNjgzLTEuNTUgMS4wNzQtMi42MTYgMS4wNzQtMi4xMzcgMC0zLjkzMi0xLjUxNC00LjAzNC0zLjM4OGEuMzU5LjM1OSAwIDAgMC0uMDAzLS4wNDRjMC0uMDE1LjAwNi0uMDI3LjAwNi0uMDRsLS4yNzgtNS41MzhoNi43ODZ6TTM2LjIyNiA0Ni45NDZ2MTguMDk4YzAgLjc5OC42NDYgMS40NDUgMS40NDQgMS40NDVoMjQuNjVjLjc5OSAwIDEuNDQ1LS42NDcgMS40NDUtMS40NDVWNDYuOTQ2Yy41OS0uMzI4IDEuMTM3LS43MTkgMS41NzUtMS4yMiAxLjA2MS0xLjIxNCAxLjUyMi0yLjc4NSAxLjMwMS00LjQxLS4zLTIuMzU1LS42MDctNC43MDctLjkxOC03LjA2YTEuNDQzIDEuNDQzIDAgMCAwLTEuNDMxLTEuMjU3SDM1LjY5OWMtLjcyNCAwLTEuMzM4LjUzOC0xLjQzMSAxLjI1Ny0uMzExIDIuMzU0LS42MTcgNC43MDctLjkxNiA3LjA1LS4yMjEgMS42MzcuMjQgMy4yMDggMS4zIDQuNDIxLjQzOS41MDIuOTg0Ljg5MyAxLjU3NCAxLjIyeiIgZmlsbD0iI0NDQyIvPgogICAgPC9nPgo8L3N2Zz4K"
                    }
                  />
                </Link>
                <Link to={`shop`}>{user.username}</Link>
                <ProductsAndFollower>
                  <Link to={`/shop/${id}`}>
                    상품 <b>{user.products.length}</b>
                  </Link>
                  <Link to={`/`}>
                    팔로워 <b>{user.followers.length}</b>
                  </Link>
                </ProductsAndFollower>
                <FollowingBox>
                  <FollowingImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAcCAYAAAAX4C3rAAAAAXNSR0IArs4c6QAAAyRJREFUWAntVs9LFHEUf9/vqpDpbLegIDr0i4pOHTp0UjQikCwS1p1dpUSQlDAIii57CLpEhBehJHQbtz+goCy0Q7cOHaKI7MehU3WI3VlNXN15vTfTyLDOd2fWUezgwvL9znufz/t+5vu+3/dGQMhfsafniFWy+kBgOyLuYZoQ4jugeCEb5FjzxMSHkKHWBBNBLMxkGszZz3dJ1gAJlH54EmwB4Kh2YP9VkcmU/DBRbb4Lu0FZZOHTl2eIcFklkrHsY4yNJY7Ljzri8PA2N0ZVoc5OYosLDh6xxeEEI4MQBV1PFH7++vgnnd7NWKVQPpOc7qCAq/1iwOGu9oS1mAm9DywwBIhdS8t4lHlKoXxxqqVbtShz7EunAgTYC936FQS8DwhLQshz8dyjKaYohfLtDoipdvtwsb+/UU1wPPlE8ia96D0qJ4sQg7PaZPapy1EKJYJdglxgLWMl10wmO83i/Ld8KnVcFcdMpm6T7xb9F6i2dMQN47kXqxTqBUWdoyUuIMBOKOO0mUif9MajlxKFRGrEsqzrtJPzMRE7s8MwXnoxPFcKtYt5JTrkcyVX6+xI0cUwqI5plrCm8rrexqGo/MlCd3oMwRqixzkp4XRzLvvKbxmlUO44foRQtgqu6Ooqawf39dCOjZHYRlGGJ8WEfp5KWQ7Aukh2U0KsXTOM16r4ys5kt8yl8jtKjfplfKJyl5L1sWN+LZXTTGdxhMbBFaoQeQHyVDyXfbNi85koRTgL4agPJ8CEo34imUQvgfGcMUSTO/YzwO96Ca1BIhmrFMpO7t0Ufobn4X5ixuFUR+/IGdcIcSMWEy3bDeNtdbTjVabeJf8vHyWBQl3Bm/2Z5+rYGtdrB1ZSz8XXnP06SHUuRR8Fh2iBpoiLzNEtf08X/YE2OfkwYiywhS709u4tlZYfU307ETWgL1+I6bqGOr1pfPyHrz+EUfJObqhIFoHYWl5cznLBD6HJF2Kne8N20rMkHae2op7u85hqmko+kzUxIoDRwktrpct/F2et/Jp4lPjDNRE8YG6hUW+3J1zAFLE5AKF0V+31StYmOLaErvem/wV6ElIsklNjOAAAAABJRU5ErkJggg==" />
                  팔로잉
                  {/* 버튼 클릭 시 팔로잉 하는 기능 추가 */}
                </FollowingBox>
              </ProfileBox>
              <ProductBox>
                <Link to={`/product/${user._id}`}>
                  <ProductImg src={`${user.products}`} />
                </Link>
              </ProductBox>
            </Wrapper>
          );
        })}
      </div>
    </Container>
  );
};

export default Following;
