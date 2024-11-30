import React, { useEffect, useState } from 'react'

// Моковые данные для отображения, если нет бэкенда
const mockData = [
  { name: "Компания А", statistics: "20/15" },
  { name: "Компания Б", statistics: "35/30" },
  { name: "Компания В", statistics: "50/45" },
];

export const Statistics = ({ styles }) => {
  const [companyData, setCompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Имитация отсутствующего ответа от бэкенда:
        throw new Error('Бэкенд не подключен');

        // Код ниже будет выполняться, если подключить бэкенд
        // const response = await fetch('/api/company-statistics');
        // if (!response.ok) {
        //   throw new Error('Ошибка загрузки данных');
        // }
        // const data = await response.json();
        // setCompanyData(data.length > 0 ? data : []);
        // setError(data.length === 0 ? 'Данные не найдены' : null);
      } catch (err) {
        console.error(err);
        // Устанавливаем данные из mockData при ошибке загрузки
        setCompanyData(mockData);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  return (
    <article className={styles.article__container}>
      <div className={styles.article__titleStatistic}>
        <p>Информация по партнерам</p>
        <p>Предложений отправлено/принято</p>
      </div>

      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        companyData.map((company, index) => (
          <div key={index} className={styles.article__companyContainer}>
            <p>{company.name}</p>
            <p className={styles.article__companyStatistic}>{company.statistics}</p>
          </div>
        ))
      )}
    </article>
  );
};