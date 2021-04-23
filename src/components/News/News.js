import React, { useState, useEffect } from 'react';

import axios from 'axios';

// Data
import NewsForm from '../NewsForm';

axios.defaults.headers.common['Authorization'] =
  // 'Bearer 4330ebfabc654a6992c2aa792f3173a3';
  'Bearer 07dcb9f9cd33447ea07750c7b4735236';

const APIfetchArticles = ({
  searchQuery = '',
  currentPage = 1,
  pageSize = 5,
} = {}) => {
  return axios
    .get(
      `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pageSize}&page=${currentPage}`,
    )
    .then(response => response.data.articles);
};

// c React Hooks
export default function News() {
  // useState
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchArticles = () => {
      setIsLoading(true); //отрисовка спиннера пока идет запрос

      return APIfetchArticles({ searchQuery: query, currentPage })
        .then(responseArticles => {
          setArticles(prevArticles => [...prevArticles, ...responseArticles]); //распыляем то что было, и добавляем то, что вернулось в результате http-запроса
        })
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false)); //прекращаем отрисовку спиннера, после удачного http-запроса; //вызваем APIfetchArticles() из шапки файла, в который передаем объект настроек
    };

    fetchArticles();
  }, [currentPage, query]); //чтобы выполнялся запрос каждый раз после отправки формы

  const updatePage = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1); //при отрисовки следующей части результатов увеличиваем currentPage
  };

  // функция для строки поиска
  const onChangeQuery = query => {
    setQuery(query); //что ищем
    setCurrentPage(1); //при новом запросе сбрасываем currentPage снова на 1
    setArticles([]); //при новом запросе снова массив пустой
    setError(null);
  };

  // отображение кнопки Загрузить ещё
  const shouldRenderLoadMoreButton = articles.length > 0 && !isLoading;

  return (
    <>
      {error && <h1>Ой ошибка, всё пропало!!!</h1>}

      <NewsForm onSubmit={onChangeQuery} />

      <ul>
        {articles.map(({ title, url }) => (
          <li key={title}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </li>
        ))}
      </ul>

      {shouldRenderLoadMoreButton && (
        <button type="button" onClick={updatePage}>
          Загрузить ещё
        </button>
      )}

      {isLoading && (
        <p style={{ fontSize: 24, display: 'flex', alignItems: 'center' }}>
          Загружаем...
          <span
            aria-label="Иконка"
            role="img"
            style={{ fontSize: 32, marginLeft: 10 }}
          >
            🧙‍♂️
          </span>
        </p>
      )}
    </>
  );
}

// без React Hooks
// const fetchArticles = ({ searchQuery = '', currentPage = 1, pageSize = 5 }) => {
//   return axios
//     .get(
//       `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pageSize}&page=${currentPage}`,
//     )
//     .then(response => response.data.articles);
// };

// export default class News extends Component {
//   state = {
//     articles: [],
//     currentPage: 1,
//     searchQuery: '',
//     isLoading: false,
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.fetchArticles();
//     }
//   }

//   onChangeQuery = query => {
//     this.setState({
//       searchQuery: query,
//       currentPage: 1,
//       articles: [],
//       error: null,
//     });
//   };

//   fetchArticles = () => {
//     const { currentPage, searchQuery } = this.state;
//     const options = { searchQuery, currentPage };

//     this.setState({ isLoading: true });

//     fetchArticles(options)
//       .then(articles => {
//         this.setState(prevState => ({
//           articles: [...prevState.articles, ...articles],
//           currentPage: prevState.currentPage + 1,
//         }));
//       })
//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   render() {
//     const { articles, isLoading, error } = this.state;
//     const shouldRenderLoadMoreButton = articles.length > 0 && !isLoading;

//     return (
//       <div>
//         {error && <h1>Ой ошибка, всё пропало!!!</h1>}

//         <NewsForm onSubmit={this.onChangeQuery} />

//         <ul>
//           {articles.map(({ title, url }) => (
//             <li key={title}>
//               <a href={url} target="_blank" rel="noopener noreferrer">
//                 {title}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {shouldRenderLoadMoreButton && (
//           <button type="button" onClick={this.fetchArticles}>
//             Загрузить ещё
//           </button>
//         )}

//         {isLoading && (
//           <p style={{ fontSize: 24, display: 'flex', alignItems: 'center' }}>
//             Загружаем...
//             <span
//               aria-label="Иконка"
//               role="img"
//               style={{ fontSize: 32, marginLeft: 10 }}
//             >
//               🧙‍♂️
//             </span>
//           </p>
//         )}
//       </div>
//     );
//   }
// }
