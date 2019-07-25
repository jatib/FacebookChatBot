const actions = require("./actions")

exports.handelMessage = (webhookEvent) =>{
  if(webhookEvent.message){
    let mensaje = webhookEvent.message;
    if(mensaje.quick_reply){
      console.log("Envió respuesta rapida")
    }else if(mensaje.attachements){
      console.log("Envió un adjunto");
    }else if(mensaje.text){
      console.log("Envío texto");
      actions.sendTextMessage("");
    }
  }
}
