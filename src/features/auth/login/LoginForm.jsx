import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
const LoginForm = ({ handleLogin }) => {
  const { authLoading } = useAuth();
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const isValid = form.userId && form.password;
  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <Input
        label="휴대폰 번호, 사용자 이름 또는 이메일 주소"
        value={form.userId}
        onChange={(e) => setForm({ ...form, userId: e.target.value })}
      />

      <div style={{ marginTop: "8px" }}>
        <Input
          type="password"
          label="비밀번호"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <div style={{ marginTop: "16px" }}>
        <Button
          onClick={() => handleLogin(form)}
          disabled={!isValid}
          loading={authLoading}
        >
          로그인
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
