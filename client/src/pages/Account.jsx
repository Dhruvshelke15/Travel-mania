import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Account() {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  function linkClasses(type = null) {
    let classes = 'py-2 px-6';
    if (type == subpage) {
      classes += ' text-white bg-primary rounded-full';
    }
    return classes;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <nav className=" w-full flex justify-center mt-8 gap-2">
        <Link className={linkClasses('profile')} to={'/accounts'}>
          My Profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/accounts/bookings'}>
          My Bookings
        </Link>
        <Link className={linkClasses('places')} to={'/accounts/places'}>
          My accomodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
