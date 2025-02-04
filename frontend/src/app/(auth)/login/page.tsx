'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { getUserId, handleLogin } from "@/app/lib/actions";
import Link from "next/link";
import "../../styles/style.css";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submitLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const response = await apiService.postWithoutToken('/api/auth/login/', JSON.stringify(formData));
      //console.log(response);

      if (response.access) {
        handleLogin(response.user.pk, response.access, response.refresh);

        const userId = await getUserId();
        const res = await apiService.get(`/api/ats/${userId}/is-exist`);

        if (res.success) {
          router.push(`/resume-analysis`);
        } else {
          router.push('/resume-upload');
        }
      } else {
        handleErrors(response);
      }
    } catch (error) {
      setError("A network error occurred. Please try again.");
    }
  };

  const handleErrors = (response: any) => {
    if (!response || typeof response !== "object") {
      setError("An unknown error occurred.");
      return;
    }
  
    // Prioritize specific error fields
    if (response.non_field_errors && response.non_field_errors.length > 0) {
      setError(response.non_field_errors[0]);
    } else if (response.detail) {
      setError(response.detail);
    } else if (response.email && Array.isArray(response.email)) {
      setError(response.email[0]);
    } else if (response.password && Array.isArray(response.password)) {
      setError(response.password[0]);
    } else {
      // Fallback for unknown error structures
      setError("An unknown error occurred. Please try again.");
    }
  };
  

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Login to your account</h1>
      </div>
      <form onSubmit={submitLogin}>
        <div className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              className="form-input w-full py-2"
              type="password"
              autoComplete="on"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]"
          >
            Log In
          </button>
        </div>

        {error && (
          <div
            className="mt-3 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}
      </form>

      <div className="mt-3 mb-3 text-center text-sm italic text-gray-400">Or</div>
      <button className="btn w-full bg-white border border-gray-300 text-gray-700 font-medium shadow-sm hover:bg-gray-100 hover:shadow-md"
      onClick={()=>signIn('google')}>
        <span className="flex items-center justify-center">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google logo"
            className="h-5 w-5 mr-2"
          />
          Continue with Google
        </span>
      </button>
      <div className="mt-6 text-center">
        <Link
          className="text-sm text-gray-700 underline hover:no-underline"
          href="/reset-password"
        >
          Forgot password
        </Link>
      </div>
    </>
  );
}
