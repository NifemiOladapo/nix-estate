import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

type formDataType = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<formDataType | {}>({});

  const handleChange = (e) => {
    setFormData((formData) => ({ ...formData, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // make request to backend
  };
  return (
    <main className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          className="border p-3 rounded-lg"
          required
          placeholder="Input Your Username"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          className="border p-3 rounded-lg"
          required
          placeholder="Input Your Email"
          onChange={handleChange}
        />
        <input
          type="password"
          id="Password"
          className="border p-3 rounded-lg"
          required
          placeholder="Input Your Password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </main>
  );
};

export default SignUp;
