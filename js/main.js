

var data = {
    "Original":5,
    "Cinnamon":5.5,
    "Blue": 6,
    "Pumpkin": 6
};

var currProduct = -1;

var selection = {'type': null, 'quantity': 0, 'glaze': 0}

function addListeners()
{
			selection.type = document.getElementById("type").innerHTML.split(" ")[0];

			var header = document.getElementById("first-btn-group");
			
			var btns = header.getElementsByClassName("btn");
			
			for (var i =0; i<btns.length;i++){
				btns[i].addEventListener("click", function() {
				
					var header = document.getElementById("first-btn-group");
				    var current = header.getElementsByClassName("active");
				    
				    if(current.length != 0){
				    current[0].className = current[0].className.replace(" active", "");
				};

				    this.className += " active";
				    selection.quantity = this.innerHTML;
				  } );	
			}

			var header = document.getElementById("second-btn-group");
			var btns = header.getElementsByClassName("btn");
			
			for (var i =0; i<btns.length;i++){
				btns[i].addEventListener("click", function() {
					
					var header = document.getElementById("second-btn-group");
				    var current = header.getElementsByClassName("active");
				    if(current.length != 0){
				    current[0].className = current[0].className.replace(" active", "");
				}
				    this.className += " active";
				    selection.glaze = this.innerHTML;
				  });	
			}

}

function addToCart() {

	var cartSt = localStorage.getItem("cart") || "[]";
	var cart = JSON.parse (cartSt);
	cart.push(selection);
	localStorage.setItem("cart", JSON.stringify(cart));

	document.getElementById("cartnumber").innerHTML = cart.length;

}


function cartTotal() {

	var cartSt = localStorage.getItem("cart") || "[]";
	var cart = JSON.parse (cartSt);
	document.getElementById("cartnumber").innerHTML = cart.length;

}

function showCart() {
	var images = {
		'Original':'images/cart1.png',
		'Cinnamon':'images/cart2.png',
		'Blue':'images/cart3.png',
		'Pumpkin':'images/cart4.png',
	}
	var cartSt = localStorage.getItem("cart") || "[]";
	var cart = JSON.parse (cartSt);
	var shoppingcartDiv = document.getElementsByClassName('shoppingcart')[0];
	var totalPrice = 0;

	for (var i = 0; i < cart.length; i++) {

		var itemDiv = document.createElement("div");
		itemDiv.classList.add("item");

		var imageDiv = document.createElement("div");
		imageDiv.classList.add("itemimage");

		var type = document.createElement("p");

		var image = document.createElement("img");
		image.src = images[cart[i].type];
		imageDiv.appendChild(image);
		itemDiv.appendChild(imageDiv);

		var descriptDiv = document.createElement("div");
		descriptDiv.classList.add("itemdescript");

		type.innerHTML = cart[i].type + " Cinnamon Roll";
		descriptDiv.appendChild(type);

		var quantity = document.createElement("p");
		quantity.innerHTML = cart[i].quantity;
		descriptDiv.appendChild(quantity);

		var glaze = document.createElement("p");
		glaze.innerHTML = cart[i].glaze;
		descriptDiv.appendChild(glaze);

		var pricePar = document.createElement("p");
		var singlePrice = data[cart[i].type];   //gives the price of one poduct
		var str = cart[i].quantity * singlePrice;
		totalPrice += str;
		str="$"+str;
		pricePar.innerHTML=str;
		descriptDiv.appendChild(pricePar);   //added paragraph with price

		var button = document.createElement("button");
		button.innerHTML = "Delete";
		button.className="deleteButton";
		button.onclick = function(){
            var self = this;
			deleteFromCart(self);
		};
        descriptDiv.appendChild(button); //added button in the end

		itemDiv.appendChild(descriptDiv);

		shoppingcartDiv.appendChild(itemDiv);

		console.log(cart[i].type + " " + cart[i].quantity + " " + cart[i].glaze);
	}

	console.log(totalPrice);
	var total = document.createElement('p');
	total.innerHTML = totalPrice;
	shoppingcartDiv.appendChild(total);




}



function findMe(parent, child) {
	let divs = parent.querySelectorAll(".item");
	for (let i=0;i<divs.length;i++)
		if (divs[i] === child)
			return i;
}

function deleteFromCart(elem) {
	let parent = elem.parentNode;
	let div = parent.parentNode;
	let parentDiv = div.parentNode;
	let num = findMe(parentDiv, div);

    var cartSt = localStorage.getItem("cart") || "[]";
    var cart = JSON.parse (cartSt);
    cart.splice(num,1);
    parentDiv.removeChild(div);
    localStorage.setItem("cart", JSON.stringify(cart));


    cartTotal();

}


function changeImageNone() {
		var image = document.getElementById('detailImage');
		image.src = "images/detailnone.png";
}

function changeImageSugar() {
		var image = document.getElementById('detailImage');
		image.src = "images/detailsugar.png";

}

function changeImageVanilla() {
		var image = document.getElementById('detailImage');
		image.src = "images/detailvanilla.png";

}

function changeImageChoco(){
		var image = document.getElementById('detailImage');
		image.src = "images/detailchoco.png";

}



