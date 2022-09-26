Feature('Account detail');

Before(({ I }) => {
  // Given
  I.amOnPage('/');

  // TODO: 로그인
});

Scenario('I have no money', ({ I }) => {
  // When
  I.click('잔액 확인');

  // Then
  I.see('잔액이 없습니다');
});

Scenario('I have no money', ({ I }) => {
  // When
  I.click('잔액 확인');

  // Then
  I.see('잔액: 123,000원');
});
