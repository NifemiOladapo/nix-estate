import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({ ...formData, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data);
        return setError(data.message);
      }
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
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
          id="password"
          className="border p-3 rounded-lg"
          required
          placeholder="Input Your Password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Signing You Up..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      <p className="text-red-600">{error}</p>
    </main>
  );
};

export default SignUp;
