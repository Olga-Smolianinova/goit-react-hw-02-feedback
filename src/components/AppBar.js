import React from 'react';
import { connect } from 'react-redux';
import { authSelectors } from '../redux/authorization';

// Components
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import AuthNav from './AuthNav';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #2A363B',
  },
};

//prop { isAuthenticated } - залогиненный или незалогиненный пользователь
const AppBar = ({ isAuthenticated }) => (
  <header style={styles.header}>
    <Navigation />
    {/* рендер по условию - prop {isAuthenticated} - залогиненный или незалогиненный пользователь. В зависимости от этого будет рендерить либо <UserMenu - информация о пользователе /> или <AuthNav  */}
    {isAuthenticated ? <UserMenu /> : <AuthNav />}
  </header>
);

const mapStateToProps = state => ({
  //Проверка состояния логинизации пользователя по token. Когда пользователь незалогинен token=null, когда залогинен и есть token - необходимо, чтобы отрисовывалось UserMenu. Если token есть - то прийдет строка, и при boolen она будет true, если незалогинен - false
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(AppBar);
