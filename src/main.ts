import './scss/styles.scss';
import {ProductCatalog} from "./components/models/ProductCatalog.ts";
import {ShoppingCart} from "./components/models/ShoppingCart.ts";
import {Customer} from "./components/models/Customer.ts";
import {ApiClient} from "./components/ApiClient.ts";
import {Api} from "./components/base/Api.ts";
import {API_URL} from "./utils/constants.ts";

const api = new Api(API_URL);
const client = new ApiClient(api);
const apiProducts = await client.getProducts();
const data = apiProducts.items;

console.group('КАТАЛОГ ТОВАРОВ');
const productsModel = new ProductCatalog(data);
console.log("Объект каталога продуктов", productsModel);
console.log("Список продуктов", productsModel.products);

const newProducts = [...data, {
    "id": "854cef69-976d-4c2a-a18c-2aa45046c391",
    "description": "Тест",
    "image": "/5_Dots.svg",
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": 750
}]
console.log("Обновленный список продуктов", productsModel.products = newProducts);

productsModel.selectedProduct = data[0];
console.log('Выбранный продукт', productsModel.selectedProduct);

productsModel.selectedProduct = undefined
console.log('Снять выбор с продукта', productsModel.selectedProduct);

console.log('Получить товар по id', productsModel.getProduct(data[0].id));
console.log('Получить товар по несуществующему id', productsModel.getProduct('test'));
console.groupEnd();


console.group('КОРЗИНА')
const cart = new ShoppingCart();
console.group('Добавление товара из каталога с ценой')
console.log('Продукты в корзине до', [...cart.products]);
cart.addProduct(data[0]);
cart.addProduct(data[1]);
console.log('Продукты в корзине после добавления 2 позиций', cart.products);
console.groupEnd();

console.group('Добавление продукта, которого нет в данных (проверка на undefined)');
const cart1 = new ShoppingCart();
cart1.addProduct(data[1]);
console.log('Продукты в корзине', [...cart1.products]);
try {
    cart1.addProduct(data[10]);
} catch (err) {
    console.log(err);
    console.log('Продукты в корзине после добавление', cart1.products);
}
console.groupEnd();

console.group('Добавление в корзину товара без цены');
const cart2 = new ShoppingCart();
console.log('Продукты в корзине до', [...cart2.products]);
try {
    cart2.addProduct(data[2]);
} catch (err) {
    console.log(err);
    console.log(' Продукты в корзине после добавление товара без цены', cart2.products);
}
console.groupEnd();

console.group('Повторное добавление товара в корзину (товар можно добавить только раз)');
const cart3 = new ShoppingCart();
console.log('Продукты в корзине', [...cart3.products]);
cart3.addProduct(data[0]);
cart3.addProduct(data[0]);
console.log('Продукты в корзине после добавления дубля товара', cart3.products);
console.groupEnd();

console.group('Удаление товара');
const cart4 = new ShoppingCart();
cart4.addProduct(data[0]);
console.log('Продукты в корзине до удаления', [...cart4.products]);
cart4.removeProduct(data[0]);
console.log('Продукты в корзине после удаления', cart4.products);
console.groupEnd();

console.group('Удаление товара, которого нет в корзине');
const cart5 = new ShoppingCart();
cart5.addProduct(data[1]);
console.log('Продуктов в корзине до удаления', cart5.products.length);
cart.removeProduct(data[0]);
console.log('Продукты в корзине после удаления', cart5.products.length);
console.groupEnd();

console.group('Удаление продукта которого нет в данных (проверка на undefined)');
const cart6 = new ShoppingCart();
cart6.addProduct(data[1]);
console.log('Продукты в корзине до удаления', cart6.products.length);
cart6.removeProduct(data[10]);
console.log('Продукты в корзине после удаления', cart6.products.length);
console.groupEnd();

console.group('Очистка корзины')
const cart7 = new ShoppingCart();
cart7.addProduct(data[0]);
cart7.addProduct(data[1]);
console.log('Продуктов в корзине до очистки', cart7.products.length);
cart7.clear();
console.log('Продуктов в корзине после полной очистки', cart7.products.length);
console.groupEnd();

console.group('Получение общей стоимости');
const cart8 = new ShoppingCart();
cart8.addProduct(data[0]);
cart8.addProduct(data[1]);
console.log('Товары в корзине', cart8.products)
console.log('Ожидаемая общая стоимость', (data[0].price || 0) + (data[1].price || 0));
console.log('Фактическая общая стоимость', cart8.getTotalPrice());
console.groupEnd();

console.group('Получение количества позиций');
const cart9 = new ShoppingCart();
cart9.addProduct(data[0]);
cart9.addProduct(data[1]);
console.log('Товары в корзине', cart9.products)
console.log('Ожидаемое количество', 2);
console.log('Фактическое количество', cart8.getTotalCount());
console.groupEnd();

console.group('Проверка наличия товара в корзине');
const cart10 = new ShoppingCart();
cart10.addProduct(data[0]);
cart10.addProduct(data[1]);
console.log('Товары в корзине', cart10.products)
console.log(`Корзина содержит товар ${data[0].id}`, cart10.contains(data[0].id));
console.log(`Корзина содержит товар ${data[2].id}`, cart10.contains(data[2].id));
console.groupEnd();

console.group('ПОКУПАТЕЛЬ')
const customer = new Customer();
console.log('Объект покупателя', customer);
customer.setPayment('offline');
console.log('Покупатель с оплатой при получении', {...customer.getCustomer()});
customer.setPayment(undefined);
console.log('Покупатель с неустановленной оплатой', {...customer.getCustomer()});
console.log('Покупатель с оплатой онлайн', {...customer.getCustomer()});
customer.setPayment('online');

customer.setAddress('Санкт-Петербург г, Миллионная ул. 6')
    .setPhone('+7 950 555 55 55')
    .setEmail('test@ya.ru');
console.log('Покупатель со всеми данными', {...customer.getCustomer()});
console.log('Валидация покупателя', customer.validate());
customer.clear();
console.log('Покупатель после очистки данных', {...customer.getCustomer()});
console.log('Валидация покупателя', customer.validate())
console.groupEnd();


const order = {
    "payment": "online",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1",
    "total": 2200,
    "items": [
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
    ]
}

const orderWrongTotal = {
    "payment": "online",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1",
    "total": 2200,
    "items": [
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
        '90973ae5-285c-4b6f-a6d0-65d1d760b102'
    ]
}

const orderWrongProduct = {
    "payment": "online",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1",
    "total": 2200,
    "items": [
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
        '90973ae5-285c-4b6f-a6d0-65d1d760b105'
    ]
}

const orderWrongAddress = {
    "payment": "online",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "",
    "total": 2200,
    "items": [
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
        '90973ae5-285c-4b6f-a6d0-65d1d760b105'
    ]
}

console.log(data);
const createdOrder = await client.createOrder(order);
console.log(createdOrder)

await client.createOrder(orderWrongTotal);
await client.createOrder(orderWrongProduct);
await client.createOrder(orderWrongAddress);









