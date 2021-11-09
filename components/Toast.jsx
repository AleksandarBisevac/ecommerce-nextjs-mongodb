import React from 'react';

function Toast() {
  return (
    <div
      className='toast'
      role='alert'
      aria-live='assertive'
      aria-atomic='true'
    >
      <div className='toast-header'>
        <strong className='mr-auto'>Bootstrap</strong>
        <small className='text-muted'>11 mins ago</small>
        <button
          type='button'
          className='ml-2 mb-1 close'
          data-dismiss='toast'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div className='toast-body'>Hello, world! This is a toast message.</div>
    </div>
  );
}

export default Toast;
