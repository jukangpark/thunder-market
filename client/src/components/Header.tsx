import styled from "styled-components";

const Container = styled.div`
  width: 1400px;
  height: 100px;
  display: flex;
  background-color: gray;
`;

const Header = () => {
  return (
    <Container>
      <div>
        <a href="/">번개장터</a>
      </div>
      <div>
        <form>
          <input placeholder="상품명, 지역명, @상점명 입력" />
        </form>
      </div>
      <div>
        <button>
          <a href="/upload">판매하기</a>
        </button>
        <button>내 상점</button>
        <button>번개톡</button>
      </div>
    </Container>
  );
};

export default Header;
