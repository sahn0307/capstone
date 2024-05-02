'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

export default function CollectionPage() {
  const { user } = useAuth();
  const [userCards, setUserCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserCards(user.id);
    }
  }, [user, searchQuery]);

  const fetchUserCards = async (userId) => {
    try {
      const response = await fetch(`/api/v1/user-cards?user_id=${userId}&search=${searchQuery}`);
      const data = await response.json();
      setUserCards(data);
    } catch (error) {
      console.error('Error fetching user cards:', error);
    }
  };

  const handleQuantityChange = async (userCardId, quantity) => {
    try {
      await fetch(`/api/v1/user-cards/${userCardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      fetchUserCards(user.id);
    } catch (error) {
      console.error('Error updating user card quantity:', error);
    }
  };

  const handleRemoveCard = async (userCardId) => {
    try {
      await fetch(`/api/v1/user-cards/${userCardId}`, {
        method: 'DELETE',
      });
      fetchUserCards(user.id);
    } catch (error) {
      console.error('Error removing user card:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">My Collection</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by card name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userCards.map((userCard) => (
          <div key={userCard.id} className="bg-white shadow rounded-lg p-4">
            <Image src={userCard.image_url} alt={userCard.name} width={200} height={280} />
            <h3 className="text-xl font-semibold mt-2">{userCard.name}</h3>
            <p className="text-gray-600">${userCard.price}</p>
            <div className="mt-4">
              <label htmlFor={`quantity-${userCard.id}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${userCard.id}`}
                value={userCard.quantity}
                onChange={(e) => handleQuantityChange(userCard.id, parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 ml-2"
              />
            </div>
            <button
              onClick={() => handleRemoveCard(userCard.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}