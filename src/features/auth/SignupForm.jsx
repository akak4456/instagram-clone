import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  validateUserId,
  validatePassword,
  validateBirthday,
  validateUsername,
} from "../../utils/validation";

import styled from "styled-components";
import Input from "../../components/input/Input";
import Dropdown from "../../components/dropdown/Drodown";
import errorMark from "../../assets/error-mark.png";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
`;

const SignupFormLabel = styled.span`
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 18px;
`;

const BirthWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  margin-top: 4px;
  margin-bottom: 4px;
  span {
    font-size: 13px;
    color: #ed4956;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
`;

const DescriptionDiv = styled.div`
  margin-top: 8px;
  b {
    color: #0064e0;
  }
`;

const getDays = (year, month) => {
  if (!year || !month) return Array.from({ length: 31 }, (_, i) => i + 1);

  const lastDay = new Date(year, month, 0).getDate();
  return Array.from({ length: lastDay }, (_, i) => i + 1);
};
const SignupForm = () => {
  const [open, setOpen] = useState(false);
  const { users, addUser, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: "",
    password: "",
    year: "",
    month: "",
    day: "",
    name: "",
    username: "",
  });

  const [error, setError] = useState({
    userIdError: "",
    passwordError: "",
    birthdayError: "",
    usernameError: "",
  });

  const handleSubmit = async () => {
    const userIdError = validateUserId(form.userId, users);
    const passwordError = validatePassword(form.password);
    const birthdayError = validateBirthday(form.year, form.month, form.day);
    const usernameError = validateUsername(form.username);

    const newErrors = {
      userIdError,
      passwordError,
      birthdayError,
      usernameError,
    };

    setError(newErrors);

    // 하나라도 에러 있으면 종료
    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError) return;

    const result = await addUser(form);

    setOpen(true);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = getDays(form.year, form.month);
  return (
    <SignupWrapper>
      <SignupFormLabel>휴대폰 번호 또는 이메일 주소</SignupFormLabel>
      <Input
        label="휴대폰 번호 또는 이메일 주소"
        value={form.userId}
        onChange={(e) => setForm({ ...form, userId: e.target.value })}
        error={!!error.userIdError}
      />
      {error.userIdError && (
        <ErrorWrapper>
          <img src={errorMark} alt="error-mark" />
          <span>{error.userIdError}</span>
        </ErrorWrapper>
      )}
      <DescriptionDiv>
        저희가 회원님에게 보내는 알림을 수신할 수 있습니다.{" "}
        <b>회원님의 연락처 정보가 필요한 이유를 알아보세요</b>
      </DescriptionDiv>
      <SignupFormLabel>비밀번호</SignupFormLabel>
      <Input
        type="password"
        label="비밀번호"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={!!error.passwordError}
      />
      {error.passwordError && (
        <ErrorWrapper>
          <img src={errorMark} alt="error-mark" />
          <span>{error.passwordError}</span>
        </ErrorWrapper>
      )}
      <SignupFormLabel>생년월일</SignupFormLabel>
      <BirthWrapper>
        <Dropdown
          placeholder="연도"
          options={years}
          value={form.year}
          suffix="년"
          onChange={(v) => setForm({ ...form, year: v })}
          error={!!error.birthdayError}
        />
        <Dropdown
          placeholder="월"
          options={months}
          value={form.month}
          suffix="월"
          onChange={(v) => setForm({ ...form, month: v })}
          error={!!error.birthdayError}
        />
        <Dropdown
          placeholder="일"
          options={days}
          value={form.day}
          suffix="일"
          onChange={(v) => setForm({ ...form, day: v })}
          error={!!error.birthdayError}
        />
      </BirthWrapper>
      {error.birthdayError && (
        <ErrorWrapper>
          <img src={errorMark} alt="error-mark" />
          <span>{error.birthdayError}</span>
        </ErrorWrapper>
      )}
      <SignupFormLabel>이름</SignupFormLabel>
      <Input
        label="성명"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <SignupFormLabel>사용자 이름</SignupFormLabel>
      <Input
        label="사용자 이름"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        error={!!error.usernameError}
      />
      {error.usernameError && (
        <ErrorWrapper>
          <img src={errorMark} alt="error-mark" />
          <span>{error.usernameError}</span>
        </ErrorWrapper>
      )}
      <DescriptionDiv>
        저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에
        업로드했을 수도 있습니다.
        <b>더 알아보기</b>
      </DescriptionDiv>
      <DescriptionDiv>
        회원님은 저희가 보내는 SMS를 받을 수 있으며 언제든지 이를 수신 거부할 수
        있습니다.
        <b>더 알아보기</b>
      </DescriptionDiv>
      <ButtonWrapper>
        <Button onClick={handleSubmit} loading={loading}>
          제출
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button variant="secondary-default">이미 계정이 있습니다</Button>
      </ButtonWrapper>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          navigate("/login");
        }}
        title="회원가입 성공"
        subtext="회원가입이 성공하였습니다."
        buttontext="로그인 하러 가기"
      />
    </SignupWrapper>
  );
};

export default SignupForm;
