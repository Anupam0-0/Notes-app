import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Attempting to login with:", { email });

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError(null);

    try {
      console.log("Attempting to login with:", { email, password });
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      console.log("Login response:", response);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token set in localStorage:", response.data.token);
        navigate("/dashboard");
      } else {
        setError("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-50 px-4">
      <div className="w-full max-w-md bg-slate-100 p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl pb-4 text-center font-bold leading-tight tracking-tight text-gray-900">
          Log in
        </h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500">
                  Remember me
                </label>
              </div>
            </div>
            <a href="#" className="text-sm font-medium text-primary-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500">
            Don’t have an account yet?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
