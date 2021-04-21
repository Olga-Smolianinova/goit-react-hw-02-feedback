import React, { useState } from 'react';

const styles = {
  form: {
    width: 320,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
  },
};

// c React Hooks
export default function Form() {
  const [email, setEmail] = useState('');
  const handleEmailChange = evt => {
    setEmail(evt.target.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = evt => {
    setPassword(evt.target.value);
  };

  // или 2 в 1 как вариант
  // const handleChange = evt => {
  //   const { name, value } = evt.target;

  //   switch (name) {
  //     case 'email':
  //       setEmail(value);
  //       break;

  //     case 'password':
  //       setPassword(value);
  //       break;

  //     default:
  //       console.warn(`Тип поля name - ${name} не обрабатывается`);
  //   }
  // };

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(email);
    console.log(password);
  };

  return (
    <form style={styles.form} autoComplete="off" onSubmit={handleSubmit}>
      <label style={styles.label}>
        <span>Почта</span>
        <input
          type="email"
          name="email"
          onChange={handleEmailChange}
          value={email}
        />
      </label>

      <label style={styles.label}>
        <span>Пароль</span>
        <input
          type="password"
          name="password"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}

// без React Hooks
// export default class Form extends Component {
//   state = {
//     email: '',
//     password: '',
//   };

//   handleChange = evt => {
//     const { name, value } = evt.target;
//     this.setState({ [name]: value });
//   };

//   render() {
//     return (
//       <form style={styles.form} autoComplete="off">
//         <label style={styles.label}>
//           <span>Почта</span>
//           <input
//             type="email"
//             name="email"
//             onChange={this.handleChange}
//             value={this.state.email}
//           />
//         </label>

//         <label style={styles.label}>
//           <span>Пароль</span>
//           <input
//             type="password"
//             name="password"
//             onChange={this.handleChange}
//             value={this.state.password}
//           />
//         </label>

//         <button type="submit">Зарегистрироваться</button>
//       </form>
//     );
//   }
// }
