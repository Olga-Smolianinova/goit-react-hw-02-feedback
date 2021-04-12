import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

//Data
import { authOperations } from './redux/authorization';

// Pages
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TodosPage from './pages/TodosPage';

// Components
import Container from './components/Container';
import AppBar from './components/AppBar';

class App extends Component {
  //ЖИЗНЕННЫЕ ЦИКЛЫ
  componentDidMount() {
    //вызов onGetCurrentUser, в operations прописана логика  для того, чтобы сохранить текущего пользователя, а не выполнять логизацию каждый раз после обновления страницы; 1) сохраняем token в local storage и получаем к нему доступ через getState
    this.props.onGetCurrentUser();
  }

  render() {
    return (
      // <>
      <Container>
        <AppBar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/todos" component={TodosPage} />
        </Switch>
      </Container>
      // </>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
