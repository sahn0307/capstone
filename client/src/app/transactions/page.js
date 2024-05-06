'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function TransactionsPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/v1/transactions?user_id=${user.id}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Card Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Buy Price</th>
            <th className="py-2 px-4 border-b">Sell Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="py-2 px-4 border-b">{transaction.card_name}</td>
              <td className="py-2 px-4 border-b">{transaction.quantity}</td>
              <td className="py-2 px-4 border-b">{transaction.buy_price}</td>
              <td className="py-2 px-4 border-b">{transaction.sell_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}