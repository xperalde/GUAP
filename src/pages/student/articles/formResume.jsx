import React, { useEffect, useState } from 'react'

export const FormResume = ({styles}) => {
  const ContainerBlock = (status) => {
    let ContainerBlockStorage = {};
    if (status === true) {
      ContainerBlockStorage = {
        text: 'Ваше резюме доступно компаниям партнеров',
        style: { 'backgroundColor': 'rgb(0, 154, 73)' },
        text_btn: 'Редактировать',
      };
    } else if (status === false) {
      ContainerBlockStorage = {
        text: 'Заполните резюме, чтобы привлечь внимание компаний партнеров',
        style: { 'backgroundColor': 'rgb(231, 15, 71)' },
        text_btn: 'Заполнить',
      };
    }
    return ContainerBlockStorage;
  };
  const [formData, setFormData] = useState({
    departments: [],
    conferences: '',
    projects: '',
    skills: [],
    selectedSkills: [],
    specialization: [],
    selectedSpecialization: [],
    additionalSpecialization: '',
    additionalInfo: '',
    isDataFilled: false // Флаг заполненности данных теперь будет приходить с бэкенда
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch data from backend when component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/form-options'); // Укажите свой API endpoint
        const data = await response.json();

        const defaultData = {
          departments: ["Кафедра аэрокосмических компьютерных систем"],
          skills: ["Git", "Cpp", "C#"],
          specialization: ["Разработка приборов", "Программирование"],
          conferences: '',
          projects: '',
          selectedSkills: [],
          selectedSpecialization: [],
          additionalSpecialization: '',
          additionalInfo: '',
          isDataFilled: false // Заглушка для флага заполненности
        };

        setFormData({
          departments: data?.departments?.length ? data.departments : defaultData.departments,
          skills: data?.skills?.length ? data.skills : defaultData.skills,
          specialization: data?.specialization?.length ? data.specialization : defaultData.specialization,
          conferences: data?.conferences || defaultData.conferences,
          projects: data?.projects || defaultData.projects,
          selectedSkills: data?.selectedSkills || defaultData.selectedSkills,
          selectedSpecialization: data?.selectedSpecialization || defaultData.selectedSpecialization,
          additionalSpecialization: data?.additionalSpecialization || defaultData.additionalSpecialization,
          additionalInfo: data?.additionalInfo || defaultData.additionalInfo,
          isDataFilled: data?.isDataFilled !== undefined ? data.isDataFilled : defaultData.isDataFilled // Флаг, если он есть в ответе, иначе false
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setFormData((prevState) => ({
          ...prevState,
          departments: ["Кафедра аэрокосмических компьютерных систем"],
          skills: ["Git", "Cpp", "C#"],
          specialization: ["Разработка приборов", "Программирование"],
          isDataFilled: false // Устанавливаем false, если данные не удалось загрузить
        }));
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('Форма успешно отправлена:', result);
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };

  const ContainerBlockStorage = ContainerBlock(formData.isDataFilled);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className={styles.article__containerResume}>
        <div style={ContainerBlockStorage.style} className={styles.article__containerBlock}>
          <p className={styles.block__text}>{ContainerBlockStorage.text}</p>
          <button className={styles.block_btn} type='button' onClick={handleExpandClick}>
            {ContainerBlockStorage.text_btn}
          </button>
        </div>
        <form className={`${styles.main__formResume} ${isExpanded ? styles.expanded : ''}`} onSubmit={handleSubmit}>
          <label className={styles.form__fieldTitle} htmlFor='department'>Кафедра</label>
          <select className={styles.form__dropDown} id='department' onChange={handleInputChange}>
            {formData.departments.map((department, index) => (
              <option key={index} value={department}>{department}</option>
            ))}
          </select>

          <label className={styles.form__fieldTitle} htmlFor="conferences">Участие в конференциях</label>
          <textarea className={styles.form__fieldToFill} id='conferences' onChange={handleInputChange} value={formData.conferences}/>

          <label className={styles.form__fieldTitle} htmlFor="projects">Свои пет-проекты (ссылка + краткое описание)</label>
          <textarea className={styles.form__fieldToFill} id='projects' onChange={handleInputChange} value={formData.projects}/>

          <label className={styles.form__fieldTitle} htmlFor="skills">Технологии и программные комплексы, в которых вы разбираетесь на продвинутом уровне:</label>
          <fieldset id='skills' className={styles.form__containerCheckbox}>
            {formData.skills.map((skill, index) => (
              <React.Fragment key={index}>
                <input
                  hidden
                  id={skill}
                  type="checkbox"
                  checked={formData.selectedSkills.includes(skill)}
                  onChange={(e) => handleCheckboxChange(e, 'selectedSkills')}
                />
                <label className={`${styles.tagCheckbox} ${
                formData.selectedSkills.includes(skill) ? styles.tagCheckboxActive : ''
              }`} htmlFor={skill}>{skill}</label>
              </React.Fragment>
            ))}
          </fieldset>

          <label className={styles.form__fieldTitle} htmlFor="specialization">Желаемая функциональная специализация:</label>
          <fieldset id='specialization' className={styles.form__containerCheckbox}>
            {formData.specialization.map((spec, index) => (
              <React.Fragment key={index}>
							<input
								hidden
								id={spec}
								type="checkbox"
								checked={formData.selectedSpecialization.includes(spec)}
								onChange={(e) => handleCheckboxChange(e, 'selectedSpecialization')}
							/>
							<label className={`${styles.tagCheckbox} ${
                formData.selectedSpecialization.includes(spec) ? styles.tagCheckboxActive : ''
              }`} htmlFor={spec}>{spec}</label>
						</React.Fragment>
            ))}
          </fieldset>

          <label className={styles.form__fieldTitle} htmlFor="additionalSpecialization">Другая специализация (кратко опишите, если в предыдущем пункте выбрали "Другое"):</label>
          <textarea className={styles.form__fieldToFill} id='additionalSpecialization' onChange={handleInputChange} value={formData.additionalSpecialization}/>

          <label className={styles.form__fieldTitle} htmlFor="additionalInfo">Дополнительно о себе (важные детали, не упомянутые ранее):</label>
          <textarea className={styles.form__fieldToFill} id='additionalInfo' onChange={handleInputChange} value={formData.additionalInfo}/>
          
          <button className={styles.form__buttonInteraction} type='submit'>Сохранить</button>
          <div className={styles.form__line}></div>
        </form>
      </article>
  )
};
