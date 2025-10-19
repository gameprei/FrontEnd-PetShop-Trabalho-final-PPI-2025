import express from 'express'; 
import session from 'express-session'; 
import verifyAuthenticate from './security/authenticate.js';

const app = express();
const PORT = 4000;
const HOST = '0.0.0.0';

app.use(session({
    secret: 'my_secret_key',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15 // 15 minutes
     }
}));

app.use(express.urlencoded({ extended: true }));

 app.post('/login' , (request, answer) => {

    const username = request.body.usuario;
    const password = request.body.senha;

    if(username === 'admin' && password === '1234') {
        request.session.authenticated = true;
        answer.redirect('/private/gerenciarinteressado.html');
    }
    else {
        request.session.authenticated = false;
        answer.redirect('/public/login.html');
    }
});

app.get("/logout", (request, answer) => {
    request.session.authenticated = false;
    answer.redirect('/public/login.html');
});

app.use(express.static('public'));
app.use('/private', verifyAuthenticate, express.static('private'));
 
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});