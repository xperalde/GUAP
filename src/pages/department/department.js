import React from 'react'
import { Header } from '../../component/header/header'
import { SampleStudents } from './articles/sampleStudents.jsx'
import { Statistics } from './articles/statisticsForDepartment.jsx'
import styles from './department.module.css'
export const Department = () => {
	return(
		<>
			<Header/>
			<section className={styles.section__container}>
				<SampleStudents styles={styles}/>
				<Statistics styles={styles}/>
			</section>
		</>
	)
}