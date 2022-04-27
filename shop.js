//CART

let cartIcon = document.querySelector('#cartIcon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//OPEN CART
cartIcon.onclick = () =>{
    cart.classList.add("active");
};

//CLOSE CART

closeCart.onclick = () => {
    cart.classList.remove("active");
};

//CART SCRIPT

if (document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready);
}else {
    ready();
}

//making function for ready

function ready(){

    //remove items from cart

    let removeCartButtons = document.getElementsByClassName('cart-remove');

    for (let i=0; i < removeCartButtons.length; i++){
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    //changing the quantities
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i=0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

 
    //add to Cart
    let addCart = document.getElementsByClassName('add-cart')
    for (let i=0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
} 

//remove items from cart

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//changing the quantity
function quantityChanged(event){
    let input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

//add to cart

function addCartClicked(event){
    let button = event.target
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductsToCart(title, price,productImg);
    updateTotal();

}

function addProductsToCart(title, price, productImg){
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box')
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
    for (let i=0; i < cartItemsNames.length; i++){
        alert("You have added this item to cart");
        return;
    }
    
}

let cartBoxContent = `
                <img src="${productImg}" alt="" class="product-img">
                <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity"> 
                        </div>

                <i class="fa-solid fa-trash cart-remove"></i>`;

cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)

//update total

function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = document.getElementsByClassName('cart-box');
    let total = 0;

    for (let i=0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("Kshs.", ""));
        let quantity = quantityElement.value;
        total = total + price * quantity;

        //solution if prices contain cents or decimal values
        total = Math.round(total * 100) / 100;


        document.getElementsByClassName('total-price')[0].innerText = "Kshs." + total;
    }
}