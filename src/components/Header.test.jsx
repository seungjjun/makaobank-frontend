import { render, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import Header from './Header';

import defaultTheme from '../styles/defaultTheme';

jest.mock('react-router-dom', () => ({
  Link({ children }) {
    return children;
  },
}));

test('Header', () => {
  render((
    <ThemeProvider theme={defaultTheme}>
      <Header />
    </ThemeProvider>
  ));

  screen.getByText(/Home/);
});
