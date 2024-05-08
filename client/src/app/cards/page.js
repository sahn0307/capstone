'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CardsPage() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCards, setTotalCards] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buyPrice, setBuyPrice] = useState(0);

  useEffect(() => {
    fetchCards();
    if (user) {
      fetchUserCards();
    }
  }, [currentPage, user, searchQuery]);

  const fetchCards = async () => {
    try {
      const response = await fetch(`/api/v1/cards?page=${currentPage}&per_page=20&search=${searchQuery}`);
      const data = await response.json();
      setCards(data.cards);
      setTotalPages(data.total_pages);
      setTotalCards(data.total_cards);
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

  const handleAddToCollection = (card) => {
    setSelectedCard(card);
    setQuantity(1);
    setBuyPrice(card.price ? card.price.toFixed(2) : 0);
  };

  const handleCancel = () => {
    setSelectedCard(null);
    setQuantity(1);
    setBuyPrice(0);
  };
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handleSubmit = async () => {
    try {
      // Create a new transaction
      await fetch('/api/v1/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCookie('csrf_access_token'),
        },
        body: JSON.stringify({
          user_id: user.id,
          card_id: selectedCard.id,
          quantity,
          buy_price: buyPrice,
          card_name: selectedCard.name,
        }),
      });

      // Add the card to the user's collection or update the quantity
      await fetch('/api/v1/user-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCookie('csrf_access_token'),
        },
        body: JSON.stringify({
          user_id: user.id,
          card_id: selectedCard.id,
          quantity,
        }),
      });

      // Reset the selected card and form values
      handleCancel();

      // Fetch the updated user cards
      fetchUserCards();

    toast.success('Card added to collection successfully');
  } catch (error) {
    console.error('Error adding card to collection:', error);
    toast.error('Failed to add card to collection');
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
    if (selectedCard && selectedCard.id === card.id) {
      return (
        <div className="mt-4">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 ml-2"
          />
          <label htmlFor="buyPrice">Buy Price:</label>
          <input
            type="number"
            id="buyPrice"
            min="0"
            step="0.01"
            value={buyPrice}
            onChange={(e) => setBuyPrice(parseFloat(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 ml-2"
          />
          <button
            onClick={handleCancel}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded ml-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-2 py-1 bg-blue-500 text-white rounded ml-2"
          >
            Submit
          </button>
        </div>
      );
    } else if (isCardInCollection(card.id)) {
      return (
        <div className="mt-4">
          <span>Amount in collection: {getUserCardQuantity(card.id)}</span>
        </div>
      );
    } else {
      return (
        <button
          onClick={() => handleAddToCollection(card)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add to Collection
        </button>
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    return (
      <div className="mt-8 flex justify-center items-center">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4">
          {(currentPage - 1) * 20 + 1} - {Math.min(currentPage * 20, totalCards)} of {totalCards} cards
          {searchQuery && ` where the name includes "${searchQuery}"`}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Last
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Magic Cards</h1>
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
        {cards.map((card) => (
          <div key={card.id} className="bg-white shadow rounded-lg p-4">
            <Image src={card.image_url} alt={card.name} width={200} height={280} />
            <h3 className="text-xl font-semibold mt-2">{card.name}</h3>
            <p className="text-gray-600">{card.price ? `$${card.price.toFixed(2)}` : 'No Price Available'}</p>
            {user && renderCardActions(card)}
          </div>
        ))}
      </div>
      {renderPaginationButtons()}
      <ToastContainer />
    </div>
  );
}