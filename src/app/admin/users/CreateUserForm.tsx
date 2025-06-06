'use client';

import { useState } from 'react';
import { createUser } from './actions';
import { useRouter } from 'next/navigation';

export default function CreateUserForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData(event.currentTarget);
      await createUser(formData);
      router.refresh();
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-control w-full max-w-2xl gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-control w-full">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="input input-bordered w-full"
          />
        </div>
      </div>
      {error && (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <button 
        type="submit" 
        className="btn btn-primary w-full md:w-auto"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner"></span>
            Creating...
          </>
        ) : (
          'Create User'
        )}
      </button>
    </form>
  );
}