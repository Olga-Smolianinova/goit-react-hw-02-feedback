import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

//Data
import { authOperations } from './redux/authorization';

// Pages
// import HomePage from './pages/HomePage';
// import RegisterPage from './pages/RegisterPage';
// import LoginPage from './pages/LoginPage';
// import TodosPage from './pages/TodosPage';

// Components
import Container from './components/Container';
import AppBar from './components/AppBar';

// Routes
import PrivateRoute from './components/PrivateRoute'; //чтобы не отображать содержимое страницы незалогиненному пользователю
import PublicRoute from './components/PublicRoute'; //когда пользователь залогинен, ему не должны отображаться на определенные страницы, например регистрации и логинизации

// Components для тренировки React Hooks
import Counter from './components/Counter';
import Form from './components/Form';
import ColorPicker from './components/ColorPicker';
import Clock from './components/Clock';
// import News from './components/News';
import Context from './components/Context';

const HomePage = lazy(() => import('./pages/HomePage'));

const RegisterPage = lazy(() => import('./pages/RegisterPage'));

const LoginPage = lazy(() => import('./pages/LoginPage'));

const TodosPage = lazy(() => import('./pages/TodosPage'));

const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D8B' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

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

        <Suspense fallback={<p>Загрузка...</p>}>
          <Switch>
            <PublicRoute exact path="/" component={HomePage} />

            {/* когда пользователь залогинен, ему не должны отображаться на определенные страницы, например регистрации и логинизации;  restricted - ограниченый маршрут */}
            <PublicRoute
              path="/register"
              restricted
              redirectTo="/todos"
              component={RegisterPage}
            />

            <PublicRoute
              path="/login"
              restricted
              redirectTo="/todos"
              component={LoginPage}
            />

            {/* чтобы не отображать содержимое страницы незалогиненному пользователю */}
            <PrivateRoute
              path="/todos"
              redirectTo="/login"
              component={TodosPage}
            />

            {/* тренировка React Hooks */}
            <Route path="/counter">
              <Counter />
            </Route>

            <Route path="/form">
              <Form />
            </Route>

            <Route path="/colorpicker">
              <ColorPicker options={colorPickerOptions} />
            </Route>

            <Route path="/clock">
              <Clock />
            </Route>

            {/* <Route path="/news">
              <News />
            </Route> */}

            <Route path="/context">
              <Context />
            </Route>
          </Switch>
        </Suspense>
      </Container>
      // </>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
