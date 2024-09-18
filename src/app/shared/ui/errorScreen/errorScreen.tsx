import React from 'react';

import styles from './errorScreen.module.scss';

export const ErrorScreen: React.FC = () => {
  return (
    <div className={styles.ErrorScreen}>
      <div className={styles.ErrorScreenTitle}> Что-то пошло не так</div>
      <div className={styles.ErrorScreenDescription}>
        {' '}
        Мы не смогли загрузить нужный вам запрос.
        <br /> Проверьте соединение с интернетом и попробуйте обновить странций
      </div>
    </div>
  );
};
