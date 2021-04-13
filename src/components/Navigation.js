import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Data
import { authSelectors } from '../redux/authorization';

const styles = {
  link: {
    display: 'inline-block',
    textDecoration: 'none',
    padding: 12,
    fontWeight: 700,
    color: '#2A363B',
  },
  activeLink: {
    color: '#E84A5F',
  },
};

const Navigation = ({ isAuthenticated }) => (
  <nav>
    <NavLink to="/" exact style={styles.link} activeStyle={styles.activeLink}>
      Главная
    </NavLink>

    {/* рендер по условию, чтобы страница Заметки не отображалась вообще, если пользователь незалогинен */}
    {isAuthenticated && (
      <NavLink
        to="/todos"
        exact
        style={styles.link}
        activeStyle={styles.activeLink}
      >
        Заметки
      </NavLink>
    )}
  </nav>
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Navigation);