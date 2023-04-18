fetch(
  "https://www.xataka.com/moviles/samsung-galaxy-s22-galaxy-s22-caracteristicas-precio-ficha-tecnica"
).then((res) =>
  console.log(res.json()).then((data) => {
    console.log(data);
  })
);
const btnCart = document.querySelector(".container-cart-icon");
const containerCartProducts = document.querySelector(
  ".container-cart-products"
);

btnCart.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});

const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");
const productsList = document.querySelector(".container-items");

let allProducts = [];
let valorTotal = document.querySelector(".total-pagar");
let countProducts = document.querySelector("#contador-productos");

productsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-cart")) {
    const product = e.target.parentElement;
    localStorage.setItem("nombre", product.querySelector("h2").textContent);
    const titulo = localStorage.getItem("nombre");
    localStorage.setItem("valor", product.querySelector("p").textContent);
    const precio = localStorage.getItem("valor");
    const infoProduct = {
      quantity: 1,
      title: titulo,
      price: precio,
    };

    const exits = allProducts.some(
      (product) => product.title === infoProduct.title
    );

    if (exits) {
      const products = allProducts.map((product) => {
        if (product.title === infoProduct.title) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });
      allProducts = [...products];
    } else {
      allProducts = [...allProducts, infoProduct];
    }

    showHTML();
  }
});

rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-close")) {
    const product = e.target.parentElement;
    const title = product.querySelector("p").textContent;
    allProducts = allProducts.filter((product) => product.title != title);
    showHTML();
  }
});

const showHTML = () => {
  rowProduct.innerHTML = "";
  let total = 0;
  let totalOfProducts = 0;

  allProducts.forEach((product) => {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("cart-product");

    containerProduct.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
            <p class="titulo-producto-carrito">${product.title}</p>
            <span class="precio-producto-carrito">${product.price}</span>
        </div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="icon-close">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6 18L18 6M6 6l12 12"/>
		</svg>`;

    rowProduct.append(containerProduct);
    total = total + parseInt(product.quantity * product.price.slice(1));
    totalOfProducts = totalOfProducts + product.quantity;
  });

  valorTotal.innerText = total;
  countProducts.innerText = totalOfProducts;
};
