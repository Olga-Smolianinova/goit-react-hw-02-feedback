import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authSelectors } from '../redux/authorization';

/**
 * - Если маршрут ограниченный (т.е. когда пользователь залогинен, он не должен попасть на определенные страницы, например страницы регистрации и логинизации), и пользователь залогинен, рендерит редирект на /todos
 * - В противном случае рендерит компонент
 */
const PublicRoute = ({
  //  // все props из App.js
  component: Component,
  isAuthenticated,
  redirectTo,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    // эти props - это props Router (math, location etc.). Прокидываем вручную
    render={props =>
      // рендер по условию, если пользователь залогинен  && и маршрут ограниченый (restricted), то перенаправление
      isAuthenticated && routeProps.restricted ? (
        <Redirect to={redirectTo} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(PublicRoute);
