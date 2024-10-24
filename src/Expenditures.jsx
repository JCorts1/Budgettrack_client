import React, { useEffect, useState } from 'react';
import { fetchExpenditures, createExpenditure } from './api';
import months from './months'
import './styles/expenditures.css'

const Expenditures = ({ token }) => {
  const [expenditures, setExpenditures] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');
  const [expenditureFilter, setExpenditureFilter] = useState([]);

  useEffect(() => {
    setExpenditureFilter(expenditures)
  }, [expenditures])


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

  function handleFilterMonth(activeMonth) {
    const result = expenditures.filter(expense => (
      expense.month == activeMonth
    ))
    setExpenditureFilter(result)
  };

  return (
    <div className='expenditures-page'>
      <div className='months-area'>
        <h2>Months</h2>
        <div className='grid-months'>
          {months.map((m)=> (
            <button className='button-month' onClick={() => handleFilterMonth(m.date)} key={m.date}>{m.name}</button>
          ))};
        </div>
      </div>
      <div className='expenditures-area'>
      <h2>Expenditures</h2>
      <form className='expenditures-form' onSubmit={handleSubmit}>
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
        <input type="month" onChange={(e) => setMonth(e.target.value)}
          required min="2018-03" value={month} />
        <button type="submit">Add Expenditure</button>
      </form>
      <ul>
        {expenditureFilter.map((expenditure) => (
          <li key={expenditure.id}>
            {expenditure.category}: {expenditure.amount} (Month: {expenditure.month})
          </li>
        ))}
      </ul>
      <br />
      </div>
    </div>
  );
};

export default Expenditures;
