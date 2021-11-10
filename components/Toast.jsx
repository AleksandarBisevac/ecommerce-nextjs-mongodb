import React from 'react';

function Toast({ msg, handleShow, bgColor }) {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: '5px', right: '5px', zIndex: 9, minWidth: '280px' }}
      aria-live='assertive'
      aria-atomic='true'
    >
      <div className={`toast-header ${bgColor} text-light`}>
        <strong className='text-center text-light'>{msg?.title}</strong>
        <button
          type='button'
          className='btn ms-auto mb-1 text-light close'
          data-dismiss='toast'
          aria-label='Close'
          onClick={handleShow}
        >
          x
        </button>
      </div>
      <div className='toast-body fw-bold'>{msg?.msg}</div>
    </div>
  );
}

export default Toast;
