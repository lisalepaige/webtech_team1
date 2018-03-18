const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json() );
// link to css and img
app.use(express.static('./public'));
app.use('/', require('./routes/index') );

app.listen(3000, () => console.log('Example app listening on port 3000!'))
