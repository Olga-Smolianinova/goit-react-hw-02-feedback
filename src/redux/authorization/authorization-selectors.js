//Проверка состояния логинизации пользователя по token. Когда пользователь незалогинен token=null, когда залогинен и есть token - необходимо, чтобы отрисовывалось UserMenu. Если token есть - то прийдет строка, и при boolen она будет true, если незалогинен - false
const getIsAuthenticated = state => state.auth.token;

// Для отображения name после успешной логинизации в AppBar
const getUsername = state => state.auth.user.name;

//для разлогинирования - Logout. Нужно прикладывать заголовок Аuthorization  Ожидает token по которому проходит authorization и дальнейшие действия

// eslint-disable-next-line import/no-anonymous-default-export
export default { getIsAuthenticated, getUsername };
