import { useRef } from "react";
import type { RootState } from "../../../redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../redux/ReduxStore";
import { loginUser } from "../../../redux/slices/AuthenticationSlice";

interface LoginFormProps {
  toggleRegister(): void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggleRegister }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const auth = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();

  const handleLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  return (
    <div className="w-full">
      <form className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
        <h2 className="text-2xl font-bold text-center mb-5 text-indigo-600">
          Welcome Back 👋
        </h2>

        {auth.error && (
          <p className="text-red-600 text-center mb-4 font-medium">
            Invalid email or password
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <button
          onClick={handleLoginUser}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 cursor-pointer"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={toggleRegister}
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
          >
            Create one here
          </span>
        </p>
      </form>
    </div>
  );
};
