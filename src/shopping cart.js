let shop = document.getElementById("shop");
let wooLScarves = document.getElementById("wooLScarves");
let woolPaws = document.getElementById("woolGloves");
let burgerIcon = document.getElementById("bruger");

let tagelBurgerLinks = ()=>{
    document.getElementById("nav-bruger-links").classList.toggle("hide")
}
burgerIcon.addEventListener("click", tagelBurgerLinks);
// mydata is here
let hatData = shopItemsData.filter((item)=> item.name === "wool hat" )
let scareveData = shopItemsData.filter((item)=> item.name === "scarf" )
let glovesData = shopItemsData.filter((item)=> item.name === "gloves")
let ietmsBlock = (items,eleById,) => {
    // let scareveData = shopItemsData.filter((item)=> item.name === "scarf" )
    return (eleById.innerHTML = items.map((x) =>{
        let {id, name, price, desc, img,} = x;

        let search = basket.find((x)=> x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
                <img  width="220" src="${img}">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <p onclick="increment(${id})" class="plus">Add to cart</p> 
                            <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                            
                        </div>
                    </div>
                </div>
            
            </div>
    
        `
    }).join(""));
};


let basket = JSON.parse(localStorage.getItem("data")) || [];
ietmsBlock(hatData,shop)
ietmsBlock(scareveData,wooLScarves)
ietmsBlock(glovesData,woolGloves)

// let cozyShop = () => {
//     return (
//         shop.innerHTML = shopItemsData.map((x) =>{
//         let {id, name, price, desc, img,} = x;
//         let search = basket.find((x)=> x.id === id) || [];
//         if(x.name === "wool hat"){
//             return `
//             <div id=product-id-${id} class="item">
//                     <img id="hat1" width="220" src="${img}">
//                     <div class="details">
//                         <h3>${name}</h3>
//                         <p>${desc}</p>
//                         <div class="price-quantity">
//                             <h2>$ ${price}</h2>
//                             <div class="buttons">
//                                 <img onclick="increment(${id})" class="plus" src="cozy shoop imgs/plus_icon.png" width="20px">
//                                 <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
//                                 <img onclick="decrement(${id})" class="minus" src ="cozy shoop imgs/minus_icon.png" width="20px">
//                             </div>
//                         </div>
//                     </div>
                
//                 </div>
        
//             `;
//         }
        

//     }).join(""));
// };
// cozyShop();



// console.log(wooLScarves)
// let bsket = JSON.parse(localStorage.getItem("data")) || [];
// let cozyShops = () => {
//     let scareveData = shopItemsData.filter((item)=> item.name === "scarf" )
//     return (wooLScarves.innerHTML = scareveData.map((x) =>{
//         let {id, name, price, desc, img,} = x;

//         // let cozyShops = cozyShops.filter(function(shopItemsDataScarf){
//         //     return shopItemsDataScarf >=0;
//         //  });
//         //  console.log(cozyShops);

//         let search = basket.find((x)=> x.id === id) || [];
//         return `
//         <div id=product-id-${id} class="item">
//                 <img id="hat1" width="220" src="${img}">
//                 <div class="details">
//                     <h3>${name}</h3>
//                     <p>${desc}</p>
//                     <div class="price-quantity">
//                         <h2>$ ${price}</h2>
//                         <div class="buttons">
//                             <img onclick="increment(${id})" class="plus" src="cozy shoop imgs/plus_icon.png" width="20px">
//                             <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
//                             <img onclick="decrement(${id})" class="minus" src ="cozy shoop imgs/minus_icon.png" width="20px">
//                         </div>
//                     </div>
//                 </div>
            
//             </div>
    
//         `
//     }).join(""));
// };
// cozyShops();


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

update(selectedItem.id);
localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {    console.log("search")

    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    console.log(search)
if(search === undefined)return;



    search.item -= 1;

update(selectedItem.id);

basket = basket.filter((x) => x.item !== 0);

localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search, search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation()
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML= basket.map((x) => x.item).reduce((x,y)=>x+y,0);
};
calculation();