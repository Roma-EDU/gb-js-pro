const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (productItem) => {
	let {title, price} = productItem;
    return `<div class="product-item">
                <h3>${title}</h3>
				<div class="buy-container">
					<p class="buy-price">${price}$</p>
					<button class="buy-btn">Купить</button>
				</div>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join("\n");
};

renderPage(products);