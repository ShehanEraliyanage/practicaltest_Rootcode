import {Expense} from '../models/expense.js';

export const addExpense = async (req, res) => {

    console.log(req.body)
    const title = req.body.title;
    const category = req.body.category;
    const des = req.body.des;
    const amount = req.body.amount;
    const date = req.body.date;
    
    let newExpense = new Expense({
        title, category, des, amount, date
    })

    await newExpense.save().then((resu) =>{
        res.json({
            isSuccess: true,
            result: resu
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
    await Expense.find().then((resu)=>{
        res.json({
            isSuccess: true,
            result: resu
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
    if (category == "All") {
        await Expense.find().then((resu)=>{
            res.json({
                isSuccess: true,
                result: resu
            });
        }).catch(err => {
            console.error(err);
            res.json({
                isSuccess: false,
                result: err
            });
        })
    } else {
        await Expense.find({category: category}).then((resu)=>{
            res.json({
                isSuccess: true,
                result: resu
            });
        }).catch(err => {
            console.error(err);
            res.json({
                isSuccess: false,
                result: err
            });
        })
    }  
}

export const deleteExpense = async (req, res) => {
    const id = req.params.id;
    await Expense.findByIdAndDelete(id).then((resu)=>{
        res.json({
            isSuccess: true,
            result: resu
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
    await Expense.findByIdAndUpdate(id,updateItem).then((resu)=>{
        res.json({
            isSuccess: true,
            result: resu
        });
    }).catch(err => {
        console.error(err);
        res.json({
            isSuccess: false,
            result: err
        });
    }) 
}