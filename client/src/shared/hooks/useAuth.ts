import { fetchUserByToken } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { EStatus } from "../@types/user_types";

const useAuth = () => {
  const { user, token, status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && !user && status === EStatus.EMPTY) {
      dispatch(fetchUserByToken(token));
      console.log("Ушли в fetch")
    } else if (!token) {
      navigate("/login");
    }
  }, [token, user, status]);

  return { user, status };
};

export default useAuth;
