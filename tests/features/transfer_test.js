Feature('송금 - 고객은 실물 거래에 대한 대가를 지불하기 위해 타인에게 송금할 수 있다.');

// Given
Before(({I}) => {
  // TODO: 계좌 생성
  I.amOnPage('/');

  // TODO: 로그인

  I.click('송금');
});

Scenario('올바르게 송금이 된 경우', ({ I }) => {
  // When
  I.fillField('받을 분 계좌 번호', '56789012');
  I.fillField('보낼 금액', '3000');

  // Then
  I.see('계좌 이체 성공');
})

Scenario('잔액이 부족한 경우', ({ I }) => {
  // When
  I.fillField('받을 분 계좌 번호', '56789012');
  I.fillField('보낼 금액', '30000000000');

  // Then
  I.see('잔액이 부족합니다');
})

Scenario('계좌 번호가 잘못된 경우', ({ I }) => {
  // When
  I.fillField('받을 분 계좌 번호', '43214321');
  I.fillField('보낼 금액', '3000');

  // Then
  I.see('계좌 번호가 틀립니다');
})
