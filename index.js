async function llamarAPI(url, config) {
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

const [metodo, recurso, ...datos] = process.argv.slice(2);

if (metodo === "GET" && recurso === "products") {
  await llamarAPI("https://fakestoreapi.com/products");
} else if (metodo === "GET" && (recurso || "").slice(0, 9) === "products/") {
  const productId = recurso.slice(9);
  await llamarAPI(`https://fakestoreapi.com/products/${productId}`);
} else if (metodo === "POST" && recurso === "products") {
  const [titulo, precio, categoria] = datos;
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titulo,
      price: precio,
      category: categoria,
    }),
  };
  await llamarAPI(`https://fakestoreapi.com/products`, config);
} else if (metodo === "DELETE" && (recurso || "").slice(0, 9) === "products/") {
  const productId = recurso.slice(9);
  const config = {
    method: "DELETE",
  };
  await llamarAPI(`https://fakestoreapi.com/products/${productId}`, config);
} else {
  console.log(
    'Comando no reconocido. Usa "GET, POST o DELETE products" o "GET, POST o DELETE products/:id".',
  );
}
