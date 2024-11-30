import React from 'react'
import { Header } from '../../component/header/header'
import { SearchEmployees } from './article/searchEmployees.jsx'
import { StatisticsPartner } from './article/statisticsPartner.jsx'
import styles from './partner.module.css'
export const Partner = () => {
	return (
		<>
		<Header/>
			<section className={styles.section__container}>
				<StatisticsPartner styles={styles}/>
				<SearchEmployees styles={styles}/>
			</section>
		</>
		
	)
}