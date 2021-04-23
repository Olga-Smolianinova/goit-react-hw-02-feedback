import React, { useCallback } from 'react'; //useCallback - буквально передаю ему функцию, которую нужно мемоизировать, и массив зависимостей при котором ее нужно перерендеривать
import { useSelector, useDispatch } from 'react-redux'; //заменяем connect

// Data
import { authSelectors, authOperations } from '../../redux/authorization';

import defaultAvatar from './default-avatar.png';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 4,
  },
  name: {
    fontWeight: 700,
    marginRight: 12,
  },
};

//c React Hooks
export default function UserMenu() {
  // useSelector
  const name = useSelector(authSelectors.getUsername);

  // useDispatch
  const dispatch = useDispatch();

  // useCallback - буквально передаю ему функцию, которую нужно мемоизировать, и массив зависимостей при котором ее нужно перерендеривать
  const onLogout = useCallback(() => dispatch(authOperations.logOut()), [
    dispatch,
  ]); //анонимная функция, которая каждый раз вызвает UserMenu() и будет создаваться новая ссылка и button Logout будет перерендериваться каждый раз, хотя это ненужно. Чтобы этого избежать используем hook для мемоизации - useCallback

  return (
    <div style={styles.container}>
      <img src={defaultAvatar} alt="" width="32" style={styles.avatar} />

      <span style={styles.name}>Welcome, {name}</span>

      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

// без React Hooks
// const UserMenu = ({ avatar, name, onLogout }) => (
//   <div style={styles.container}>
//     <img src={avatar} alt="" width="32" style={styles.avatar} />

//     <span style={styles.name}>Welcome, {name}</span>

//     <button type="button" onClick={onLogout}>
//       Logout
//     </button>
//   </div>
// );
// const mapStateToProps = state => ({
//   // Для отображения name&&avatar после успешной логинизации в AppBar
//   name: authSelectors.getUsername(state),
//   avatar: defaultAvatar,
// });

// const mapDispatchToProps = {
//   //для разлогирования
//   onLogout: authOperations.logOut,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
