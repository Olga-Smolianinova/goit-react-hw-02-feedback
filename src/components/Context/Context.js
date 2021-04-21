// Использовали ReactRouter, Redux, с помощью которых прокидывали данные вглубину потомкам, и могли достучаться до них (router props, redux state). Этот механизм возможен благодаря Контексту

// Контекст - это по сути одна большая глобальная переменная, в которой можно хранить какую-либо информацию и напрямую к ней получать доступ, не прокидывая ее через все Дерево Компонентов

// Удобно использовать, когда в Дереве Компонетов - очень много самих компонентов. Необходимо получить доступ к определенным данным из разных компонентов, для того чтобы не прокидывать вглубину пропы несколько раз. В этом случае делаем Контекст, подписываемся на него и компоненты начинают получать доступ

// Логика работы Контекста прописана в папке context, в которой создан createContext и export оттуда. createContext() - возвращает объект в котором находятся 2 компонента - Consumer и Provider (обертка, которая и делает контекст и значение store передаем через контекст). Часть приложения или все нужно обернуть в этот Provider. А там где мы хотим получить доступ - можно использовать Consumer, но вместо это можно использовать hook useContext

import React, { useContext } from 'react';
import ctx from '../../context/authContext';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  tag: {
    fontSize: 24,
    margin: `0 20px 0 0`,
  },
};

export default function Context() {
  const { user, logIn, logOut } = useContext(ctx);

  return (
    <div style={styles.container}>
      {user ? (
        <>
          <p style={styles.tag}>{user}</p>
          <button type="button" onClick={logOut}>
            Выйти
          </button>
        </>
      ) : (
        <button type="button" onClick={logIn}>
          Войти
        </button>
      )}
    </div>
  );
}
