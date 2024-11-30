import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const mockData = [
  {
    groupName: "Группа 1141",
    members: [
      { name: "Иван Иванов", offerStatus: "Принято", company: "Компания А" },
      { name: "Мария Петрова", offerStatus: "Заполнено" },
      { name: "Василий Григорьевич", offerStatus: "Приглашен" }
    ]
  },
  {
    groupName: "Группа 1142",
    members: [
      { name: "Сергей Сидоров", offerStatus: "Не заполнено" },
      { name: "Анна Смирнова", offerStatus: "Принято", company: "Компания Б" }
    ]
  }
];

const CompanyDetails = ({ company, styles, onStatusUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  if (!company) return null;

  return (
    <>
      <div className={styles.div__containerDetails}>
        <button type="button" onClick={toggleVisibility} className={styles.div__dDButton}>
          Детали
        </button>
      </div>
      {isVisible && (
        <div className={styles.div__isVisibleCompanies}>
          <div className={styles.div__companyName}>{company}</div>
          <button
            type="button"
            onClick={onStatusUpdate}
            className={styles.div__dDButton}
          >
            Оформить
          </button>
        </div>
      )}
    </>
  );
};

export const SampleStudents = ({ styles }) => {
  const statusClasses = {
    "Не заполнено": { backgroundColor: 'rgb(231, 15, 71)' },
    "Заполнено": { backgroundColor: 'rgb(80, 45, 127)' },
    "Приглашен": { backgroundColor: 'rgb(0,190,243)' },
    "Принято": { backgroundColor: 'rgb(0,154,73)' },
    "Оформлено": { backgroundColor: 'rgb(35,89,55)' }
  };

  const [data, setData] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/groups');
        if (!response.ok) throw new Error("Сервер вернул ошибку");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Ошибка запроса, использую mockData:", error);
        setData(mockData);
      }
    };
    fetchData();
  }, []);

  const updateOfferStatus = (groupIndex, memberIndex) => {
    setData((prevData) =>
      prevData.map((group, gIndex) => {
        if (gIndex === groupIndex) {
          return {
            ...group,
            members: group.members.map((member, mIndex) => {
              if (mIndex === memberIndex) {
                return { ...member, offerStatus: "Оформлено" };
              }
              return member;
            }),
          };
        }
        return group;
      })
    );

    // Отправляем запрос на сервер
    fetch(`/api/update-offer-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ groupIndex, memberIndex, newStatus: "Оформлено" })
    }).catch((error) => {
      console.error("Ошибка при обновлении статуса на сервере:", error);
    });
  };

  const toggleGroup = (index) => {
    setExpandedGroups((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  return (
    <article className={styles.article__container}>
      <p className={styles.article__title}>Информация по группам</p>
      {data.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.article__group}>
          <div
            className={styles.article__nameGroupContainer}
            onClick={() => toggleGroup(groupIndex)}
          >
            <p className={styles.article__nameGroup}>{group.groupName}</p>
            <IoIosArrowDown
              size={25}
              className={`${styles.rotateIcon} ${expandedGroups[groupIndex] ? styles.expanded : ''}`}
            />
          </div>
          <ul className={`${styles.article__memberList} ${expandedGroups[groupIndex] ? styles.expanded : ''}`}>
            {group.members.map((member, memberIndex) => (
              <li key={memberIndex} className={styles.article__peopleContainer}>
                <div className={styles.li__container}>
                  <p>{member.name}</p>
                  <p className={styles.li__name} style={statusClasses[member.offerStatus] || null}>
                    {member.offerStatus}
                  </p>
                </div>
                <CompanyDetails
                  company={member.company}
                  styles={styles}
                  onStatusUpdate={() => updateOfferStatus(groupIndex, memberIndex)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
};