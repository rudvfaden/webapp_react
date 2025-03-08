import React, { useState } from 'react';
import api from '../api';

const FruitForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [fruits, setFruits] = useState<string[]>([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await api.post('/fruits', { name });
            console.log('Fruit added:', response.data);
            setName('');
        } catch (error) {
            console.error('Error adding fruit:', error);
        }
    };

    const handleGetFruits = async () => {
        try {
            const response = await api.get('/fruits');
            if (response.data && Array.isArray(response.data.fruits)) {
                setFruits(response.data.fruits);
            } else {
                console.error('Unexpected response format:', response.data);
            }
            console.log('Fruits fetched:', response.data);
        } catch (error) {
            console.error('Error fetching fruits:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="submit">Add Fruit</button>
            </form>
            <button onClick={handleGetFruits}>Get Fruits</button>
            <ul>
                {Array.isArray(fruits) ? (
                    fruits.map((fruit, index) => (
                        <li key={index}>{fruit}</li>
                    ))
                ) : (
                    <li>Error: Fruits data is not an array</li>
                )}
            </ul>
        </div>
    );
};

export default FruitForm;
