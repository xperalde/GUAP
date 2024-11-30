import React, { useEffect, useState } from 'react'

export const OffersCompanies = ({styles}) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const mockOffers = [
      {
        id: 1,
        name: 'АО "РПКБ"',
        description: 'Разработка программного обеспечения',
        accepted: false,
      },
      {
        id: 2,
        name: 'НТЦ "РИФ"',
        description: 'Разработка радиоэлектронной продукции',
        accepted: true,
      },
    ];

    setTimeout(() => {
      setOffers(mockOffers);
    }, 1000);
  }, []);

  // Функция для отправки статуса на бэкенд (пока симуляция)
  const sendStatusToBackend = async (offerId, status) => {
    try {
      // Симуляция POST/PUT-запроса на бэкенд
      const response = await fetch(`/api/offers/${offerId}`, {
        method: 'POST', // Или PUT, если нужно обновлять данные
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accepted: status }), // Отправляем статус оффера
      });

      if (response.ok) {
        console.log(`Оффер с ID: ${offerId} успешно обновлен на сервере.`);
      } else {
        console.error(`Ошибка обновления оффера с ID: ${offerId}`);
      }
    } catch (error) {
      console.error('Ошибка отправки данных на сервер:', error);
    }
  };

  // Обработчик принятия оффера
  const handleAcceptOffer = async (offerId) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer.id === offerId ? { ...offer, accepted: true } : offer
      )
    );

    // Отправляем обновленный статус принятия оффера на сервер
    await sendStatusToBackend(offerId, true);
  };

  if (offers.length === 0) {
    return <p className={styles.article__noOffers}>Предложений на прохождение производственной практики пока нет</p>;
  }

  return (
    <article className={styles.article__offers}>
      <p className={styles.article__noOffers}>Предложения на прохождение производственной практики:</p>
      {offers.map((offer) => (
        <div
          key={offer.id}
          className={`${styles.article__offerContainer} ${offer.accepted ? styles.article__offerContainer_accepted : ''}`}
        >
          <div className={styles.article__textContainer}>
            <p className={styles.article__offerName}>{offer.name}</p>
            <p className={styles.article__offerDescription}>{offer.description}</p>
          </div>
          
          <button
            type='button'
            onClick={() => handleAcceptOffer(offer.id)}
            disabled={offer.accepted}
            className={styles.block_btn}
          >
            {offer.accepted ? 'Принято' : 'Принять'}
          </button>
        </div>
      ))}
    </article>
  )
};
