Feature('송금 - 고객은 실물 거래에 대한 대가를 지불하기 위해 타인에게 송금할 수 있다.');

function numberFormat(number) {
  return Intl.NumberFormat().format(number);
}


const amount = 1000000;

// Given
Before(({I}) => {
  I.setupDatabase();
  I.changeAmount({ userId: 1, amount });

  I.login('1234')
  
  I.amOnPage('/');
  
  I.click('송금');
});

Scenario('올바르게 송금이 된 경우', ({ I }) => {
  const transferAmount = 500000;
  // When
  I.fillField('받을 분 계좌 번호', '5678');
  I.fillField('보낼 금액', transferAmount);
  I.fillField('받는 분 통장 표시', 'Raichu');
  I.click('보내기');

  // Then
  I.see('계좌 이체 성공');

  I.click('잔액 확인');
  I.see(`잔액: ${numberFormat(amount - transferAmount)}원`)
})

Scenario('잔액이 부족한 경우', ({ I }) => {
  // When
  I.fillField('받을 분 계좌 번호', '5678');
  I.fillField('보낼 금액', amount + 1000);
  I.fillField('받는 분 통장 표시', 'Raichu');
  I.click('보내기');

  // Then
  I.see('계좌 잔액이 부족합니다');
})

Scenario('계좌 번호가 잘못된 경우', ({ I }) => {
  // When
  I.fillField('받을 분 계좌 번호', '12341324123');
  I.fillField('보낼 금액', '3000');
  I.fillField('받는 분 통장 표시', 'Raichu');
  I.click('보내기');

  // Then
  I.see('계좌 번호가 잘못 되었습니다.');
})

Scenario('존재하지 않는 계좌번호를 입력했을 경우', ({ I }) => {
  // When
  I.fillField('받을 분 계좌 번호', '99999999');
  I.fillField('보낼 금액', '100');
  I.fillField('받는 분 통장 표시', 'Pikachu');
  I.click('보내기');

  // Then
  I.see('잘못된 계좌번호입니다. 다시 입력해주세요');
})

Scenario('본인 계좌로 송금할 경우', ({ I }) => {
  // When
  I.fillField('받을 분 계좌 번호', '1234');
  I.fillField('보낼 금액', '100');
  I.fillField('받는 분 통장 표시', 'Pikachu');
  I.click('보내기');

  // Then
  I.see('본인의 계좌번호입니다. 다시 입력해주세요');
})
