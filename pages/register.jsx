import Head from 'next/head';
import Link from 'next/link';
import { useState, useContext } from 'react';
import valid from '.././utils/valid';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';

function Register() {
  const initialState = { name: '', email: '', password: '', cf_password: '' };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;

  const [state, dispatch] = useContext(DataContext);

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) {
      return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
    }
    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    const res = await postData('auth/register', userData);
    if (res.err) {
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    }
    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
  };

  return (
    <>
      <Head>
        <title>Register Page</title>
      </Head>
      <div>
        <form
          className='mx-auto my-4'
          style={{ maxWidth: '500px' }}
          onSubmit={handleSubmit}
        >
          <div className='form-group mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChangeInputHandler}
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              name='email'
              value={email}
              onChange={onChangeInputHandler}
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='inputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='inputPassword1'
              name='password'
              value={password}
              onChange={onChangeInputHandler}
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='inputPassword2' className='form-label'>
              Confirm password
            </label>
            <input
              type='password'
              className='form-control'
              id='inputPassword2'
              name='cf_password'
              value={cf_password}
              onChange={onChangeInputHandler}
            />
          </div>

          <button type='submit' className='btn btn-dark w-100'>
            Register
          </button>

          <p className='text-center my-4'>
            {'Already have an account? Sign in '}
            <Link href='/signin'>
              <a style={{ color: 'crimson' }}>{'here.'}</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
