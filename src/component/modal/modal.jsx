import React, { useEffect, useRef } from 'react'
import styles from './modal.module.css'
import stylesBtn from './scss/btn.module.css'
export const Modal = ({ isOpen, onClose, studentData, isLoading }) => {
  const dialogRef = useRef(null);
	const mockStudent = {
		id: 1,
		fullName: "Иван Иванов",
		course: 3,
		department: "Кафедра информатики",
		skills: ["Программирование", "Работа с базами данных", "React.js"],
	};
	studentData = mockStudent
  // Открытие/закрытие модального окна при изменении `isOpen`
  useEffect(() => {
		console.log('isOpen changed to:', isOpen);
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={styles.modal}>
			<div className={styles.modal__container}>
        <div className={styles.modal__content}>
          {isLoading ? (
            <p>Загрузка данных студента...</p>
          ) : studentData ? (
            <>
              <p><span className={styles.modal__label}>ФИО:</span> {studentData.fullName}</p>
              <p><span className={styles.modal__label}>Курс:</span> {studentData.course}</p>
              <p><span className={styles.modal__label}>Кафедра:</span> {studentData.department}</p>
              <p><span className={styles.modal__label}>Навыки:</span> {studentData.skills?.join(', ') || 'Нет данных'}</p>
            </>
          ) : (
            <p>Данные студента не найдены</p>
          )}
        </div>
				<button type="button" onClick={onClose} className={stylesBtn.closeButton}>
          Закрыть
        </button>
			</div>
    </dialog>
  );
};