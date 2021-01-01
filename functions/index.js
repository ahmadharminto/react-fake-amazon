const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51HzTxwJzHZ47EpICEDf2H1IhYdHqJDSE5mLqe6KKPNPGJZNh48iGWJTfM71GHhNVvDwVbVkgue5DrPwdXW66js8N000FGRZZwq')

const app = express();

app.use(cors({ 
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.use(express.json());

app.get('/', (request, response) => response.status(200).send('API using Firebase Cloud Function : ExpressJS'))
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: 'usd'
    })

    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

exports.api = functions.https.onRequest(app)