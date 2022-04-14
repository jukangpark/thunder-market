import { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { ShopHeader, Title } from "../../components/commonStyle/LinkHeader";
import { IProduct, IProps } from "../../interface";

const BtnContainer = styled.div`
  margin: 25px 0px 20px;
  width: 100%;
  display: flex;

  > input {
    width: 24px;
    height: 24px;
    border: 0.2px solid rgb(238, 238, 238);
  }

  > button {
    margin-left: 10px;
    padding: 0px 10px;
    height: 28px;
    border: 1px solid rgb(238, 238, 238);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: ${(props) => props.theme.btnColor};
    cursor: pointer;
  }
`;

const ProductImage = styled.div<IProps>`
  width: 139px;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ProductContainer = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  flex-wrap: wrap;
  > div {
    position: relative;
    > a {
      margin-bottom: 10px;
      width: 100%;
      height: 140px;
      display: flex;
      border: 1px solid rgb(238, 238, 238);
      position: relative;
    }
    > input {
      width: 24px;
      height: 24px;
      border: 0.2px solid rgb(238, 238, 238);
      display: block;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
  }
`;

const InfoContainer = styled.div`
  > div {
    padding: 0px 64px 0px 20px;

    > h1 {
      margin: 18px 0px 10px;
      height: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 14px;
    }
  }
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  > div {
    position: relative;
    ::after {
      content: "원";
      position: absolute;
      font-weight: normal;
      font-size: 13px;
      top: 1px;
      right: -15px;
    }
  }
`;

const Time = styled.div`
  font-size: 12px;
  height: 40px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.btnColor};
`;

const LocationBox = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-top: 1px solid rgb(238, 238, 238);
  font-size: 12px;
  color: ${(props) => props.theme.btnColor};
  box-sizing: border-box;
  > img {
    margin-right: 5px;
    width: 15px;
    height: 17px;
  }
`;

const Favorite = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState<IProduct[]>();
  // const [inputEl, setInputEl] = useState();

  let favoritesArray = [] as any;

  const inputEl = useRef([]) as any;
  // 초기값에 빈 배열을 넣어줌.
  // 상품을 한개 삭제하고 나서
  // 전체 선택 누르게 되면
  // elem 에 null 이 있다고 함.
  // 그래서 null 에는 checked 라는 프로퍼티를 참조 할 수 없다고 뜸.

  const fetchFavorites = () => {
    fetch(`/user/${id}/favorites`)
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  };

  const handleFetch = async () => {
    if (favoritesArray.length === 0) {
      return alert("상품을 선택해주세요");
    }

    await fetch(`/user/${id}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorites: favoritesArray,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));

    console.log(favoritesArray, "으로 api 호출합니다!!!");
    fetchFavorites();
  };

  const handleAllCheck = () => {
    inputEl.current.map((elem: any) => (elem.checked = !elem.checked));
    const array = inputEl.current.filter((x: any) => x.checked);
    const idArray = array.map((x: any) => x.dataset.productid);
    favoritesArray = [...idArray];
  };

  const handleChange = (event: any) => {
    if (favoritesArray.includes(event.target.dataset.productid)) {
      const editedArray = favoritesArray.filter(
        (id: any) => String(id) !== event.target.dataset.productid
      );
      favoritesArray = editedArray;
      return;
    }
    favoritesArray.push(event.target.dataset.productid);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <ShopHeader>
        <Title>
          찜<span>{favorites?.length}</span>
        </Title>
      </ShopHeader>

      <BtnContainer>
        <input type="checkbox" onClick={handleAllCheck} />
        <button onClick={handleFetch}>선택삭제</button>
      </BtnContainer>

      <ProductContainer>
        {favorites?.map((favorite, index) => (
          <div key={favorite._id}>
            <Link to={`/product/${favorite._id}`}>
              <ProductImage
                imageUrl={`${favorite.imageUrl.replaceAll("\\", "/")}`}
              />

              <InfoContainer>
                <div>
                  <h1>{favorite.name}</h1>
                  <Price>
                    {favorite.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Price>
                  <Time>
                    <Moment fromNow>{favorite.createdAt}</Moment>
                  </Time>
                </div>
                <LocationBox>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII="
                    alt="위치"
                  />
                  {favorite.location}
                </LocationBox>
              </InfoContainer>
            </Link>
            <input
              type="checkbox"
              onChange={handleChange}
              data-productid={favorite._id}
              ref={(elem) => (inputEl.current[index] = elem)}
            />
          </div>
        ))}
      </ProductContainer>
    </div>
  );
};

export default Favorite;
