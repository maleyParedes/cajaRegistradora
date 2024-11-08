document.addEventListener('DOMContentLoaded', () => {
  const productos = document.getElementById('productos');
  const productoImagen = document.getElementById('productoImagen');
  const precioSeleccionado = document.getElementById('precioSeleccionado');
  const productotxt = document.getElementById('productotxt');
  const cantidadProducto = document.getElementById('cantidadProducto');
  const agregarBtn = document.getElementById('agregar');
  const limpiarBtn = document.getElementById('limpiar');
  const registroCompra = document.getElementById('registroCompra');
  const totalComp = document.getElementById('totalComp');

  let total = 0;

  // Cambiar imagen y precio cuando seleccionas un producto
  productos.addEventListener('change', (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const price = selectedOption.getAttribute('data-price');
      const image = selectedOption.getAttribute('data-image');

      if (price && image) {
          productoImagen.src = image;
          productoImagen.style.display = 'block';
          precioSeleccionado.textContent = `Precio: $${price}`;
          productotxt.value = selectedOption.text;
      } else {
          productoImagen.style.display = 'none';
          precioSeleccionado.textContent = 'Precio: -';
          productotxt.value = '';
      }
  });

  // Agregar productos a la compra
  agregarBtn.addEventListener('click', () => {
      const selectedOption = productos.options[productos.selectedIndex];
      const price = parseFloat(selectedOption.getAttribute('data-price'));
      const cantidad = parseInt(cantidadProducto.value);

      if (selectedOption.value !== 'value0' && cantidad > 0) {
          const subtotal = price * cantidad;
          total += subtotal;

          registroCompra.value += `${selectedOption.text}: ${cantidad} x $${price} = $${subtotal}\n`;
          totalComp.textContent = `Total: $${total}`;
          cantidadProducto.value = ''; // Limpiar campo de cantidad
          Toastify({
              text: "Compra agregada",
              duration: 3000
          }).showToast();
      } else {
          Swal.fire("Por favor selecciona un producto y una cantidad válida.");
      }
  });

  // Limpiar el total y reiniciar selección del producto
  limpiarBtn.addEventListener('click', () => {
      total = 0;
      totalComp.textContent = 'Total: $0';
      productos.selectedIndex = 0;
      productoImagen.style.display = 'none';
      precioSeleccionado.textContent = 'Precio: -';
      productotxt.value = '';
      registroCompra.value = ''; // Limpiar el registro de compras
  });
});
