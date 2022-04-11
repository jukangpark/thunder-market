import { useEffect, useState } from "react";
import styled from "styled-components";
import { IProduct, IUser } from "../../interface";

const TableContainer = styled.div`
  table > tbody > tr {
    border-bottom: 1px solid rgb(220, 219, 228);
  }
`;

const ProductManage = () => {
  const [products, setProducts] = useState<IProduct[]>();

  useEffect(() => {
    fetch("/user/info")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);
  console.log(products);

  return (
    <div>
      <div>
        <form>
          <input placeholder="상품명을 입력해주세요." />
          <button>돋보기 버튼</button>
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
      </div>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>사진</th>
              <th>판매상태</th>
              <th>상품명</th>
              <th>가격</th>
              <th>안전결제 환영</th>
              <th>찜 / 댓글</th>
              <th>최근수정일</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              <tr>
                <td style={{ height: "100px" }}>
                  <img src={product.imageUrl} />
                </td>
                <td>
                  <select>
                    <option>판매 중</option>
                    <option>예약 중</option>
                    <option>삭제</option>
                    <option>판매완료</option>
                  </select>
                </td>
                <td>상품명</td>
                <td>가격</td>
                <td>O</td>
                <td>5/0</td>
                <td>2022-04-10 21:00</td>
                <td>
                  <button>UP</button>
                  <button>수정</button>
                </td>
              </tr>;
            })}
            <tr>
              <td>
                <a href=""></a>
              </td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    </div>
  );
};

export default ProductManage;
