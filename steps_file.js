/* global actor */

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
  },

  changeAmount({ userId, amount }) {
    this.amOnPage(`${backdoorBaseUrl}/change-amount?userId=${userId}&amount=${amount}`);
  },

  transfer({ to, amount, name }) {
    this.amOnPage('/transfer');

    this.fillField('받을 분 계좌 번호', to);
    this.fillField('보낼 금액', amount);
    this.fillField('받는 분 통장 표시', name);
    this.click('보내기');

    this.waitForText('계좌 이체 성공');
  },
});
