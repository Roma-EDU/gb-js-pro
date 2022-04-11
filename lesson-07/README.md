# JavaScript на сервере

Создание простого сервера с помощью платформы Node.js
1. Привязать добавление товара в корзину к реальному API.
   * **Ответ**: доработал метод `addProduct` из [public/js/CartComponent.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-07/public/js/CartComponent.js)
2. Добавить API для удаления товара из корзины.
   * **Ответ**: доработал метод `remove` из [public/js/CartComponent.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-07/public/js/CartComponent.js) и 
   ответную часть на сервере [server/cartRouter.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-07/server/cartRouter.js)
3. \* Добавить файл stats.json, в котором будет храниться статистика действий пользователя с
корзиной. В файле должны быть поля с названием действия (добавлено/удалено), названием
товара, с которым производилось действие и временем, когда оно было совершено.
   * **Ответ**: добавил метод `saveStat` в [server/handler.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-07/server/handler.js) для 
   сохранения статистики действий пользователя с корзиной
