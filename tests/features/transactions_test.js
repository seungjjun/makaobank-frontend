Feature('거래 내역 확인 - 고객은 소비 계획을 세울 수 있도록 거래 내역을 확인할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
  I.changeAmount({ userId: 1, amount: 1000000 });
});

Scenario('거래 내역이 없는 경우', ({ I }) => {
  I.login('1234')

  // When
  I.amOnPage('/');
  I.click('거래 내역 확인');

  // Then
  I.see('거래 내역이 없습니다');
});

Scenario('내가 보낸 거래 내역이 있는 경우', ({ I }) => {

  I.login('1234')

  // Given
  I.transfer({to:'5678', amount: '5000', name: 'Raichu'}) 


  I.waitForText('계좌 이체 성공');

  // When
  I.amOnPage('/');
  I.click('거래 내역 확인');

  // Then
  I.see('송금\t5678\t5,000원');
});

Scenario('내가 받은 거래 내역이 있는 경우', ({ I }) => {

  I.login('1234')

  // Given
  I.transfer({to:'5678', amount: '5000', name: 'Raichu'}) 
  I.waitForText('계좌 이체 성공');
  
  I.login('5678')

  // When
  I.amOnPage('/');
  I.click('거래 내역 확인');

  // Then
  I.see('입금 Raichu\t5,000원');
});

