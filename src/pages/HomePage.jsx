import styled from 'styled-components';
import { bankStore } from '../stores/BankStore';

const Home = styled.div`
  background-image: url('../assets/main.png');
  background-repeat: no-repeat;
`;

export default function HomePage() {
  const handleLogin = () => {
    bankStore.login({ accountNumber: '1234', password: 'password' });
  };
  return (
    <Home>
      <p>Hello, world!</p>
      <button
        type="button"
        onClick={handleLogin}
      >
        Log in
      </button>
    </Home>

  );
}
