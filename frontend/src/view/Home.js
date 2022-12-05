import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Select from 'react-select';

import {getAllExpenses, getExpensesByCategory} from '../controllers/expense.js';
import CreateExpense from "./CreateExp.js";

export default function Home() {

  const [expenses, setExpenses] = useState([]);
  const [isCreateExpenePopUpActive, setIsCreateExpensePopupActive] = useState(false);

  const categories = [
    { value: 'All', label: 'All' },
    { value: 'Food', label: 'Food' },
    { value: 'Household', label: 'Household' },
    { value: 'Social Life', label: 'Social Life' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Health', label: 'Health' },
    { value: 'Miscellaneous', label: 'Miscellaneous' },
  ];

  useEffect(() => {
    getAllExpenses().then((result) => {
      console.log(result.result);
      if (result.isSuccess) {
        setExpenses(result.result)
      }
    });
  }, []);

  const onCategoryChange = async (e) => {
    getExpensesByCategory(e.value).then((res) => {
      if (res.isSuccess) {
        setExpenses(res.result)
      }
    })
  }

  const onCreateExpense = async () => {
    console.log("ddddd")
    await setIsCreateExpensePopupActive(true);
  }

  return (
    <div className="my-3 mx-5">
      <div className="row d-flex justify-content-between mx-3">
        <div className="col-3">
        <Select
          isSearchable
          options={categories}
          onChange={onCategoryChange}
          defaultValue={categories[0]}
        />
        </div>
        <div className="col-3 d-flex flex-row-reverse">
          <button type="button" className="btn btn-primary px-5" onClick={onCreateExpense}>
            Create Expences
          </button>
        </div>
      </div>
      

      {expenses.map((bk) => {
        return (
          <div className="row">
            <div className="col-3">
              <div className="card">
                <div className="card-body"></div>

                <div className="card-footer"> </div>
              </div>
            </div>
          </div>
        );
      })}
      {isCreateExpenePopUpActive ? <CreateExpense /> : null}
    </ div>
  );
}
