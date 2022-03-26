class Food {
    constructor (title, price, calories) {
        this._title = title;
        this._price = price;
        this._calories = calories;
    }
}

class Topping extends Food {

    constructor (title, price, calories) {
        super(title, price, calories);
    }

    static seasoning() {
        return new Topping("Seasoning", 15, 0);
    }

    static mayonnaise() {
        return new Topping("Mayonnaise ", 20, 5);
    }
}

class Stuffing extends Food {

    constructor (title, price, calories) {
        super(title, price, calories);
    }

    static cheese() {
        return new Stuffing("Cheese", 10, 20);
    }

    static salad() {
        return new Stuffing("Salad", 20, 5);
    }

    static potato() {
        return new Stuffing("Potato", 15, 10);
    }
}

class Hamburger extends Food {

    constructor(isBigSize, stuffing) { 
        if (isBigSize) {
            super("Big hamburger", 100, 40);
        } else {
            super("Small hamburger", 50, 20);
        }
        this._isBigSize = isBigSize;
        this._stuffing = stuffing;
        this._toppings = [];
    }

    /**
     * Добавить добавку
     * @param {*} topping - новая добавка
     */
    addTopping(topping) {  
        this._toppings.push(topping);
    }

    /**
     * Убрать добавку
     * @param {*} topping - удаляемая добавка
     */
    removeTopping(topping) { 
        var index = this._toppings.indexOf(topping);
        if (index > -1) {
            this._toppings = this._toppings.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Получить список добавок
     * @returns Возвращает массив Topping[]
     */
    getToppings() {
        return this._toppings;
    }

    /**
     * Узнать размер гамбургера
     * @returns Возвращает True, если гамбургер большой; иначе вернёт False
     */
    getSize() {
        return this._isBigSize;
    }

    /**
     * Узнать начинку гамбургера
     * @returns Возвращает начинку Stuffing
     */
    getStuffing() {
        return this._stuffing;
    }

    /**
     * Узнать цену
     * @returns Возвращает цену
     */
    calculatePrice() {
        return this._getAllFood().reduce((sum, food) => sum + food._price, 0);
    }

    /**
     * Узнать калорийность
     * @returns Возвращает калорийность
     */
    calculateCalories() {
        return this._getAllFood().reduce((sum, food) => sum + food._calories, 0);
    }

    _getAllFood(){
        let foods = this._toppings.slice();
        foods.push(this._stuffing);
        foods.push(this);
        return foods;
    }
}
    

