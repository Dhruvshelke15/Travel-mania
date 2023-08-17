import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-48">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto">
          <input type="text" placeholder="John Doe" />
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="Your password" />
          <button className="primary" type="submit">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?{' '}
            <Link className="underline text" to={'/login'}>
              Log in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
