import useBankStore from '../hooks/useBankStore';
import numberFormat from '../utils/numberFormat';

export default function Transactions() {
  const bankStore = useBankStore();

  const { transactions } = bankStore;

  if (!transactions.length) {
    return (
      <p>
        거래 내역이 없습니다
      </p>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>종류</th>
          <th>계좌번호</th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.activity}</td>
            <td>{transaction.name}</td>
            <td>
              {numberFormat(transaction.amount)}
              원
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
