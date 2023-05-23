const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const sportCar = require('./public/sport-car.json')
const trucks = require('./public/trucks.json')
const regularCar = require('./public/regular-car.json')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()


// middlewears
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hlokssy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const toyCollection = client.db('Toys').collection('Cars')


    app.get('/cars', async(req, res) =>{
        const cursor = toyCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    app.get('/cars/:id', async(req, res)=>{
        const id = req. params.id;
        console.log(id);
        const query = {_id: new ObjectId(id)}
        console.log(query);
        const selectedId = await toyCollection.findOne(query)
        res.send(selectedId)
    })


    app.post('/postToys', async(req, res) =>{
        const body = req.body;
        const result = await toyCollection.insertOne(body);
        res.send(result)
    })


    app.get('/myToys/:email', async(req, res) =>{
        console.log(req.params.email);
        const result = await toyCollection.find({sellerEmail: req.params.email}).toArray()
        res.send(result)
    })


    app.delete('/cars/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await toyCollection.deleteOne(query);
        res.send(result)
    })


    // app.get('/myToys', async(req, res) =>{
    //     let query = {};
    //     if(req.query?.sellerEmail){
    //         query = { sellerEmail : req.query.email} 
    //     }
    //     const result = await toyCollection.find(query).toArray();
    //     res.send(result)
    // } )

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


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