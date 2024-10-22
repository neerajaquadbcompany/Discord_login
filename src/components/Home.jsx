
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link} from 'react-router-dom';
import { REACT_APP_END_POINT } from '../util/variable';

const Home = () => {
    
  const { user } = useContext(AuthContext);
  

  return (
    <div className='flex flex-col items-center gap-7 mt-6 justify-center'>
        
      <div className='text-white text-2xl font-semibold'>Discord Login</div>
      {!user ? (
        <Link to={`${REACT_APP_END_POINT}/api/discord`} className='text-white  bg-purple-600 py-2 px-6 font-semibold rounded-md'>
        <button>Login </button>
      </Link>
      ) : (
        <p className='text-white text-xl'>Welcome, {user.username}! <a href="/dashboard" className='bg-purple-600 py-2 px-6 font-semibold rounded-md text-white'>Go to Dashboard</a></p>
      )}
    </div>
  );
};

export default Home;
