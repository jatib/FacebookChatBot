const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('port',process.env.PORT);

app.listen(app.get('port'),()=>{
	console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
});

app.get('/webhook',(req,res)=>{
	const mode = req.query['hub.mode'];
	const challenge = req.query['hub.challenge'];
	const token = req.query['hub.verify_token'];

	if(mode && token){
		if(mode === 'suscribe' && token === process.env.VERIFYTOKEN){
			console.log("Webhook listo");
		}
	}
});

app.get('/',(req,res)=>{
	res.send('Hola este es mi server furulando');
});