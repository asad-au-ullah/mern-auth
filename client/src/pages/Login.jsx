import { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          email, name, password
        });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }

      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email, password
        });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.error);
        }

      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-b from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'
        >{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create your account' : 'Log into your account'}</p>

        <form onSubmit={submitHandler}>
          {state === 'Sign Up' ? (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.person_icon} alt="person icon" />
              <input type="text" placeholder='Full Name' name="fullName" id="fullName" required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='bg-transparent outline-none' />
            </div>
          ) : null}

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="mail icon" />
            <input type="email" placeholder='email@example.com' name="email" id="email" required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-transparent outline-none' />
          </div>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="lock icon" />
            <input type="password" placeholder='Password' name="password" id="password" required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-transparent outline-none' />
          </div>
          <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>
          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
            {state}
          </button>

          {state === 'Sign Up' ? (
            <p className='text-gray-400 text-center text-xs mt-4'>
              Already have an account? {' '}
              <span className='text-blue-400 cursor-pointer underline'
                onClick={() => setState('Login')}>Login here</span>
            </p>
          ) : (
            <p className='text-gray-400 text-center text-xs mt-4'>
              Don't have an account? {' '}
              <span className='text-blue-400 cursor-pointer underline'
                onClick={() => setState('Sign Up')}>Signup</span>
            </p>
          )}
        </form>
      </div>

    </div>
  )
}

export default Login;