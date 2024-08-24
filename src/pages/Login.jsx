import React from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';

const Login = () => {
  const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider);
  };

  const signInWithFacebook = () => {
    auth.signInWithPopup(facebookProvider);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <button onClick={signInWithGoogle} className="bg-red-500 text-white p-2 rounded mb-2 w-full">
        Sign in with Google
      </button>
      <button onClick={signInWithFacebook} className="bg-blue-500 text-white p-2 rounded w-full">
        Sign in with Facebook
      </button>
    </div>
  );
};

export default Login;
