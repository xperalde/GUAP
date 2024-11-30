import React, { useState } from 'react'
import { RiErrorWarningFill } from "react-icons/ri"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
const ErrorMessage = ({ message ,styles}) => {
  return (
    <div className={styles.errorMessage}>
      <RiErrorWarningFill style={{paddingRight:'7px'}} />
      {message}
    </div>
  );
};
export const Main = ({styles}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Получаем функцию для входа

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        const userType = data.userType || null; //
        const userName = data.userName || 'Гость'; //

        login(userName); // Устанавливаем пользователя в контексте
        
        switch (userType) {
          case 'admin':
            navigate('/admin', { state: { userName } }); //
            break;
          case 'student':
            navigate('/student', { state: { userName } });//
            break;
          case 'teacher':
            navigate('/teacher', { state: { userName } });//
            break;
          default:
            setErrorMessage('Неизвестный тип пользователя');
        }
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Неверный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка сервера:', error);

      // Заглушка для случая, когда сервер недоступен
      if (username === 'partner' && password === 'partner'){
        setErrorMessage('');
        navigate('/partner', { state: { userName: 'partner' } });
        login('partner');
      } else if ( (username === 'department' && password === 'department')) {
        setErrorMessage('');
        navigate('/department', { state: { userName: 'department' } });
        login('department');
      }else if ( (username === 'student' && password === 'student')) {
        setErrorMessage('');
        navigate('/student', { state: { userName: 'student' } });
        login('student');
      }else {
        setErrorMessage('Неверный логин или пароль');
      }
    }
  };

  return (
    <main className={styles.main__loginPage}>
      <form className={styles.main__loginForm} onSubmit={handleSubmit}>
        <input
          placeholder='Логин'
          type='text'
          className={styles.form__inputLine}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Пароль'
          className={styles.form__inputLine}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
     {errorMessage && <ErrorMessage styles={styles} message={errorMessage} />}
        <button type='submit' className={styles.form__button}>Войти</button>
      </form>
    </main>
  );
};