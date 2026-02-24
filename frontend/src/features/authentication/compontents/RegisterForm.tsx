import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/ReduxStore";
import { useEffect, useRef } from "react";
import { registerUser, resetRegisterSuccess } from "../../../redux/slices/AuthenticationSlice";


interface RegisterFormProps {
    toggleLogin(): void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({toggleLogin}) => {
    const authState = useSelector((state: RootState) => state.authentication);
    const dispatch: AppDispatch = useDispatch();

    const firstRef=useRef<HTMLInputElement>(null);
    const lastRef=useRef<HTMLInputElement>(null);
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);

    const handleRegisterUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (firstRef.current && lastRef.current && emailRef.current && passwordRef.current) {
            dispatch(
                registerUser({
                    type: "PARTRON",
                    firstname: firstRef.current.value,
                    lastname: lastRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                })
            );
        }
    }

    useEffect(() => {
        return (() => {
            dispatch(resetRegisterSuccess());
        })
    },[])
    return (
        <>
         <div className="flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <form className="bg-white p-3 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Create Your Account ✨
        </h2>

        {authState.error && (
          <p className="text-red-600 text-center mb-4">
            Registration failed. Please try again.
          </p>
        )}

        {authState.registerSuccess && (
          <p className="text-green-600 text-center mb-4">
            Registered successfully!{" "}
            <span
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
              onClick={toggleLogin}
            >
              Login here
            </span>
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">First Name</label>
            <input
              ref={firstRef}
              type="text"
              placeholder="Enter first name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Last Name</label>
            <input
              ref={lastRef}
              type="text"
              placeholder="Enter last name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          onClick={handleRegisterUser}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg cursor-pointer font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md"
        >
          Register
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            onClick={toggleLogin}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
        </>
    )
}