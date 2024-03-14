// App.js
import React, { useState } from 'react';
import ExpenseCard from "./components/ExpenseCard";
import ExpenseForm from "./components/ExpenseForm";

const App = () => {
  const [list, setList] = useState([
   
  ]);
  const [editId, setEditId] = useState(null);
  
  const income = list.reduce((total, item) => item.amount > 0 ? total + item.amount : total, 0);
  const expense = list.reduce((total, item) => item.amount < 0 ? total + item.amount : total, 0);

  const itemToEdit = list.find(item => item.id === editId);

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const addItem = (title, amount) => {

    fetch('http://localhost:4000/expense-create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: title,
        amount: parseInt(amount),
        date: '12-03-2024'
      })
    }).then((res) => {
      console.log('success', res)
      setUpdate(update+1)
    })
    .catch((err) => {
      console.log('error', err)
    })

    const newItem = {
      id: list.length + 1,
      title: title,
      amount: parseFloat(amount)
    };
    setList([...list, newItem]);
  };
  const editItem=(title,amount)=>{

    fetch('http://localhost:4000/expense-update', {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: title,
        amount: parseInt(amount),
        date: '12-03-2024'
      })
    }).then((res) => {
      console.log('success', res)
      setUpdate(update+1)
    })
    .catch((err) => {
      console.log('error', err)
    })


    const res=list.map((item)=>{
      if(item.id===editId){
        item.title=title;
        item.amount=parseInt(amount);
      }
      return item;
    });
    setList[res];
  }
  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="income-expense-container">
        <div>
          <h4>Income</h4>
          <p className='income'>{income}</p>
        </div>
        <div>
          <h4>Expense</h4> 
          <p className='expense'>{expense}</p>
        </div>
      </div>
      <ExpenseForm addItem={addItem} itemToEdit={itemToEdit} />
      <h1>History</h1>
      <div className="list-container">
        {list.map((expense) => (
          <ExpenseCard
            key={expense.id}
            id={expense.id}
            deleteItem={deleteItem}
            title={expense.title}
            amount={expense.amount}
            setEditId={setEditId}
          /> 
        ))}
      </div>
    </div>
  );
};

export default App;
