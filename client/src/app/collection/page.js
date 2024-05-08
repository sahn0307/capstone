'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CollectionPage() {
  const { user } = useAuth();
  const [userCards, setUserCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [isAddingOrBuying, setIsAddingOrBuying] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserCards(user.id);
    }
  }, [user, searchQuery]);

  const fetchUserCards = async (userId) => {
    try {
      console.log('fetchUserCards called with userId:', userId);
      const response = await fetch(`/api/v1/user-cards?user_id=${userId}&search=${searchQuery}`);
      const data = await response.json();
      console.log('Response data:', data);
      setUserCards(data);
      console.log('userCards state after setting:', data);
    } catch (error) {
      toast.error('Error fetching user cards:', error);
    }
  };

  const handleAddOrBuyMore = (card) => {
    setSelectedCard(card);
    setQuantity(1);
    setPrice(card.price ? card.price.toFixed(2) : 0);
    setIsAddingOrBuying(true);
  };

  const handleSellOrRemove = (card) => {
    setSelectedCard(card);
    setQuantity(1);
    setPrice(card.price ? card.price.toFixed(2) : 0);
    setIsAddingOrBuying(false);
  };
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handleSubmitTransaction = async () => {
    try {
      if (selectedCard) {
        const { id: userCardId, card_id: cardId, name: cardName, quantity: currentQuantity } = selectedCard;

        // Create a new transaction
        await fetch('/api/v1/transactions', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.id,
            card_id: cardId,
            card_name: cardName,
            quantity: quantity,
            buy_price: isAddingOrBuying ? price : undefined,
            sell_price: !isAddingOrBuying ? price : undefined,
          }),
        });

        // Update the quantity in the user's collection
        await fetch(`/api/v1/user-cards/${userCardId}`, {
          method: 'PUT',
          headers: {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quantity: isAddingOrBuying ? currentQuantity + quantity : currentQuantity - quantity,
          }),
        });

        setSelectedCard(null);
        setQuantity(1);
        setPrice(0);

        fetchUserCards(user.id);

      toast.success(`Card ${isAddingOrBuying ? 'added/bought' : 'sold/removed'} successfully`);
    }
  } catch (error) {
    toast.error('Error submitting transaction:', error);
  }
};

  const handleCancelTransaction = () => {
    setSelectedCard(null);
    setQuantity(1);
    setPrice(0);
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
        {userCards && userCards.length > 0 ? (
          userCards.map((userCard) => (
            <div key={userCard.id} className="bg-white shadow rounded-lg p-4">
              <Image src={userCard.image_url} alt={userCard.name} width={200} height={280} />
              <h3 className="text-xl font-semibold mt-2">{userCard.name}</h3>
              <p className="text-gray-600">{userCard.price ? `$${userCard.price.toFixed(2)}` : 'No Price Available'}</p>
              <p className="mt-2">Quantity: {userCard.quantity}</p>
              <div className="mt-4">
                {selectedCard && selectedCard.id === userCard.id ? (
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 mr-2"
                    />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 mr-2"
                    />
                    <button
                      onClick={handleSubmitTransaction}
                      className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                    >
                      {isAddingOrBuying ? 'Add/Buy' : 'Sell/Remove'}
                    </button>
                    <button
                      onClick={handleCancelTransaction}
                      className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        handleAddOrBuyMore(userCard);
                        setIsAddingOrBuying(true);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                    >
                      Add/Buy More
                    </button>
                    <button
                      onClick={() => {
                        handleSellOrRemove(userCard);
                        setIsAddingOrBuying(false);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Sell/Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No cards found in your collection.</p>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}