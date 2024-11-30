import React from 'react'
import { Header } from '../../component/header/header'
import { FormResume } from './articles/formResume.jsx'
import { OffersCompanies } from './articles/offers.jsx'
import styles from './student.module.css'

export const Student = () => {
	return(
			<>
			<Header/>
			<section className={styles.section__containerContent}>
      	<FormResume styles={styles}/>
      	<OffersCompanies styles={styles} />
    	</section>
			</>
	)
};
