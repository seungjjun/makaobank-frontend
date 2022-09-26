import { useEffect, useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Reset } from 'styled-reset';

import styled, { ThemeProvider } from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';

import PrimaryButton from './components/ui/PrimaryButton';

import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import TransferPage from './pages/TransferPage';
import TransactionsPage from './pages/TransactionsPage';

import GlobalStyle from './styles/GlobalStyle';

import defaultTheme from './styles/defaultTheme';
import darkTheme from './styles/darkTheme';

const Main = styled.main`
  padding: 1em;
`;

export default function App() {
  const [themeName, setThemeName] = useLocalStorage('theme', 'default ');

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
          <Route path="/account" element={<AccountPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </Main>
    </ThemeProvider>
  ));
}
