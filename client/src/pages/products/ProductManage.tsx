const ProductManage = () => {
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

      <div>
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
            <tr>
              <td>
                <a href=""></a>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManage;
