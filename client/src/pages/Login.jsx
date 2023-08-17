import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-48">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="Your password" />
          <button className="primary" type="submit">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account?{' '}
            <Link className="underline text" to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
