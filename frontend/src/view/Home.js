import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Select from 'react-select';
import swal from 'sweetalert';

import {getAllExpenses, getExpensesByCategory,deletExpences} from '../controllers/expense.js';
import CreateExpense from "./CreateExp.js";
import EditExpense from "./EditExpense.js";

export default function Home() {

  const [expenses, setExpenses] = useState([]);
  const [isCreateExpenePopUpActive, setIsCreateExpensePopupActive] = useState(false);
  const [isEditExpenePopUpActive, setIsEditExpensePopupActive] = useState(false);
  const [item, setItem] = useState({});

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
      } else {
        swal({
          title: "Error!",
          text: "Something went wrong with the network. Try reloading page",
          icon: 'error',
          dangerMode: true,
          button: true,
        })
        .then((reload) => {
            window.location.reload();
        });
      }
    }).catch ((err) => {
      swal({
          title: "Error!",
          text: "Something went wrong with the network. Try reloading page",
          icon: 'error',
          dangerMode: true,
          button: true,
      })
      .then((reload) => {
          window.location.reload();
      });
    });
  }, []);

  const onCategoryChange = async (e) => {
    getExpensesByCategory(e.value).then((res) => {
      if (res.isSuccess) {
        setExpenses(res.result)
      } else {
        swal({
          title: "Error!",
          text: "Something went wrong with the network. Try reloading page",
          icon: 'error',
          dangerMode: true,
          button: true,
        })
        .then((reload) => {
            window.location.reload();
        });
      }
    }).catch ((err) => {
      swal({
          title: "Error!",
          text: "Something went wrong with the network. Try reloading page",
          icon: 'error',
          dangerMode: true,
          button: true,
      })
      .then((reload) => {
          window.location.reload();
      });
    });
  }

  const onCreateExpense = async () => {
    await setIsCreateExpensePopupActive(true);
  }

  const onCloseHandler = async () => {
    await setIsCreateExpensePopupActive(false)
  }

  const onEditExpense = async (value) => {
    await setItem(value);
    await setIsEditExpensePopupActive(true);
  }

  function deleteExp(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletExpences(id).then((result) => {
          if (result.isSuccess) {
            swal("Poof! Your file has been deleted!", {
              icon: "success",
              title: "Delete Successfully!",
              buttons: false,
              timer: 2000,
            });
            window.location.reload();
          } else {
            swal({
              title: "Error!",
              text: "Something went wrong with the network. Try reloading page",
              icon: 'error',
              dangerMode: true,
              button: true,
            })
            window.location.reload();
          }
        }).catch ((err) => {
          swal({
              title: "Error!",
              text: "Something went wrong with the network. Try reloading page",
              icon: 'error',
              dangerMode: true,
              button: true,
          })
          .then((reload) => {
              window.location.reload();
          });
        });;     
      }
    });
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
      
      <div className="d-flex m-3">
      {expenses.map((value, index) =>{
        return (
          // <div className="row">
            <div className="col-3 m-3">
              <div className="card">


                <div className="card-body" key =  {index}>
                  
                    <div> 
                      
                    <h5> {value.title} </h5>    <h5> {value.date} </h5>
                      <h5> {value.des} </h5>
                      <h5> {value.category} </h5>
                      <h5> {value.amount} </h5>

                    </div>
              
                </div>

                <div className="card-footer"> 
                
                              <button
                                class="btn btn-pill btn-danger mx-3"
                                onClick={() => deleteExp(value._id)}
                              >
                                Delete
                              </button>
                              <button
                                class="btn btn-pill btn-success mx-3"
                                onClick={() => onEditExpense(value)}
                              >
                                Edit
                              </button>
                              </div>

              </div>
            </div>
          // </div>
        );
      })}
      </div>
      {isCreateExpenePopUpActive ? <CreateExpense onCloseHandler={onCloseHandler} /> : null}
      {isEditExpenePopUpActive ? <EditExpense onCloseHandler={onCloseHandler} item={item} /> : null}
    </ div>
  );
}
