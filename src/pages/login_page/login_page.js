import React from 'react'
import logo from '../../image/logo.svg'
import styles from './login_page.module.css'
import { Main } from './main'
const Header = () => {
	return (
		<header className={styles.header__loginPage}>
			<img className={styles.header__Logo} src={logo} alt='Logo GUAP'></img>
			<p className={styles.header__title}>ГУАП.Практика</p>
				<p className={styles.header__content}>
				Производственная практика за пару кликов
				</p>
		</header>
	)
 };
 
const Footer = () => {
	return(
		<footer className={styles.footer__loginPage}>
			  <p className={styles.footer__text}>
				Сервис для поиска летней производственной практики, ГУАП, 2024
				</p>
		</footer>
	)
};
export const LoginPage = () => {
	return (
		<div className={styles.styleBackground}>
			<div className={styles.styleBackgroundForm}>
				<Header/>
				<Main styles={styles}/>
				<Footer/>
		</div>
		</div>
		
	)
};