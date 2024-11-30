import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { StudentList } from '../../../component/studentList/studentList'

const PartnerSent = ({ styles }) => {
  const [students, setStudents] = useState([]); // Состояние для списка студентов
  const [error, setError] = useState(null); // Состояние для ошибок

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        // Мок-данные для тестирования
        const mockData = [
          { id: 1, fullName: "Иван Иванов", course: 3, department: "Кафедра информатики" },
          { id: 2, fullName: "Мария Смирнова", course: 2, department: "Кафедра математики" },
          { id: 3, fullName: "Алексей Кузнецов", course: 4, department: "Кафедра физики" },
        ];

        // Имитация задержки
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Устанавливаем данные из мока
        setStudents(mockData);
      } catch (error) {
        console.error('Ошибка при запросе данных студентов:', error);
        setError('Не удалось загрузить данные студентов');
      }
    };

    fetchStudentsData();
  }, []);

  return (
    <details className={styles.filterDetails}>
  <summary className={styles.article__DropDownContainer}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>Отправлено</p>
      <p className={styles.div__quantity}>{students.length}</p>
    </div>
    <IoIosArrowDown className={styles.arrowIcon} size={25} />
  </summary>
  {error ? (
    <p className={styles.errorMessage}>{error}</p>
  ) : students.length > 0 ? (
    <StudentList students={students} styles={styles} status="sent" />
  ) : (
    <p>Загрузка данных...</p>
  )}
</details>
  );
};

const PartnerAccepted = ({ styles }) => {
  const [students, setStudents] = useState([]); // Состояние для списка студентов
  const [error, setError] = useState(null); // Состояние для ошибок

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        // Мок-данные для тестирования
        const mockData = [
          { id: 1, fullName: "Иван Иванов", course: 3, department: "Кафедра информатики" },
          { id: 2, fullName: "Мария Смирнова", course: 2, department: "Кафедра математики" },
          { id: 3, fullName: "Алексей Кузнецов", course: 4, department: "Кафедра физики" },
					{ id: 4, fullName: "Роман Романов", course: 4, department: "Кафедра физики" },
        ];

        // Имитация задержки
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Устанавливаем данные из мока
        setStudents(mockData);
      } catch (error) {
        console.error('Ошибка при запросе данных студентов:', error);
        setError('Не удалось загрузить данные студентов');
      }
    };

    fetchStudentsData();
  }, []);

  return (
    <details className={styles.filterDetails}>
  <summary className={styles.article__DropDownContainer}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>Принято</p>
      <p className={styles.div__quantity}>{students.length}</p>
    </div>
    <IoIosArrowDown className={styles.arrowIcon} size={25} />
  </summary>
  {error ? (
    <p className={styles.errorMessage}>{error}</p>
  ) : students.length > 0 ? (
    <StudentList students={students} styles={styles} status="accepted" />
  ) : (
    <p>Загрузка данных...</p>
  )}
</details>
  );
};

export const StatisticsPartner = ({ styles }) => {
  return (
    <article className={styles.article__container}>
      <p className={styles.article__title}>Статистика по предложениям</p>
      <PartnerSent styles={styles} />
      <PartnerAccepted styles={styles} />
    </article>
  );
};