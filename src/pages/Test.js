/* для тренировки React Router Hooks */

/*При такой записи внутрь Route component={Test} вместре с компонентом передаются и все пропы. В React Router 5 используется уже просто композиция. Ставим <Test/> между откр. и закр. Route. При такой записи автоматически пропы не передаются, их нужно забирать вручную. И можно забрать только то, что нужно. И это делается с помощью React Router Hooks*/

import React from 'react';
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

const Test = () => {
  const history = useHistory();
  console.log('history:', history);

  const location = useLocation();
  console.log('location:', location);

  // useParams - пример использования, например, когда нужно отрисовать стриницу одного фильма по id
  const params = useParams();
  console.log('params:', params);

  // useRouteMatch - когда нужно получить объект match (c path, url и т.д). Внутрь указываем путь, на который нужно провести match (он может быть как текущий так и нет). Используем когда нужно получить вложенную навигацию и вложенные рауты, в который передаем текущий url
  //   const match = useRouteMatch('/test/:testId');//неудобно, т.к. вручную нужно прописывать и дублировать тот раут, сохранять или записывать в отдельных переменных, на котором находишься
  const match = useRouteMatch();
  console.log('match:', match);

  return <h1>Test</h1>;
};

export default Test;
