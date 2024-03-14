// ExpenseCard.js
import React from 'react';

const ExpenseCard = (props) => {
  const { title, amount, deleteItem, id, setEditId } = props;
  const cardClass = amount > 0 ? "positive" : "negative";
  
  const handleDelete = () => {
    deleteItem(id);
  };

  const handleEdit = () => {
    setEditId(id);
  };

  return (
    <div className="expense-card-container">
      <div className={`expense-card ${cardClass}`}>
        <h4>{title}</h4>
        <p>{amount}</p>
      </div>
      <button className='edit-button' onClick={handleEdit}>Edit</button>
      <button className='del-button' onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ExpenseCard;
