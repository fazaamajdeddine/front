import { FormEvent, useState } from "react";
import { useAuthStore } from "../../stores";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const loginUser = useAuthStore((state) => state.loginUser);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = credentials;
    if ([email, password].includes("")) {
      return toast.error("All fields are required");
    }
    try {
      await loginUser(email, password);
      navigate("/entranceGate");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-app-background">
    

      <main className="flex flex-col items-center w-full max-w-2xl mt-6">
        <h1 className="text-4xl font-bold mb-4">Login Now</h1>
        <p className="text-lg mb-8">Hi, Welcome back 👋</p>

        <button
          type="button"
          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold"
        >
          Login with Google
        </button>

        <div className="my-6 flex items-center justify-center space-x-2">
          <hr className="w-24 border-gray-300" />
          <span className="text-gray-500">or Login with Email</span>
          <hr className="w-24 border-gray-300" />
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <Link to="/forgot-password" className="text-sm text-blue-500 underline">
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="w-full mt-6 px-4 py-3 rounded-lg bg-[#FF1276] hover:bg-[#FF1276] text-white font-semibold"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};
