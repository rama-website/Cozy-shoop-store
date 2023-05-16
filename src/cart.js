let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML= basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let cozyShopItems = () => {
if(basket.length !== 0){
return (ShoppingCart.innerHTML = basket.map((x)=>{
    let {id, item} = x;
    let search = shopItemsData.find((y) => y.id === id) || [];
    return `
    <div class="cart-item">
    <img width="100" src="${search.img}" />
    <div class="details">

    <div class="titel-price-x">
    <h4 class="title-price">
     <p>${search.name}</p>
     <P class="item-price">$ ${search.price}</p>
    </h4>
    <img onclick="removeItem(${id})" class="x-icon" width="30" src="cozy shoop icon/x icon.png"/>
    </div>

    <div class="buttons">
        <img onclick="increment(${id})" class="plus" src="cozy shoop imgs/plus_icon.png" width="20px">
        <div id=${id} class="quantity">${item}</div>
        <img onclick="decrement(${id})" class="minus" src ="cozy shoop imgs/minus_icon.png" width="20px">
    </div>
    <h3>$ ${item * search.price}</h3>
    </div>
    </div>
    `;
}).join(""));

}
else{
    ShoppingCart.innerHTML = `` ;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="Shopping cart.html">
    <button class="HomBtun">Back to home</button>
    </a>
    `;
}
};
cozyShopItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

if(search === undefined){
    basket.push({
    id:selectedItem.id,
    item:1,
});
}
else{
    search.item += 1;
}
cozyShopItems();
update(selectedItem.id);
localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
if(search.item === undefined)return;
else if(search.item === 0)return;
  
else{
    search.item -= 1;
}
update(selectedItem.id);
basket = basket.filter((x) => x.item !== 0);

cozyShopItems();
localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};
let removeItem = (id)=>{
    let selectedItem = id
    // console.log(selectedItem.id);
    basket = basket.filter((x)=> x.id !== selectedItem.id);
    cozyShopItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));

};
let TotalAmount = ()=>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let { item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price
        }).reduce((x,y) => x+y,0 );
        // console.log(amount)
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">checkout</button>
        <button class="removeAll">remove all</button>`
    }
    else return
};

TotalAmount();


