import React, { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
const LoginForm = ({ handleLogin }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const isValid = form.username && form.password;
  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <Input
        label="휴대폰 번호, 사용자 이름 또는 이메일 주소"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
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
        <Button onClick={() => handleLogin(form)} disabled={!isValid}>
          로그인
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
