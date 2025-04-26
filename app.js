import express from 'express';
import { routerdata } from './router/router.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 3000;

app.use(routerdata);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.static('uploads'));

app.use((req,res) =>{
    res.status(404).render('404', {title:'404'});
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})