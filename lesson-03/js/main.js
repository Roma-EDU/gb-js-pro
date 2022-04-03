const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    _getJson(url){
        return fetch(url)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    _render(container, items){
        const block = document.querySelector(container);
        block.innerHTML = "";
        for (let item of items){
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }
}

class Item{
    constructor(jsonItem, img){
        this.product_name = jsonItem.product_name;
        this.price = jsonItem.price;
        this.id_product = jsonItem.id_product;
        this.img = img;
    }
}

class ProductsList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json"){
        super();
        this.container = container;
        this.cart = cart;
        this.allProducts = [];
        this._init(url);
    }

    _init(url) {

        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){
                this.cart.addProduct(e.target);
            }
        });

        this._getJson(`${API}${url}`)
            .then(data => { 
                this.allProducts = [...data].map(i => new ProductItem(i));
                this._render(this.container, this.allProducts);
            });
    }
}


class ProductItem extends Item {
    constructor(el, img = 'https://via.placeholder.com/200x150'){
        super(el, img);
    }

    render() {
        return `` + 
`<div class="product-item" data-id="${this.id_product}">
    <img src="${this.img}" alt="Изображение товара ${this.product_name}">
    <div class="desc">
        <h3>${this.product_name}</h3>
        <p>${this.price} у.е.</p>
        <button class="buy-btn"
                data-id="${this.id_product}"
                data-name="${this.product_name}"
                data-price="${this.price}">Купить</button>
    </div>
</div>`
    }
}

class Cart extends List {
    constructor(container = ".cart-block", url = "/getBasket.json"){
        super();
        this.container = container;
        this.allProducts = [];
        this._init();
        this._getJson(`${API}${url}`)
            .then(data => {
                this.allProducts = [...data.contents].map(i => new CartItem(i));
                this.render();
            });
    }

    render() {
        if (this.allProducts.length > 0) {
            this._render(this.container, this.allProducts); 
        } else {
            const block = document.querySelector(this.container);
            block.innerHTML = `<p>Корзина пуста</p>`;
        }
    }

    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    addProduct(element){
        this._getJson(`${API}/addToBasket.json`) //Запрос на сервер, можно ли добавить товар в корзину
            .then(data => {
                if (data.result === 1){
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        this.allProducts.push(new CartItem(product));
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    removeProduct(element){
        this._getJson(`${API}/deleteFromBasket.json`)  //Можно ли удалить товар из корзины
            .then(data => {
                if(data.result === 1){
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if(find.quantity > 1){
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        //document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    _updateCart(product){
       let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
       block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
       block.querySelector('.product-price').textContent = `${product.quantity*product.price} у.е.`;
    }
    _init(){
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
           if(e.target.classList.contains('del-btn')){
               this.removeProduct(e.target);
           }
        })
    }

}

class CartItem extends Item {
    constructor(el, img = 'https://via.placeholder.com/60x60'){
        super(el, img);
        this.quantity = el.quantity;
    }

    render() {
        return `` + 
`<div class="cart-item" data-id="${this.id_product}">
    <div class="product-bio">
        <img src="${this.img}" alt="Изображение товара ${this.product_name}">
        <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
            <p class="product-single-price">${this.price} у.е./шт</p>
        </div>
    </div>
    <div class="right-block">
        <p class="product-price">${this.quantity*this.price} у.е.</p>
        <button class="del-btn" data-id="${this.id_product}">&times;</button>
    </div>
</div>`
    }
}

let cart = new Cart();
let products = new ProductsList(cart);

