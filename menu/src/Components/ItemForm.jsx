import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postMenu } from '../redux/reducer';

function ItemForm() {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemAmm, setItemAmm] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemName && itemPrice && itemAmm) {
            dispatch(postMenu({ name: itemName, price: parseFloat(itemPrice), Ammount: parseInt(itemAmm) }));
            
            setItemName('');
            setItemPrice('');
            setItemAmm('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ marginTop: 0 }}>Add New Item</h2>
            <input 
                type="text" 
                name="itemName" 
                placeholder="Item Name" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} 
                required
            />
            <input 
                type="number" 
                name="itemPrice" 
                placeholder="Item Price" 
                value={itemPrice} 
                onChange={(e) => setItemPrice(e.target.value)}
                step="0.01"
                min="0"
                required
            />
            <input 
                type="number" 
                name='Ammount' 
                placeholder='Item Amount' 
                value={itemAmm} 
                onChange={(e) => setItemAmm(e.target.value)}
                min="1"
                required
            />
            <button type="submit">Add Item</button>
        </form>
    );
}

export default ItemForm;