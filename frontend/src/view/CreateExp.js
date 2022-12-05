import React from "react";

import Select from 'react-select';

export default function () {

  const categories = [
    { value: 'Food', label: 'Food' },
    { value: 'Household', label: 'Household' },
    { value: 'Social Life', label: 'Social Life' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Health', label: 'Health' },
    { value: 'Miscellaneous', label: 'Miscellaneous' },
  ];


  return (
    <div  class="card border bg-light w-60 shadow p-5" style={{position:'fixed', bottom:'10%', right:'23%', zIndex:1, width: "800px"}}>
      <h4>Create Expences</h4>

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
                />
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-end mt-5">
              <div className="col-2">
                <button type="submit" className="btn btn-danger px-4">
                  Cancel
                </button>
              </div>
              <div className="col-2 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary px-4">
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
