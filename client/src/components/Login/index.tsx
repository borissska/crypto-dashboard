import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/store";
import styles from "./Login.module.scss";
import Modal from "../../shared/ui/Modal";
import CustomInput from "../../shared/ui/CustomInput";
import CustomButton from "../../shared/ui/CustomButton";
import CustomP from "../../shared/ui/CustomP";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      dispatch(login({ username, password }));
      setTimeout(() => navigate("/dashboard"), 0);
    } catch (err) {
      setError("Ошибка авторизации. Проверьте данные.");
    }
  };

  return (
    <Modal navTo={() => navigate("/dashboard")}>
      <h2>Login</h2>
      <CustomP>Username:</CustomP>
      <CustomInput
        type='username'
        placeholder='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        isFull_Width="full_width"
        required
      />
      <CustomP>Password:</CustomP>
      <CustomInput
        type='password'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isFull_Width="full_width"
        required
      />
      <CustomButton onClick={handleLogin} buttonSize='l'>Login</CustomButton>
      {error && <CustomP>{error}</CustomP>}
    </Modal>
  );
};

export default Login;
