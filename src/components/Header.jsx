import { Link, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import Button from './ui/Button';
import PrimaryButton from './ui/PrimaryButton';

import sun from '../assets/sun.png';
import moon from '../assets/moon.png';
import useBankStore from '../hooks/useBankStore';

const Container = styled.header`
  max-width: 1920px;
  min-width: 1024px;
  min-height: 7vh;
  width: 100%;
  padding: 1em;
  background: ${(props) => props.theme.colors.panel};
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-around;
`;

const Home = styled.li`
  padding: 1em 2.5em;
`;

const MenuList = styled.ul`
  display: flex;
  align-items: center;
  right: 5em;
  gap: 3em;
`;

const Img = styled.img`
  width: 2.2em;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: space-around;
  color: #FFF;
`;

const LoginNavigation = styled.nav`
  display: flex;
  align-items: center;
`;
const LoginMenu = styled.ul`
  display: flex;
  gap: 3.5em;
`;

const LoginButtonBox = styled.div`
  display: flex;
  gap: 2em;
`;

export default function Header() {
  const bankStore = useBankStore();

  const [themeName, setThemeName] = useLocalStorage('theme', 'default ');

  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  const handleClickResetState = () => {
    bankStore.transferState = '';
    bankStore.loginState = '';
    bankStore.registrationState = '';
  };

  const toggleTheme = () => {
    setThemeName(themeName === 'default' ? 'dark' : 'default');
  };

  return (
    <Container>
      {accessToken ? (
        <LoginContainer>
          <LoginNavigation>
            <LoginMenu>
              <li>
                <Link to="/">홈</Link>
              </li>
              <li>
                <Link to="/account">잔액 확인</Link>
              </li>
              <li>
                <Link
                  to="/transfer"
                  onClick={handleClickResetState}
                >
                  송금
                </Link>
              </li>
              <li>
                <Link to="/transactions">거래 내역 확인</Link>
              </li>
            </LoginMenu>
          </LoginNavigation>
          <LoginButtonBox>
            <Button
              type="button"
              onClick={toggleTheme}
            >
              <Img src={themeName === 'dark' ? moon : sun} alt="sun" />
            </Button>
            <PrimaryButton
              type="button"
              onClick={handleLogout}
            >
              로그아웃
            </PrimaryButton>
          </LoginButtonBox>
        </LoginContainer>
      ) : (
        <Navigation>
          <Home>
            <Link to="/">홈</Link>
          </Home>
          <MenuList>
            <Button
              type="button"
              onClick={toggleTheme}
            >
              <Img src={themeName === 'dark' ? moon : sun} alt="sun" />
            </Button>
            <>
              <Link to="/register">
                <PrimaryButton onClick={handleClickResetState}>
                  회원가입
                </PrimaryButton>
              </Link>
              <Link to="/login">
                <PrimaryButton onClick={handleClickResetState}>
                  로그인
                </PrimaryButton>
              </Link>
            </>
          </MenuList>
        </Navigation>
      )}
    </Container>
  );
}
