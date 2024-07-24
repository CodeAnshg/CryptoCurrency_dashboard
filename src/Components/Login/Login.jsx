import React, { useState } from 'react';
import './login.css';


const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleModal = () => setShowModal(!showModal);
  const switchMode = () => setIsLogin(!isLogin);

  return (
    <div className="page-container">
      <button className="open-modal-btn" onClick={toggleModal}>
        {isLogin ? 'Login' : 'Sign Up'}
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={toggleModal}>&times;</span>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form>
              <input type="text" className="login-input" placeholder="Username" required />
              <input type="password" className="login-input" placeholder="Password" required />
              {!isLogin && <input type="email" className="login-input" placeholder="Email" required />}
              <button type="submit" className="login-btn">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <p>
              {isLogin ? 'Don’t have an account? ' : 'Already have an account? '}
              <button className="switch-btn" onClick={switchMode}>
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
