import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import valid from '.././utils/valid';

function Register() {
  const initialState = { name: '', email: '', password: '', cf_password: '' };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) {
      console.log(errMsg);
    }
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
