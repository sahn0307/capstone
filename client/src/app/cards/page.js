'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CardsPage() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCards();
  }, [currentPage]);

  const fetchCards = async () => {
    try {
      const response = await fetch(`/api/v1/cards?page=${currentPage}&per_page=20`);
      const data = await response.json();
      setCards(data.cards);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    const halfMax = Math.floor(maxButtons / 2);
    let startPage = currentPage - halfMax;
    let endPage = currentPage + halfMax;

    if (startPage < 1) {
      endPage += 1 - startPage;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    startPage = Math.max(startPage, 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`mr-2 px-4 py-2 rounded ${
            currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Magic Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="bg-white shadow rounded-lg p-4">
            <Image src={card.image_url} alt={card.name} width={200} height={280} />
            <h3 className="text-xl font-semibold mt-2">{card.name}</h3>
            <p className="text-gray-600">${card.price}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {renderPaginationButtons()}
      </div>
    </div>
  );
}