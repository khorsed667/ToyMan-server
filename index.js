const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const sportCar = require('./public/sport-car.json')
const trucks = require('./public/trucks.json')
const regularCar = require('./public/regular-car.json')


// middlewears
app.use(cors())
app.use(express.json())


app.get('/', (req, res) =>{
    res.send('toy is running on')
})

app.get('/sport-car', (req, res)=>{
    res.send(sportCar)
})

app.get('/sport-car/:id', (req, res)=>{
    const id = req. params.id;
    const selectedId = sportCar.find(sc => sc.id == id)
    res.send(selectedId)
})

app.get('/trucks', (req, res)=>{
    res.send(trucks)
})

app.get('/trucks/:id', (req, res)=>{
    const id = req.params.id;
    const selectedTruck = trucks.find(tr => tr.id == id)
    res.send(selectedTruck)
})

app.get('/regular-car', (req, res)=>{
    res.send(regularCar)
})

app.get('/regular-car/:id', (req, res)=>{
    const id = req.params.id;
    const selectedCar = regularCar.find(rc => rc.id == id)
    res.send(selectedCar)
})

app.listen(port, ()=>{
    console.log(`the port is running on: ${port}`);
})