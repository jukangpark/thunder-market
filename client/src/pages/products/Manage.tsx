import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IProduct } from "../../interface";
import { Link } from "react-router-dom";

interface IProps {
  imageUrl: string;
}

const ProductImage = styled.div<IProps>`
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 150px;
  height: 150px;
`;

const FormContainer = styled.div`
  display: flex;
  margin: 2.5rem 0px 2rem;

  form > input {
    width: 400px;
    height: 48px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 0px 68px 0px 1rem;
    border-radius: 2px;
    border: 1px solid ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    margin-right: 16px;
  }
  select {
    width: 110px;
    font-size: 17px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
  }
  select:nth-child(2) {
    margin-right: 1rem;
  }
`;

const TableContainer = styled.div`
  table {
    thead {
      line-height: 40px;
      border-top: 1px solid ${(props) => props.theme.textColor};
      border-bottom: 1px solid ${(props) => props.theme.textColor};
      font-size: 16px;
      box-sizing: border-box;
      tr {
        display: flex;
        th {
          width: 10%;
        }
      }
    }

    tbody {
      height: 170px;
    }
    tr {
      display: flex;
      height: 100%;
      td {
        width: 10%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-bottom: 0.5px solid ${(props) => props.theme.textColor};
        div {
          button {
            display: block;
            border: 0.3px solid ${(props) => props.theme.textColor};
            width: 50px;
            height: 30px;
            margin-bottom: 8px;
            cursor: pointer;
            &:nth-child(1) {
              color: ${(props) => props.theme.accentColor};
            }
            &:nth-child(2) {
              color: rgb(0, 114, 230);
            }
          }
        }

        a {
          display: flex;
          height: 100%;
          width: 100%;
          justify-content: center;
          align-items: center;
          font-size: 17px;
          letter-spacing: 0.5px;
        }
        form > select {
          font-size: 17px;
          width: 110px;
          height: 48px;
          background-color: ${(props) => props.theme.bgColor};
          color: ${(props) => props.theme.textColor};
          cursor: pointer;
        }
      }
    }
  }
`;

const ProductManage = () => {
  const [products, setProducts] = useState<IProduct[]>();

  const handleChangeStateApi = (productid: string, state: string) => {
    fetch("/productapi/changeState", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productid,
        state,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));

    // 상품의 상태 변경 혹은 삭제 후 products 상태 변경
    fetch("/user/info")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  };

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const { productid } = event.currentTarget.dataset;
    const { value: state } = event.currentTarget;

    if (productid === undefined) return;

    if (event.currentTarget.value === "삭제") {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        return handleChangeStateApi(productid, state); // 여기서 코드 빠져나오기.
      } else {
        return; // window.confirm 에서 취소를 눌렀을 때 함수 종료.
      }
    }

    handleChangeStateApi(productid, state);
    // 위에서 삭제하고 return  하지않으면 에러뜸.
  };

  useEffect(() => {
    fetch("/user/info")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div>
      <FormContainer>
        <form>
          <input placeholder="상품명을 입력해주세요." />
        </form>
        <select>
          <option>10개씩</option>
          <option>20개씩</option>
          <option>50개씩</option>
          <option>100개씩</option>
        </select>
        <select>
          <option>전체</option>
          <option>판매중</option>
          <option>예약중</option>
          <option>판매완료</option>
        </select>
      </FormContainer>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th style={{ width: "15%" }}>사진</th>
              <th style={{ width: "13%" }}>판매상태</th>
              <th style={{ width: "17%" }}>상품명</th>
              <th style={{ width: "15%" }}>가격</th>
              <th>배송비 포함</th>
              <th>찜 / 댓글</th>
              <th>최근수정일</th>
              <th>기능</th>
            </tr>
          </thead>
          {/* thead ---------------------------------------*/}

          <tbody>
            {products?.map((product, index) => {
              return (
                <tr key={index}>
                  <td style={{ width: "15%" }}>
                    <Link to={`/product/${product._id}`}>
                      <ProductImage imageUrl={product.imageUrl} />
                    </Link>
                  </td>
                  <td style={{ width: "13%" }}>
                    <form>
                      <select
                        name="state"
                        onChange={handleChange}
                        data-productid={product._id}
                        value={product.state}
                      >
                        {/* value={product.state} */}
                        <option value="판매 중">판매 중</option>
                        <option value="예약 중">예약 중</option>
                        <option value="삭제">삭제</option>
                        <option value="판매완료">판매완료</option>
                      </select>
                    </form>
                  </td>
                  <td style={{ width: "17%" }}>
                    <Link
                      to={`/product/${product._id}`}
                      style={{ color: "rgb(0, 114, 230)" }}
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td style={{ width: "15%" }}>
                    {product.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>{product.delivery ? "O" : "X"}</td>
                  <td>{product.meta.favorites.length}/0</td>
                  <td>{product.createdAt}</td>
                  <td>
                    <div>
                      <button>UP</button>
                      <button>수정</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableContainer>
    </div>
  );
};

export default ProductManage;
