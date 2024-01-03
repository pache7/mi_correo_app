import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'src')));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alanschirmer58@gmail.com',
    pass: 'ipah ucfq xdpg khnn'
  },
  tls: {
    rejectUnauthorized: false 
  }
});


let agendaCorreos = [];


app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'src', 'views', 'index.html');
  res.sendFile(indexPath);
});


app.post('/agregar-correo', (req, res) => {
  const nuevoCorreo = req.body.email;
  agendaCorreos.push(nuevoCorreo);
  res.redirect('/');
});


app.post('/enviar-correo', (req, res) => {
  const mensaje = req.body.mensaje;


  const mailOptions = {
    from: 'alanschirmer58@gmail.com',
    subject: 'Mi nueva app de Correo',
    text: mensaje
  };


  agendaCorreos.forEach(correo => {
    mailOptions.to = correo;
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error al enviar correo a ${correo}: ${error}`);
      } else {
        console.log(`Correo enviado a ${correo}: ${info.response}`);
      }
    });
  });

  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en http://localhost:${PORT}`);
});
