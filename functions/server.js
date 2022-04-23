const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const router = express.Router();
const functions = require('firebase-functions');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require("cors")({
  origin: true
});
const app = express();
app.locals.layout = false;
//View engine setup
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

//Static folder
app.use('public/assets', express.static(path.join(__dirname,'assets')));
app.get('/',(req,res)=>{
    //res.sendFile(path.join(__dirname+'/index.html'));
    res.render('index', {layout: false});
});
app.get('/fono',(req,res)=>{
    res.render('fono');
});
app.get('/kine',(req,res)=>{
  res.render('kine');
});
app.get('/terapia',(req,res)=>{
  res.render('terapia');
});
app.get('/servicios',(req,res) =>{
    res.render('servicios');
});
app.get('/convenios',(req,res) => {
    res.render('convenios');
});
app.get('/contactenos',(req,res)=> {
    res.render('contactenos');
});
app.get('/nutricion',(req,res)=> {
  res.render('nutri');
});
app.get('/neuro',(req,res)=> {
  res.render('neuro');
});
app.get('/contact', (req,res) => {
    res.render('contact');
});
app.use('/', router);
//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*
app.post('/send',(req,res) => {

    const output = `
    <p>Tienes una nueva solicitud</p>
    <h4>Detalles de contacto</h4>
    <ul>
    <li>Nombre: ${req.body.nombre}</li>
    <li>Rut: ${req.body.rut}</li>
    <li>Mail: ${req.body.email}</li>
    <li>Contacto: ${req.body.numerocontacto}</li>
    <li>Convenio: ${req.body.convenio}</li>
    <ul>
    <h4>Mensaje</h4>
    <p>${req.body.mensaje}</p>
     `;
   */
  app.post('/emailsegundo',(req, res) => {
    let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
         user: 'espaciovidainclusiva@gmail.com',
         pass: 'Masaifono123'
    },
    tls:{
      rejectUnauthorized:false
    }
});
 let mailOptions = {
  from: '"Solicitud Vida Inclusiva" <espaciovidainclusiva@gmail.com>', 
  to: 'espaciovidainclusiva@gmail.com', 
  subject: 'Solicitud Reserva', 
  text: 'Hello world?', 
  html: `
  <p>Tienes una nueva solicitud</p>
  <h4>Detalles de contacto</h4>
  <ul>
  <li>Nombre: ${req.body.nombre}</li>
  <li>Mail: ${req.body.email}</li>
  <li>Contacto: ${req.body.numerocontacto}</li>
  <ul>
  <h4>Mensaje</h4>
  <p>${req.body.mensaje}</p>
   `
};
transporter.sendMail(mailOptions, (error, info) => {
if (error) {
    return console.log(error);
}
console.log("Message send Successfully");
res.render('index', {layout: false});
});
});





  app.post('/send-email',(req, res) => {
      let transporter = nodemailer.createTransport({
      service:'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
           user: 'espaciovidainclusiva@gmail.com',
           pass: 'Masaifono123'
      },
      tls:{
        rejectUnauthorized:false
      }
});
   let mailOptions = {
    from: '"Solicitud Vida Inclusiva" <espaciovidainclusiva@gmail.com>', 
    to: 'espaciovidainclusiva@gmail.com', 
    subject: 'Solicitud Reserva', 
    text: 'Hello world?', 
    html: `
    <p>Tienes una nueva solicitud</p>
    <h4>Detalles de contacto</h4>
    <ul>
    <li>Nombre: ${req.body.nombre}</li>
    <li>Rut: ${req.body.rut}</li>
    <li>Mail: ${req.body.email}</li>
    <li>Contacto: ${req.body.numerocontacto}</li>
    <li>Convenio: ${req.body.convenio}</li>
    <ul>
    <h4>Mensaje</h4>
    <p>${req.body.mensaje}</p>
     `
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log("Message send Successfully");
  res.render('contact', {msg:'Email ha sido enviado, nos comunicaremos contigo a la brevedad.'});
});
});
//app.listen(process.env.port || 3000);
//console.log('Server started...');
exports.app = functions.https.onRequest(app);

