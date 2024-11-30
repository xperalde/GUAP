import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import stylesBtn from '../../../component/modal/scss/btn.module.css'

const Filter = ({ styles }) => {
  const [formData, setFormData] = useState({
    selectedSpecialization: [], // Список выбранных специализаций
    specialization: [], // Доступные специализации
    selectedSkills: [], // Список выбранных навыков
    skills: [], // Доступные навыки
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckboxChange = (e, field) => {
    const { id } = e.target;
    const selectedValues = formData[field];
    if (selectedValues.includes(id)) {
      setFormData({
        ...formData,
        [field]: selectedValues.filter((value) => value !== id),
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...selectedValues, id],
      });
    }
  };

  // Используем useEffect для имитации запроса к бэкенду
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Мок-данные для специализаций
        const mockSpecializations = [
          'Программирование',
          'Анализ данных',
          'Кибербезопасность',
          'Искусственный интеллект',
          'Машинное обучение',
        ];

        // Мок-данные для навыков
        const mockSkills = [
          'JavaScript',
          'Python',
          'SQL',
          'React',
          'Node.js',
          'Data Analysis',
        ];

        // Имитация задержки при получении данных
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Устанавливаем данные из мок-данных
        setFormData((prevData) => ({
          ...prevData,
          specialization: mockSpecializations,
          skills: mockSkills,
        }));
      } catch (error) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей, запрос выполняется только один раз

  // Если данные загружаются, показываем индикатор загрузки
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если произошла ошибка, отображаем сообщение об ошибке
  if (error) {
    return <div>{error}</div>;
  }

  return (
<details className={styles.filterDetails}>
  <summary className={styles.article__DropDownContainer}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>Фильтр</p>
    </div>
    <IoIosArrowDown className={styles.arrowIcon} size={25} />
  </summary>
  <fieldset id="skills" className={styles.form__containerCheckbox}>
    {formData.skills.map((skill, index) => (
      <React.Fragment key={index}>
        <input
          hidden
          id={skill}
          type="checkbox"
          checked={formData.selectedSkills.includes(skill)}
          onChange={(e) => handleCheckboxChange(e, 'selectedSkills')}
        />
        <label
          className={`${styles.tagCheckbox} ${
            formData.selectedSkills.includes(skill) ? styles.tagCheckboxActive : ''
          }`}
          htmlFor={skill}
        >
          {skill}
        </label>
      </React.Fragment>
    ))}
  </fieldset>
  <fieldset id="specialization" className={styles.form__containerCheckbox}>
    {formData.specialization.map((spec, index) => (
      <React.Fragment key={index}>
        <input
          hidden
          id={spec}
          type="checkbox"
          checked={formData.selectedSpecialization.includes(spec)}
          onChange={(e) => handleCheckboxChange(e, 'selectedSpecialization')}
        />
        <label
          className={`${styles.tagCheckbox} ${
            formData.selectedSpecialization.includes(spec) ? styles.tagCheckboxActive : ''
          }`}
          htmlFor={spec}
        >
          {spec}
        </label>
      </React.Fragment>
    ))}
  </fieldset>
  <button className={stylesBtn.closeButton} type="button">
    Выполнить поиск практикантов <span style={{fontSize:'10px'}}>(пока не работает)</span>
  </button>
</details>
  ); 
};

export const SearchEmployees = ({ styles }) => {
  return (
    <article className={styles.article__container}>
      <p className={styles.article__title}>Поиск подходящих специалистов</p>
      <Filter styles={styles} />
    </article>
  );
};