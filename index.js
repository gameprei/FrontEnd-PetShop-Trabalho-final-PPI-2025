import express from 'express'; 
import session from 'express-session'; 

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
 
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});