const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const {CONFIG} = require("./src/config/config");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));


app.get("/",async(req,res)=>{
    return res.render('index');
})


app.listen(CONFIG.PORT, () => {
  console.log(`Server is running at http://localhost:${CONFIG.PORT}`);

});