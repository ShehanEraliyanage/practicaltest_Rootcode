import React, { useEffect, useState } from "react";

import Select from 'react-select';
import swal from 'sweetalert';

import {addExpense} from '../controllers/expense.js';

export default function (props) {

  const categories = [
    { value: 'Food', label: 'Food' },
    { value: 'Household', label: 'Household' },
    { value: 'Social Life', label: 'Social Life' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Health', label: 'Health' },
    { value: 'Miscellaneous', label: 'Miscellaneous' },
  ];

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [des, setDes] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
        setTitle(props.item.title);
        setCategory(props.item.category);
        setAmount(props.item.amount);
        setDes(props.item.des);
        setDate(props.item.date);
  }, [props.item]);

  const closeOnClickHandler = (e) => {
    e.preventDefault();
    props.onCloseHandler();
  }

  const onChangeCategory = (e) => {
    setCategory(e.value)
  }

  const onAddExpense = (e) => {
    e.preventDefault();

    if (title == "") {
      swal("Please enter a title")
    } else if (category == "") {
      swal("Please select a category")
    } else if (des == "") {
      swal("Please enter a description")
    } else if (amount == "") {
      swal("Please enter the amount you spent")
    } else if (isNaN(amount)) {
      swal("Please enter a  valid amount")
    }else if (date == "") {
      swal("Please enter the date")
    } else {
      const newExpense = {
        title: title,
        category: category,
        des: des,
        amount: amount,
        date: date
      }
      addExpense(newExpense).then((result) => {
        console.log(result);
        if (result.isSuccess) {
          swal({
            title: "Success!",
            text: "Expense added successfully",
            icon: 'success',
            timer: 2000,
            button: false,
          });
        } else {
          swal({
            title: "Error!",
            text: "Something went wrong went wrong. Try again",
            icon: 'error',
            dangerMode: true,
            button: false,
          })
        }
        window.location.reload();
      })
    }
  }

  return (
    <div  class="card border bg-light w-60 shadow p-5" style={{position:'fixed', bottom:'15%', right:'23%', zIndex:1, width: "800px"}}>
      <h4>Create Expence</h4>

      <div>
        <form>
          <fieldset>
            <div className="row mb-3 d-flex justify-content-between">
              <div className="col">
                <label for="disabledTextInput" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Enter the title"
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="col">
                <label for="disabledTextInput" className="form-label">
                  Category
                </label>
                <Select
                  isSearchable
                  options={categories}
                  defaultValue={categories[0]}
                  onChange={onChangeCategory}
                  value = {
                    categories.filter(option => 
                       option.label === category)
                }
                />
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-between">
              <div className="col">
                <label for="disabledTextInput" className="form-label">
                  Description
                </label>
                <textarea 
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Enter the title"
                  rows="4"
                  onChange={e => setDes(e.target.value)}
                  value={des}
                />
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-between">
              <div className="col">
                <label for="disabledTextInput" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Enter the title"
                  onChange={e => setDate(e.target.value)}
                  value={date}
                />
              </div>
              <div className="col">
                <label for="disabledTextInput" className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Enter the amount spent"
                  onChange={e => setAmount(e.target.value)}
                  value={amount}
                />
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-end mt-5">
              <div className="col-2">
                <button className="btn btn-danger px-4" onClick={closeOnClickHandler}>
                  Cancel
                </button>
              </div>
              <div className="col-2 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary px-4" onClick={onAddExpense}>
                  Submit
                </button>
              </div>
            </div>
            
          </fieldset>
        </form>
      </div>
    </ div>
  );
}
