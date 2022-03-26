
class Product {
    /**
     * Товар
     * @param {*} title - название товара
     * @param {*} price - цена за [единицу] товара
     */
    constructor (title, price) {
        this.title = title;
        this.price = price;
    }
}


class CartItem {
    /**
     * Элемент корзины
     * @param {*} product - товар 
     * @param {*} quantity - количество товара (по умолчанию 1)
     * @param {*} discount - коэффициент скидки (при 1 скидки нет, при 0.95 скидка 5%)
     */
    constructor(product, quantity = 1.0, discount = 1.0) {
        this.product = product;
        this.quantity = quantity;
        this.discount = discount;
    }

    /**
     * Рассчитать общую стоимость
     * @returns Возвращает общую стоимость товара с учётом скидки
     */
    calculateTotalPrice() {
        return this.calculatePriceNoDiscount() * this.discount;
    }

    /**
     * Рассчитать стоимость без учёта скидки
     * @returns Возвращает общую стоимость товара без учёта скидки
     */
    calculatePriceNoDiscount() {
        return this.product.price * this.quantity;
    }

    /**
     * Увеличить количество товара
     * @param {*} extraQuantity - На сколько единиц увеличиваем (положительное число, по умолчанию 1)
     */
    increaseQuantity(extraQuantity = 1.0) {
        if (extraQuantity > 0) {
            this.quantity += extraQuantity;
        }
    }

    /**
     * Уменьшить количество товара
     * @param {*} extraQuantity - На сколько единиц уменьшаем (положительное число, по умолчанию 1)
     */
    decreaseQuantity(extraQuantity = 1.0) {
        if (extraQuantity > 0 && this.quantity - extraQuantity > 0) {
            this.quantity -= extraQuantity;
        }
    }

}


class Cart {
    /**
     * Корзина
     */
    constructor() {
        this.items = [];
    }

    /**
     * Рассчитать стоимость корзины
     * @returns Возвращает общую стоимость всех товаров в корзине
     */
    calculateTotalPrice() {
        let sum = 0;
        for (let cartItem in this.items) {
            sum += cartItem.calculateTotalPrice();
        }
        return sum;
    }

    /**
     * Удалить элемент из корзины
     * @param {*} cartItem - Элемент корзины, который требуется удалить
     * @returns Возвращает True, если элемент был успешно удалён; иначе вернёт False
     */
    remove(cartItem) {
        var index = this.items.indexOf(cartItem);
        if (index > -1) {
            this.items = this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Добавить товар в корзину
     * @param {*} product Товар
     * @param {*} quantity Количество товара
     * @returns Возвращает элемент корзины с данным товаром
     */
    add(product, quantity = 1.0) {
        let cartItem;
        for (let item in this.items) {
            if (item.product == product) {
                cartItem = item;
            }
        }

        if (cartItem) {
            cartItem.increaseQuantity(quantity);
        } else {
            cartItem = new CartItem(product, quantity);
            this.items.push(cartItem);
        }

        return cartItem;
    }
}