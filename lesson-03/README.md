# 3. Асинхронные запросы

1. Переделайте `makeGETRequest()` так, чтобы она использовала промисы.
   * См. `makeGETRequestPromise` в [js/request.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-03/js/request.js)
1. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.
   * См. класс `Cart` в [js/main.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-03/js/main.js)
1. \* Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а `render()` вызывался в обработчике этого промиса
   * Там же в [js/main.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-03/js/main.js) см. метод `_init()` в классе `ProductsList` (другое название GoodsList) 
