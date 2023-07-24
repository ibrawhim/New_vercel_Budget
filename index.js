const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
const cors = require('cors')
app.use(cors())
app.use(express.json())


app.set('view engine','ejs')

let URL = 'mongodb+srv://ibrawhim:c6zDVOCuCy7lXs9h@cluster0.fz9mxzq.mongodb.net/Front_Back?retryWrites=true&w=majority'
mongoose.connect(URL)
.then(()=>{
    console.log('Mongoose is connected');
})
.catch((err)=>{
    console.log(err);
})


let myBudgetSchema = {
    item: {type: String, require: true, unique: true},
    price: {type: String, require: true},
    quantity: {type: String, require: true}
}

let budgetModel = mongoose.model('front-budget',myBudgetSchema)



app.get('/',(req,res)=>{
    res.render('additems')
})


app.post('/details',(req,res)=>{
    let details = req.body
    form = budgetModel(details)
    form.save()
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    })
})

app.get('/api',(req,res)=>{
    budgetModel.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})


app.listen("4777",()=>{
    console.log('connected');
})