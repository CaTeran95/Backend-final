const products = document.querySelector('#products');

const formatCartProduct = (product) => {
  const { images, name, stock, price, condition, _id } = product;
  const newProduct = document.createElement('div');
  newProduct.setAttribute('id', product._id);
  newProduct.innerHTML = `
    <div class="product">
      <img src=${images[0]} />
      <p>${name}</p>
      <p>Stock: ${stock}</p>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Condition: ${condition}</p>
      <button onclick="addToCart('${_id}')">Add to cart</button>
      <button onclick="removeFromCart('${_id}')">Remove from cart</button>
    </div>
  `;
  return newProduct;
};

const addToCart = async (id) => {
  try {
    await fetch(`/api/carts/add/${id}`, { method: 'PUT' });
    console.info(`Product #${id} added successfully`);
  } catch (error) {
    console.error(`There was an error adding the product to the cart`, error);
  }
};

const removeFromCart = async (id) => {
  try {
    await fetch(`/api/carts/remove/${id}`, { method: 'PUT' });
    console.info(`Product #${id} removed successfully`);
  } catch (error) {
    console.error(`There was an error adding the product to the cart`, error);
  }
};

const loadProducts = async () => {
  try {
    const list = await fetch('/api/products');
    const productsList = await list.json();
    productsList.forEach((product) => {
      const newProduct = formatCartProduct(product);
      products.appendChild(newProduct);
    });
  } catch (error) {
    console.error(error);
  }
};

loadProducts();
