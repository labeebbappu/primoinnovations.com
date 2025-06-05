"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      className="btn btn-primary w-full" 
      disabled={pending} 
      type="submit"
    >
      {pending ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        "Login"
      )}
    </button>
  );
}

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <p className="text-center text-base-content/70">Enter your email and password to login to your account</p>
            
            <form action={loginAction} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue="joe@jo.com"
                  placeholder="m@example.com"
                  className="input input-bordered"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  defaultValue="hello"
                  className="input input-bordered"
                  required
                />
              </div>

              <SubmitButton />

              <div className="text-center mt-4">
                <Link
                  href="/intro/home"
                  className="link link-primary hover:link-secondary"
                >
                  Home
                </Link>
              </div>
            </form>

            {state?.errors?.email && (
              <div className="alert alert-error mt-4">
                <span>Email: {state.errors.email}</span>
              </div>
            )}
            {state?.errors?.password && (
              <div className="alert alert-error mt-4">
                <span>Password: {state.errors.password}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
