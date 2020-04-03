const URL_GET_USERS = 'https://web-notes.github.io/files/json-vue-app/get_users.json';

// Возвращаемые данные
// {
//     UserLogin: {         - логин
//         name: string     - отображаемое имя пользователя
//         password: string - пароль
// 	},
//     ...
// }
export const fetchUsers = () => fetch(URL_GET_USERS);
