const products = document.querySelector('#products');

const formatCartProduct = (product) => {
  const { productID, quantity } = product;
  const { images, name, stock, price, _id } = productID;
  const newProduct = document.createElement('div');
  newProduct.setAttribute('id', _id);
  newProduct.innerHTML = `
    <div class="product">
      <img src=${images[0]} />
      <h3 id="qty${_id}">Quantity ${quantity}</h3>
      <p>${name}</p>
      <p>Stock: ${stock}</p>
      <p>Price: ${price.toFixed(2)}</p>
      <button onclick="addToCart('${_id}', ${quantity})">Add to cart</button>
      <button onclick="removeFromCart('${_id}', ${quantity})">Remove from cart</button>
      <button onclick="deleteFromCart('${_id}')">Delete from cart</button>
    </div>
  `;
  return newProduct;
};

const addToCart = async (id, qty) => {
  try {
    const res = await fetch(`/api/carts/add/${id}`, { method: 'PUT' });
    const quantity = document.querySelector(`#qty${id}`);
    quantity.innerHTML = `Quantity ${qty + 1}`;
  } catch (error) {
    console.error(`There was an error adding the product to the cart`, error);
  }
};

const removeFromCart = async (id, qty) => {
  try {
    await fetch(`/api/carts/remove/${id}`, { method: 'PUT' });
    const quantity = document.querySelector(`#qty${id}`);
    quantity.innerHTML = `Quantity ${qty - 1}`;
  } catch (error) {
    console.error(
      `There was an error removing the product from the cart`,
      error,
    );
  }
};

const deleteFromCart = async (id) => {
  try {
    await fetch(`/api/carts/delete/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error(
      `There was an error deleting the product from the cart`,
      error,
    );
  }
};

const loadProducts = async () => {
  try {
    const res = await fetch('/api/carts/self');
    const { list } = await res.json();
    list.forEach((product) => {
      const newProduct = formatCartProduct(product);
      products.appendChild(newProduct);
    });
  } catch (error) {
    console.error(error);
  }
};

loadProducts();
