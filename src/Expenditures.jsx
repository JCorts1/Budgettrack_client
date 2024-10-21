import React, { useEffect, useState } from 'react';
import { fetchExpenditures, createExpenditure } from './api';

const Expenditures = ({ token }) => {
  const [expenditures, setExpenditures] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetchExpenditures(token);
      setExpenditures(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExpenditure({ expenditure: { amount, category, month } }, token);
      fetchData(); // Refresh the list after adding an expenditure
      setAmount('');
      setCategory('');
      setMonth('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Expenditures</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Month (1-12)"
          required
        />
        <button type="submit">Add Expenditure</button>
      </form>
      <ul>
        {expenditures.map((expenditure) => (
          <li key={expenditure.id}>
            {expenditure.category}: {expenditure.amount} (Month: {expenditure.month})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenditures;
