import React from "react";
import CustomInput from "../../shared/ui/CustomInput";
import CustomButton from "../../shared/ui/CustomButton";
import { addPortfolioElement } from "../../services/api";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import styles from "./AddPortfolioElement.module.scss";
import CustomP from "../../shared/ui/CustomP";

type TInput = {
  ticker: string;
};

const AddPortfolioElement: React.FC<TInput> = ({ ticker }) => {
  const [amount, setAmount] = React.useState(0);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handlePortfolioElement = async () => {
    try {
      console.log("addPortfolioElement пользователь", user);
      if (user) {
        await addPortfolioElement({ user_id: user.id, ticker, amount });
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log("addPortfolioElement, что-то пошло не так");
    }
  };

  return (
    <div className={styles.full_element}>
      <div className={styles.inner_element}>
        <CustomP pSize='l'>Добавить {ticker}</CustomP>
        <CustomInput
          type='amount'
          placeholder='amount'
          value={String(amount)}
          onChange={(e) => setAmount(Number(e.target.value))}
          inputSize="l"
          required
        />
        <CustomButton onClick={handlePortfolioElement}>Add</CustomButton>
      </div>
    </div>
  );
};

export default AddPortfolioElement;
