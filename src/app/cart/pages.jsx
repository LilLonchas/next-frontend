import { useEffect, useState } from 'react';

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch('/api/cart');
            const data = await response.json();
            setCartItems(data);
        };

        fetchCart();
    }, []);

    return (
        <div>
            <h1>Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.product.name} - Cantidad: {item.quantity}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
