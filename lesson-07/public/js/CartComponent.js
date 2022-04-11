// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartItems: [],
          showCart: false
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                if (data && data.length > 0) {
                    for (let item of data){
                        this.$data.cartItems.push(item);
                    }
                }
            });
    },
    methods: {
        addProduct(product) {
            let existingCartItem = this.cartItems.find(el => el.id_product === product.id_product);
            if (existingCartItem) {
                this._changeQuantity(existingCartItem, existingCartItem.quantity + 1);
            } else {
                const newCartItem = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, newCartItem)
                    .then(data => {
                        if (data.result === 1){
                            this.cartItems.push(newCartItem);
                        }
                    })
            }
        },
        remove(cartItem) {
            if (cartItem.quantity > 1) {
                this._changeQuantity(cartItem, cartItem.quantity - 1);
            } else {
                this.$parent.deleteJson(`/api/cart/${cartItem.id_product}`)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
                    }
                })
            }
        },
        _changeQuantity(cartItem, newQuantity) {
            this.$parent.putJson(`/api/cart/${cartItem.id_product}`, {quantity: newQuantity})
                    .then(data => {
                        if (data.result === 1){
                            cartItem.quantity = newQuantity
                        }
                    })
        }
    },
    template: `<div>
<button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
        <div class="cart-block" v-show="showCart">
            <cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item" @remove="remove">
            </cart-item>
        </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                        <img :src="cartItem.image" width="50px" height="50px" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
})