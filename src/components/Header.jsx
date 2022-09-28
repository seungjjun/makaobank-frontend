import { Link, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import Button from './ui/Button';

const Container = styled.header`
  width: 100%;
  padding: 1em;
  background: ${(props) => props.theme.colors.panel};

  nav {
    ul {
      display: flex;
    }

    li {
      margin-right: .5em;
    }
  }
`;

const Navigation = styled.nav`
  ul {
    /* display: flex; */
    /* justify-content: space-between; */
  }
`;

const RegisterButton = styled.li`
  float: right;
`;

const LoginButton = styled.li`
  float: right;
`;

export default function Header() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <Container>
      <Navigation>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          {accessToken ? (
            <>
              <li>
                <Link to="/account">잔액 확인</Link>
              </li>
              <li>
                <Link to="/transfer">송금</Link>
              </li>
              <li>
                <Link to="/transactions">거래 내역 확인</Link>
              </li>
              <li>
                <Button type="button" onClick={handleLogout}>로그아웃</Button>
              </li>
            </>
          ) : (
            <>
              <RegisterButton>
                <Link to="/register">회원가입</Link>
              </RegisterButton>
              <LoginButton>
                <Link to="/login">로그인</Link>
              </LoginButton>
            </>
          )}
        </ul>
      </Navigation>
    </Container>
  );
}
