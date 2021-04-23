import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Data
import { authSelectors } from '../redux/authorization';

// вместо компонента Route в App.js будет другой Приватный Route. Это нужно для того, чтобы при переходе на какую-либо страницу приложения ее содержимое  НЕ ДОЛЖНО отрисовываться, если пользователь незалогинен

// PrivatePoute будет получать те же данные, что и обычный Route в App.js, но будет добавлять соответствущие условия и проверки, чтобы незалогиненый пользователь не мог перейти на страницу приложения, предназначенную только для залогиненных

//  Если маршрут приватный и пользователь залогинен, рендерит компонент
//  В противном случае рендерит Redirect на /login

// c React Router hooks
export default function PrivateRoute({
  // все props из App.js
  isAuthenticated,
  redirectTo,
  children,
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}

// без React Router hooks
// const PrivateRoute = ({
//   // все props из App.js
//   component: Component,
//   isAuthenticated,
//   redirectTo,
//   ...routeProps
// }) => (
//   <Route
//     {...routeProps}
//     //эти props - это props Router (math, location etc.). Прокидываем вручную
//     render={props =>
//       isAuthenticated ? <Component {...props} /> : <Redirect to={redirectTo} />
//     }
//   />
// );

// const mapStateToProps = state => ({
//   isAuthenticated: authSelectors.getIsAuthenticated(state),
// });

// export default connect(mapStateToProps)(PrivateRoute);
