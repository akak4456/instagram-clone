export const validateUserId = (userId, users) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^01[0-9]{8,9}$/;

  if (!userId) {
    return "올바른 휴대폰 번호 또는 이메일 주소를 입력하세요.";
  }

  if (!emailRegex.test(userId) && !phoneRegex.test(userId)) {
    return "올바른 휴대폰 번호 또는 이메일 주소를 입력하세요.";
  }

  // 🔥 중복 체크
  const isDuplicate = users.some((u) => u.userId === userId);
  if (isDuplicate) {
    return "이미 사용 중인 휴대폰 번호 또는 이메일입니다.";
  }

  return "";
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-]).{6,}$/;

  if (!regex.test(password)) {
    return "숫자, 영문, 특수기호(!, & 등)를 조합한 여섯 자리 이상의 비밀번호를 입력하세요.";
  }

  return "";
};

export const validateBirthday = (year, month, day) => {
  if (!year || !month || !day) {
    return "생일을 선택하세요. 공개 대상은 나중에 변경할 수 있습니다.";
  }
  return "";
};

export const validateUsername = (username) => {
  if (!username) {
    return "계정의 사용자 이름을 선택하세요.";
  }
  return "";
};
