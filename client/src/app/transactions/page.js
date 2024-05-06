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
      <div className="bg-white shadow-md rounded-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Card Name</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">Quantity</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-right">Buy Price</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-right">Sell Price</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2 px-4 border-b text-left">{transaction.card_name}</td>
                <td className="py-2 px-4 border-b text-center">{transaction.quantity}</td>
                <td className="py-2 px-4 border-b text-right">
                  {transaction.buy_price ? `$${transaction.buy_price.toFixed(2)}` : '-'}
                </td>
                <td className="py-2 px-4 border-b text-right">
                  {transaction.sell_price ? `$${transaction.sell_price.toFixed(2)}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}