import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import Header from './Header';

import defaultTheme from '../styles/defaultTheme';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('Header', () => {
  function renderHeader() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <Header />
      </ThemeProvider>
    ));
  }
  context('without loggiend in', () => {
    beforeEach(() => {
      localStorage.removeItem('accessToken');
    });

    it('renders "로그인" button', () => {
      renderHeader();

      screen.getByText(/로그인/);
    });
  });

  context('with loggiend in', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    });

    it('renders "로그아웃" button', () => {
      renderHeader();

      screen.getByText(/로그아웃/);
    });
  });

  context('when the "로그아웃" button is clicked', () => {
    it('redirects the home page', () => {
      renderHeader();

      fireEvent.click(screen.getByText(/로그아웃/));

      expect(navigate).toBeCalledWith('/');
    });
  });
});
