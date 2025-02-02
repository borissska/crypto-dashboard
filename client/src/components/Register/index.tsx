import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../shared/ui/Modal";
import { register } from "../../redux/slices/userSlice";
import CustomP from "../../shared/ui/CustomP";
import CustomInput from "../../shared/ui/CustomInput";
import CustomButton from "../../shared/ui/CustomButton";
import { useAppDispatch } from "../../redux/store";

export const Register: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password === checkPassword) {
      try {
        dispatch(register({ username, password }));
        setTimeout(() => navigate("/dashboard"), 0);
      } catch (e) {
        setError("Ошибка авторизации. Проверьте данные." + e)
      }
    }
  };

  return (
    <Modal navTo={() => navigate("/dashboard")}>
      <h2>Register</h2>
      <CustomP>Username:</CustomP>
      <CustomInput
        placeholder='username'
        type='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        isFull_Width='full_width'
        required
      />
      <CustomP>Password:</CustomP>
      <CustomInput
        placeholder='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isFull_Width='full_width'
        required
      />
      <CustomP>Password:</CustomP>
      <CustomInput
        placeholder='password'
        type='password'
        value={checkPassword}
        onChange={(e) => setCheckPassword(e.target.value)}
        isFull_Width='full_width'
        required
      />
      {error && (<CustomP>{error}</CustomP>)}
      <CustomButton buttonSize='l' onClick={handleRegister}>
        Register
      </CustomButton>
    </Modal>
  );
};

export default Register;
