import React, { useState, useEffect } from 'react';

const ExpenseForm = (props) => {
    const { addItem, itemToEdit } = props;
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        if (itemToEdit) {
            setTitle(itemToEdit.title);
            setAmount(itemToEdit.amount);
        }
    }, [itemToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem(title, parseFloat(amount));
        setTitle("");
        setAmount(0);
    };

    return (
        <div className="add-expense-container">
            <h3>{itemToEdit ? "Edit" : "Add New"} Transaction</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="text"
                        className="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button className='add-button' type="submit">{itemToEdit ? 'Save' : 'Add'}</button>
            </form>
        </div>
    );
};

export default ExpenseForm;