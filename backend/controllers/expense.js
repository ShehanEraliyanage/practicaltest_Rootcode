import {Expense} from '../models/expense.js';

export const addExpense = async (req, res) => {

    const title = req.body.title;
    const category = req.body.category;
    const des = req.body.des;
    const amount = req.body.amount;
    const date = req.body.date;
    
    let newExpense = new Expense({
        title, category, des, amount, date
    })

    await newExpense.save().then((res) =>{
        res.json({
            isSuccess: true,
            result: res
        });
    }).catch(err => {
        console.error(err);
        res.json({
            isSuccess: false,
            result: err
        });
    })
}

export const getAllExpenses = async (req, res) => {
    await Expense.find().then((res)=>{
        res.json({
            isSuccess: true,
            result: res
        });
    }).catch(err => {
        console.error(err);
        res.json({
            isSuccess: false,
            result: err
        });
    })
}

export const getExpensesByCategory = async (req, res) => {
    const category = req.params.category;
    await Expense.find({category: category}).then((res)=>{
        res.json({
            isSuccess: true,
            result: res
        });
    }).catch(err => {
        console.error(err);
        res.json({
            isSuccess: false,
            result: err
        });
    })
}

export const deleteExpense = async (req, res) => {
    const id = req.params.id;
    await Expense.findByIdAndDelete(id).then((res)=>{
        res.json({
            isSuccess: true,
            result: res
        });
    }).catch(err => {
        console.error(err);
        res.json({
            isSuccess: false,
            result: err
        });
    })   
}

export const editExpense = async (req, res) => {

    const id = req.params.id;
    const {title, category, des, amount, date}=req.body;
    const updateItem={
        title, category, des, amount, date
    }
    await Expense.findByIdAndUpdate(id,updateItem).then((res)=>{
        res.json({
            isSuccess: true,
            result: res
        });
    }).catch(err => {
        console.error(err);
        res.json({
            isSuccess: false,
            result: err
        });
    }) 
}