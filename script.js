var productos = [];
var productosTotales = {};

class Carrito {

    constructor(productos) {
        this.productosCarrito = productos;
        
        this.productosCarrito.forEach(producto => {
            producto['units'] = 0;
            producto['total'] = 0;
        });
    }

    actualizarUnidades(sku, unidades, tipo) {
        if (tipo == 3){
            this.productosCarrito.forEach(producto => {
                if (producto.SKU == sku){
                    producto['units'] = ++unidades;
                    producto['total'] = Number((Number(producto['price']) * producto['units']).toFixed(2));
                }
            });
        }if (tipo == 2) {
            this.productosCarrito.forEach(producto => {
                if (producto.SKU == sku){
                    producto['units'] = --unidades;
                    producto['total'] = Number((Number(producto['price']) * producto['units']).toFixed(2));
                    if (producto['units'] < 0){
                        producto['units'] = 0;
                        producto['total'] = Number((Number(producto['price']) * producto['units']).toFixed(2));
                    }
                }
            });
        }else {
            this.productosCarrito.forEach(producto => {
                if (producto.SKU == sku){
                    if (unidades >= 0) {
                        producto['units'] = Number(unidades);
                        producto['total'] = Number((Number(producto['price']) * producto['units']).toFixed(2));
                    }else{
                        producto['units'] = 0;
                        producto['total'] = Number((Number(producto['price']) * producto['units']).toFixed(2));
                    }
                }
            });
        }
    }
    
    obtenerInformacionProducto(sku) {
       
    }

    obtenerCarrito() {
        let productosCalculados = {total: 0, productosTotal:[]};
        
        this.productosCarrito.forEach(producto => {
            if (producto['units'] > 0){
                productosCalculados['total'] += Number(producto['total'].toFixed(2));
                productosCalculados['productosTotal'].push(producto);
            }
        });
        productosCalculados['total'] = Number(productosCalculados['total'].toFixed(2));

        return productosCalculados;
    }
}


document.addEventListener('DOMContentLoaded', function(event) {

    function cargarCarrito(productos){
        const tablaProductos = document.getElementById('cuerpoTabla');
        const productosCarrito = document.getElementById('productosCarrito');

        productos.productosCarrito.forEach(producto => {
            const descripcion = document.createElement('td');
            const descripcion2 = document.createElement('h3');

            descripcion2.innerText = producto.title;

            descripcion.append(descripcion2);

            const id = document.createElement('p');
            id.innerText = 'REF: ' + producto.SKU;
            descripcion.append(id);

            const cantidad = document.createElement('td');

            const precio = document.createElement('td');
            precio.innerText = producto.price + '€';

            const total = document.createElement('td');
            total.innerText = '0.00€';

            const btnRestar = document.createElement('button');
            btnRestar.innerText = "-";

            const unidades = document.createElement('input');
        
            unidades.setAttribute('value','0');
            unidades.setAttribute('min','0');

            unidades.addEventListener('input', function(event){
                productos.actualizarUnidades(producto.SKU, unidades.value, 1);
                
                unidades.value = producto.units;
                total.innerText = producto.total + '€';

                document.getElementById('productosCarrito').innerHTML = '';
                productos.obtenerCarrito()['productosTotal'].forEach(producto => {
                    const salto = document.createElement('p');

                    const productoCalculado = document.createElement('span');
                    productoCalculado.innerText = producto['units'] + ' X ' + producto['title'];

                    const unidadesPrecio = document.createElement('span');
                    unidadesPrecio.innerText = producto['units'] + ' X ' + producto['price'] + '€';

                    salto.append(productoCalculado, unidadesPrecio);

                    productosCarrito.append(salto);
                });

                const totalFinal = document.getElementById('totalFinal');
                totalFinal.innerText = productos.obtenerCarrito()['total'] + '€';
            });

            const btnSumar = document.createElement('button');
            btnSumar.innerText = "+";

            btnRestar.classList.add('cantidad');
            unidades.classList.add('cantidad');
            btnSumar.classList.add('cantidad');

            btnRestar.addEventListener('click', function(event){
                productos.actualizarUnidades(producto.SKU, producto.units, 2);
        
                unidades.value = producto.units;
                total.innerText = producto.total + '€';

                document.getElementById('productosCarrito').innerHTML = '';
                productos.obtenerCarrito()['productosTotal'].forEach(producto => {
                    const salto = document.createElement('p');

                    const productoCalculado = document.createElement('span');
                    productoCalculado.innerText = producto['units'] + ' X ' + producto['title'];

                    const unidadesPrecio = document.createElement('span');
                    unidadesPrecio.innerText = producto['units'] + ' X ' + producto['price'] + '€';

                    salto.append(productoCalculado, unidadesPrecio);

                    productosCarrito.append(salto);
                });

                const totalFinal = document.getElementById('totalFinal');
                totalFinal.innerText = productos.obtenerCarrito()['total'] + '€';
            });

            btnSumar.addEventListener('click', function(event){
                productos.actualizarUnidades(producto.SKU, producto.units, 3);
                
                unidades.value = producto.units;
                total.innerText = producto.total + '€';

                document.getElementById('productosCarrito').innerHTML = '';
                productos.obtenerCarrito()['productosTotal'].forEach(producto => {
                    const salto = document.createElement('p');

                    const productoCalculado = document.createElement('span');
                    productoCalculado.innerText = producto['units'] + ' X ' + producto['title'];

                    const unidadesPrecio = document.createElement('span');
                    unidadesPrecio.innerText = producto['units'] + ' X ' + producto['price'] + '€';

                    salto.append(productoCalculado, unidadesPrecio);

                    productosCarrito.append(salto);
                });

                const totalFinal = document.getElementById('totalFinal');
                totalFinal.innerText = productos.obtenerCarrito()['total'] + '€';
            });

            cantidad.append(btnRestar,unidades,btnSumar);

            const tr = document.createElement('tr');
            tr.append(descripcion, cantidad, precio,total);

            tablaProductos.append(tr);

        });
    }

    fetch('https://jsonblob.com/api/1301652824818311168')
        .then(response => response.json())
            .then(registros => {
                const carrito = new Carrito(registros.products);
                cargarCarrito(carrito);
                
            });

});
