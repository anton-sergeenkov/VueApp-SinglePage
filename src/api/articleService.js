const URL_GET_ARTICLE = 'https://web-notes.github.io/files/json-vue-app/get_article.json';
const URL_GET_COMMENT = 'https://web-notes.github.io/files/json-vue-app/get_comment.json';

// Возвращаемые данные
// {
//     header: string         - заголовок статьи
//     content: Array<string> - контент статьи. каждый элемент массива - абзац
// }
export const fetchArticle = () => fetch(URL_GET_ARTICLE);

// Возвращаемые данные
// [
//     {
//         user: string - имя пользователя
//         date: string - дата и время комментария
//         text: string - текст комментария
//     },
//     { ... }
// ]
export const fetchComment = () => fetch(URL_GET_COMMENT);
