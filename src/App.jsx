import { Routes, Route } from 'react-router-dom';

import { Reset } from 'styled-reset';

import styled, { ThemeProvider } from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';

import { useEffect } from 'react';

import { apiService } from './services/ApiService';

import PrimaryButton from './components/ui/PrimaryButton';

import Header from './components/Header';

import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import TransferPage from './pages/TransferPage';
import TransactionsPage from './pages/TransactionsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import GlobalStyle from './styles/GlobalStyle';

import defaultTheme from './styles/defaultTheme';
import darkTheme from './styles/darkTheme';

const Main = styled.main`
  padding: 1em;
  max-width: 1440px;
  min-width: 1024px;
  min-height: 100vh;
  margin: 0px auto;
`;

export default function App() {
  const [themeName, setThemeName] = useLocalStorage('theme', 'default ');
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
  }, [accessToken]);

  const theme = themeName === 'dark' ? darkTheme : defaultTheme;

  const toggleTheme = () => {
    setThemeName(themeName === 'default' ? 'dark' : 'default');
  };
  return ((
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Header />
      <PrimaryButton
        type="button"
        onClick={toggleTheme}
      >
        Toggle Theme
      </PrimaryButton>
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </Main>
    </ThemeProvider>
  ));
}
