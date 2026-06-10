# MODELO DE DATOS KIOSCONM

## Usuario

idUsuario
nombre
apellido
contrasena
rol

## Proveedor

idProveedor
nombre
telefono

## Producto

idProducto
nombre
precioVenta
precioCosto
stock
categoria
idProveedor

## Venta

idVenta
fecha
total
metodoPago
idUsuario

## Detalle_Venta

idDetalle
cantidad
subtotal
idVenta
idProducto

## Caja

idCaja
fechaApertura
fechaCierre
saldoInicial
saldoFinal
estado

## Movimiento_Caja

idMovimiento
tipo
monto
descripcion
fecha
idCaja
idUsuario