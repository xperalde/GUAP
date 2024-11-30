import React from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../../image/logo.svg'
import styles from './_header.module.css'

export const Header = () => {
  const location = useLocation(); // Получаем объект location
  const userName = location.state?.userName; // Достаём userName из state


  return (
      <header className={styles.header__container}>
        <div className={styles.containerLogoName}>
          <img className={styles.header__logo} src={logo} alt='Логотип' />
          <p className={styles.header__name}>{userName}</p>
        </div>
        <button className={styles.header__exitBtn}>Выйти</button>
      </header>
  );
};