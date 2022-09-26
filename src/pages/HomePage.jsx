import { bankStore } from '../stores/BankStore';

export default function HomePage() {
  const handleLogin = () => {
    bankStore.login({ accountNumber: '1234', password: 'password' });
  };
  return (
    <div>
      <p>Hello, world!</p>
      <button
        type="button"
        onClick={handleLogin}
      >
        Log in
      </button>
    </div>

  );
}
