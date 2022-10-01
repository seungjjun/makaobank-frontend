Feature('회원 가입 - 고객은 본 서비스를 이용하기 위해 회원 가입을 할 수 있다.');
  
// Given
Before(({ I }) => {
  I.setupDatabase();
}); 

Scenario('올바르게 모든 정보를 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When 
  I.click('회원가입');
  
  I.see('SIGN UP');

  I.fillField('이름:', '노승준');
  I.fillField('계좌번호 입력:', '11112222');
  I.fillField('비밀번호:', 'Qwe1234!');
  I.fillField('비밀번호 확인:', 'Qwe1234!');

  // 회원가입 버튼
  I.click('[type=submit]')

  // Then
  I.see('회원가입 성공'); 
});

Scenario('이름을 영어로 입력한 경우 ', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When 
  I.click('회원가입');
  
  I.see('SIGN UP');

  I.fillField('이름:', 'NohSeungJun');

  // Then
  I.see('3 ~ 7자까지 한글만 사용 가능'); 
});

Scenario('이름의 글자수를 초과해서 입력한 경우 ', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When 
  I.click('회원가입');
  
  I.see('SIGN UP');

  I.fillField('이름:', '내이름은노승준이다.');

  // Then
  I.see('3 ~ 7자까지 한글만 사용 가능'); 
});

Scenario('계좌번호를 잘못 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When 
  I.click('회원가입');
  
  I.see('SIGN UP');

  I.fillField('계좌번호 입력:', '1234-5678-9012');

  // Then
  I.see('로그인 및 거래시 사용될 계좌번호이며 숫자만 사용 가능(8글자)'); 
});

Scenario('비밀번호를 잘못 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When 
  I.click('회원가입');
  
  I.see('SIGN UP');

  I.fillField('비밀번호:', '1234');

  // Then
  I.see('8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함'); 
});

Scenario('비밀번호와 일치하지 않는 비밀번호 확인을 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When 
  I.click('회원가입');
  
  I.see('SIGN UP');

  I.fillField('비밀번호:', 'Qwe1234!');
  I.fillField('비밀번호 확인:', '1234');

  I.click('[type=submit]')

  // Then
  I.see('비밀번호가 일치하지 않습니다'); 
});
