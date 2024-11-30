import React, { useState } from 'react'
import { Modal } from '../modal/modal.jsx'
import styles from './studentList.module.css'
export const StudentList = ({ students, status }) => {
  const [isModalOpen, setModalOpen] = useState(false); // Состояние модального окна
  const [studentData, setStudentData] = useState(null); // Данные выбранного студента
  const [loading, setLoading] = useState(false); // Индикатор загрузки данных

  const fetchStudentData = async (studentId) => {
    setLoading(true); // Устанавливаем состояние загрузки
    try {
      // Имитируем запрос к серверу
      const response = await fetch(`/api/student/${studentId}`); // Укажите правильный URL для вашего API
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных студента');
      }
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error(error);
      setStudentData(null);
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  const handleShowModal = async (studentId) => {
    setModalOpen(true);
    await fetchStudentData(studentId); // Запрашиваем данные студента
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setStudentData(null); // Очищаем данные студента при закрытии
  };

  return (
    <>
      <ul role="definition">
        {students.map((student) => (
          <li key={student.id} className={styles.li__studentItem}>
            <div>
              <p>
                {student.fullName}, {student.course} курс
              </p>
              <p>{student.department}</p>
            </div>
            <div className={styles.li__container}>
              <button
                className={`${styles.cardBase} ${styles.li__resumeBtn}`}
                type="button"
                onClick={() => handleShowModal(student.id)} // Передаем ID студента
              >
                Резюме
              </button>
              {status === 'sent' && (
                <div
                  className={styles.cardBase}
                  style={{ backgroundColor: 'rgb(0,190,243)', color: 'white' }}
                >
                  Приглашение отправлено
                </div>
              )}
              {status === 'accepted' && (
                <div
                  className={styles.cardBase}
                  style={{ backgroundColor: 'rgb(35,89,55)', color: 'white' }}
                >
                  Приглашение принято
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {/* Подключаем модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        studentData={studentData}
        isLoading={loading} // Передаем состояние загрузки в модальное окно
      />
    </>
  );
};