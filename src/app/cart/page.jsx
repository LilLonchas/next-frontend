'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/cart.css';  // Asegúrate de tener este archivo de estilos

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  // Función para actualizar el total del carrito
  const calculateTotal = (cart) => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);  // Sumamos el precio * cantidad
    setTotal(totalPrice);
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;  // No permitir cantidades menores que 1
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Eliminar cantidad del carrito
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="cart-container">
      <h1>🛒 Tu Carrito</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image || '/images/default-product.jpg'}
                alt={item.name}
                className="cart-image"
              />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                {/* Cantidad */}
                <div className="quantity-container">
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                ❌ Eliminar
              </button>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={() => router.push('/checkout')}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
