import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Style.css';

function Login() {
  const [user, setUser] = useState({ name: "", email: "", password: "", repassword: "" });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const updateUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const sendData = async () => {
    if (!isLoginMode && user.password !== user.repassword) {
      alert("Passwords do not match!");
      return;
    }

    let payload;
    if (isLoginMode) {
      payload = {
        Username: user.name,
        Password: user.password
      };
    } else {
      payload = {
        Username: user.name,
        Useremail: user.email,
        Password: user.password
      };
    }

    const endpoint = isLoginMode ? 'login' : 'register';

    try {
      const response = await fetch(`http://localhost:5000/user/${endpoint}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log(result);

      if (isLoginMode) {
        if (result.mgs === 200) {
          alert("Login successful!");
          localStorage.setItem('token', result.token);
          navigate("/");
        } else {
          alert(result.msg || "Login failed!");
        }
      } else {
        if (result.success) {
          alert("Registration successful! You can now log in.");
          setIsLoginMode(true);
        } else {
          alert(result.msg || "Registration failed!");
        }
      }

    } catch (err) {
      console.error("Server error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className='login'>
      <div className='icon'>
        <FontAwesomeIcon icon={faMoneyBillTrendUp} beat size="2xl" style={{ color: "#5936c4" }} />
        <h3>Acoonts</h3>
      </div>

      <div className='formClass'>
        <form onSubmit={(e) => { e.preventDefault(); sendData(); }}>
          {!isLoginMode && (
            <>
              <input
                type='text'
                placeholder='Enter a Username'
                value={user.name}
                name='name'
                onChange={updateUser}
              /><br />
              <input
                type='email'
                placeholder='Enter your Email'
                value={user.email}
                name='email'
                onChange={updateUser}
              /><br />
            </>
          )}

          {isLoginMode && (
            <input
              type='text'
              placeholder='Enter Username or Email'
              value={user.name}
              name='name'
              onChange={updateUser}
            />
          )}<br />

          <input
            type={showPass ? 'text' : 'password'}
            placeholder='Enter Password'
            value={user.password}
            name='password'
            onChange={updateUser}
          />
          <label className='eye' onClick={() => setShowPass(prev => !prev)}>
            <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
          </label><br />

          {!isLoginMode && (
            <input
              type={showPass ? 'text' : 'password'}
              placeholder='Re-enter Password'
              value={user.repassword}
              name='repassword'
              onChange={updateUser}
            />
          )}

          <button type='submit'>Submit</button>
        </form>

        <button onClick={() => setIsLoginMode(prev => !prev)} className='loginquestion'>
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        </button>
      </div>
    </div>
  );
}

export default Login;
