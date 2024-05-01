'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

export default function CardsPage() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCards();
    if (user) {
      fetchUserCards();
    }
  }, [currentPage, user]);

  const fetchCards = async () => {
    try {
      const response = await fetch(`/api/v1/cards?page=${currentPage}&per_page=50`);
      const data = await response.json();
      setCards(data.cards);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const fetchUserCards = async () => {
    try {
      const response = await fetch(`/api/v1/user-cards?user_id=${user.id}`);
      const data = await response.json();
      setUserCards(data);
    } catch (error) {
      console.error('Error fetching user cards:', error);
    }
  };

  const handleAddToCollection = async (cardId) => {
    try {
      await fetch('/api/v1/user-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.id, card_id: cardId }),
      });
      fetchUserCards();
    } catch (error) {
      console.error('Error adding card to collection:', error);
    }
  };

  const handleQuantityChange = async (userCardId, quantity) => {
    try {
      if (quantity === 0) {
        await fetch(`/api/v1/user-cards/${userCardId}`, {
          method: 'DELETE',
        });
      } else {
        await fetch(`/api/v1/user-cards/${userCardId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity }),
        });
      }
      fetchUserCards();
    } catch (error) {
      console.error('Error updating user card quantity:', error);
    }
  };

  const isCardInCollection = (cardId) => {
    return userCards.some((userCard) => userCard.card_id === cardId);
  };

  const getUserCardQuantity = (cardId) => {
    const userCard = userCards.find((userCard) => userCard.card_id === cardId);
    return userCard ? userCard.quantity : 0;
  };

  const renderCardActions = (card) => {
    const userCard = userCards.find((userCard) => userCard.card_id === card.id);

    if (userCard) {
      return (
        <div className="mt-4">
          <button
            onClick={() => handleQuantityChange(userCard.id, userCard.quantity - 1)}
            className="px-2 py-1 bg-red-500 text-white rounded mr-2"
          >
            -
          </button>
          <span>{userCard.quantity}</span>
          <button
            onClick={() => handleQuantityChange(userCard.id, userCard.quantity + 1)}
            className="px-2 py-1 bg-green-500 text-white rounded ml-2"
          >
            +
          </button>
        </div>
      );
    } else {
      return (
        <button
          onClick={() => handleAddToCollection(card.id)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add to Collection
        </button>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Magic Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {cards.map((card) => (
          <div key={card.id} className="bg-white shadow rounded-lg p-4">
            <Image src={card.image_url} alt={card.name} width={200} height={280} />
            <h3 className="text-l font-semibold mt-2">{card.name}</h3>
            <p className="text-gray-600">${card.price}</p>
            {user && renderCardActions(card)}
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-8 flex justify-center">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`px-4 py-2 mx-1 rounded ${
        currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}
    >
      {index + 1}
    </button>
  ))}
</div>
    </div>
  );

  
}