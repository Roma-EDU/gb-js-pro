# ООП в JavaScript

Основные принципы ООП и его реализации в JavaScript

1. Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
   * **Решение:** Добавил классы `Cart`, `CartItem` и `Product`, см. [js/cart.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-02/js/cart.js)
2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
   * **Решение:** Добавил метод `calculateTotalPrice()` (в моём случае GoodsList - это класс Cart), см. [js/cart.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-02/js/cart.js)
3. \* Некая сеть фастфуда предлагает несколько видов гамбургеров:
   1. Маленький (50 рублей, 20 калорий).
   1. Большой (100 рублей, 40 калорий).
   
   Гамбургер может быть с одним из нескольких видов начинок (обязательно):
   1. С сыром (+10 рублей, +20 калорий).
   1. С салатом (+20 рублей, +5 калорий).
   1. С картофелем (+15 рублей, +10 калорий).
   
   Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий).
   
   Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса со следующей страницы, но можно использовать и свою.
   ```js
   class Hamburger {
     constructor(size, stuffing) { ... }
     addTopping(topping) { // Добавить добавку }
     removeTopping(topping) { // Убрать добавку }
     getToppings(topping) { // Получить список добавок }
     getSize() { // Узнать размер гамбургера }
     getStuffing() { // Узнать начинку гамбургера }
     calculatePrice() { // Узнать цену }
     calculateCalories() { // Узнать калорийность }
   }
   ```
   
   * **Решение:** Добавил базовый класс `Food` и несколько наследников, см. [js/hamburger.js](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-02/js/hamburger.js)

**Вопрос** во время лекции про наследование: вот пример кода на C#, когда обращение идёт к базовому классу, но выполняется код наследника [Inheritance.cs](https://github.com/Roma-EDU/gb-js-pro/blob/master/lesson-02/Inheritance.cs)
**Решение:** пример на js работает также
```html
<meta charset="utf-8">
<script>
  class Person{
    constructor(name,year) {//конструктор это метод, который вызывается при создании класса
      this.name = name;
      this.year = year;
      this.age = new Date().getFullYear() - year;
    }

    getInfo(){
      return `${this.name} родился в ${this.year}, ему ${this.age} лет`;
    }

    showInfo(){
      console.log(this.getInfo());
    }
  }

  /**
   * Если в базовом классе есть конструктор с параметрми, то в классе потомке
   * обязаательно делаем конструктор с параметрами и вызываем базовый конструктор через super
   */
  class Teacher extends Person {
    constructor(name, year,subject) {
      super(name, year);
      this.subject = subject;
    }

    getInfo() {
      return `${super.getInfo()}. ${this.name} преподает предмент ${this.subject}`;
    }
  }

  let teacher = new Teacher("Иван",1980,"Физика");
  teacher.showInfo();
</script>
```
