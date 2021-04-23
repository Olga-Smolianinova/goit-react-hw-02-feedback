import React from 'react';
import { useSelector } from 'react-redux'; //connect заменяем на useSelector
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

//c React Hooks
export default function Navigation() {
  // вызов useSelector - в него передаем функцию (а именно ссылку на свой селектор) и этот селектор получает доступ к state. Если селектором много, для каждого прописіваем отдельный useSelector
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <nav>
      <NavLink to="/" exact style={styles.link} activeStyle={styles.activeLink}>
        Home
      </NavLink>

      {/* рендер по условию, чтобы страница Заметки не отображалась вообще, если пользователь незалогинен */}
      {isLoggedIn && (
        <NavLink
          to="/todos"
          exact
          style={styles.link}
          activeStyle={styles.activeLink}
        >
          Notes
        </NavLink>
      )}

      {/*для тренировки React Hooks */}
      <NavLink
        to="/counter"
        style={styles.link}
        activeStyle={styles.activeLink}
      >
        Counter
      </NavLink>

      <NavLink to="/form" style={styles.link} activeStyle={styles.activeLink}>
        Form
      </NavLink>

      <NavLink
        to="/colorpicker"
        style={styles.link}
        activeStyle={styles.activeLink}
      >
        Color Picker
      </NavLink>

      <NavLink to="/clock" style={styles.link} activeStyle={styles.activeLink}>
        Clock
      </NavLink>

      <NavLink to="/news" style={styles.link} activeStyle={styles.activeLink}>
        News
      </NavLink>

      <NavLink
        to="/context"
        style={styles.link}
        activeStyle={styles.activeLink}
      >
        Context
      </NavLink>
    </nav>
  );
}

// без React Hooks
// const Navigation = ({ isAuthenticated }) => (
//   <nav>
//     <NavLink to="/" exact style={styles.link} activeStyle={styles.activeLink}>
//       Home
//     </NavLink>

//     {/* рендер по условию, чтобы страница Заметки не отображалась вообще, если пользователь незалогинен */}
//     {isAuthenticated && (
//       <NavLink
//         to="/todos"
//         exact
//         style={styles.link}
//         activeStyle={styles.activeLink}
//       >
//         Notes
//       </NavLink>
//     )}

//     {/*для тренировки React Hooks */}
//     <NavLink to="/counter" style={styles.link} activeStyle={styles.activeLink}>
//       Counter
//     </NavLink>

//     <NavLink to="/form" style={styles.link} activeStyle={styles.activeLink}>
//       Form
//     </NavLink>

//     <NavLink
//       to="/colorpicker"
//       style={styles.link}
//       activeStyle={styles.activeLink}
//     >
//       Color Picker
//     </NavLink>

//     <NavLink to="/clock" style={styles.link} activeStyle={styles.activeLink}>
//       Clock
//     </NavLink>

//     <NavLink to="/news" style={styles.link} activeStyle={styles.activeLink}>
//       News
//     </NavLink>

//     <NavLink to="/context" style={styles.link} activeStyle={styles.activeLink}>
//       Context
//     </NavLink>
//   </nav>
// );

// const mapStateToProps = state => ({
//   isAuthenticated: authSelectors.getIsAuthenticated(state),
// });

// export default connect(mapStateToProps)(Navigation);
