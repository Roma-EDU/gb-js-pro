# Компоненты Vue.js

Реализация компонентного подхода во фреймворке Vue.js

1. Вынести поиск в отдельный компонент.
   * **Ответ**: добавил компонент [js/SearchComponent.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-06/js/SearchComponent.js) и 
   подключил его в index.html, пробросив нажатие на кнопку в виде сообственного события `<search @filter-catalog="filter"></search>`
1. Вынести корзину в отдельный компонент.
   * **Ответ**: в исходниках уже был готовый компонент [js/CartComponent.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-06/js/CartComponent.js)
1. \* Создать компонент с сообщением об ошибке. Компонент должен отображаться, когда не удаётся выполнить запрос к серверу.
   * **Ответ**: доработал метод [getJson(url) в main.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-06/js/main.js) для сигнализации 
   об ошибке и добавил компонент [js/ServerErrorComponent.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-06/js/ServerErrorComponent.js)
