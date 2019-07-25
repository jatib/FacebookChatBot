const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const actions = require("./services/actions");

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
		if(mode === 'subscribe' && token === process.env.VERIFYTOKEN){
			console.log("Webhook listo");
			res.status(200).send(challenge);
		}else{
			res.status(403);
		}
	}
});

app.post("/webhook",(req,res)=>{
	const body = req.body;
	if(body.object === "page"){
		res.status(200).send("EVENT_RECEIVED");
		body.entry.forEach(function(entry){
			let webhookEvent = entry.messaging[0];
			console.log(webhookEvent);
			actions.sendTextMessage("Bienvenido al chatbot, nombre clave PenroseBot",webhookEvent);
		});
	}else{
		res.senStatus(404);
	}
});

app.get('/',(req,res)=>{
	res.send('Hola esa la banda este es mi server furulando (writted on Chilango)');
});
