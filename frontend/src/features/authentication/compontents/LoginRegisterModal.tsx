import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../compontent";
import type { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { useEffect, useState } from "react";
import { setDisplayLogin } from "../../../redux/slices/ModalSlice";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const LoginRegisterModal: React.FC = () => {
  const authState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();

  const [login, setLogin] = useState<boolean>(true);

  const closeModal = () => {
    dispatch(setDisplayLogin(false));
  };

  const toggleLogin = () => {
    setLogin(!login);
  };

  useEffect(() => {
    if (authState.loggedInUser) {
      localStorage.setItem("userId", authState.loggedInUser._id);
      dispatch(setDisplayLogin(false));
    }
  }, [authState.loggedInUser]);

  return (
<Modal toggleModal={closeModal} content={login ? <LoginForm toggleRegister={toggleLogin}/>:<RegisterForm toggleLogin={toggleLogin}></RegisterForm>} />
  );
};
