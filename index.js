/* algemeen */


/* packages */


/* middleware */


/* luister naar poort */

//const chalk = require('chalk');
//console.log(chalk.blue("JS")); // werkt niet?

const express = require('express')
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.json() );
app.use('/', require('./routes/home') );
app.use('/kweeni', require('./routes/kweeni') );
app.use('/watis', require('./routes/watis') );

app.listen(3000, () => console.log('Example app listening on port 3000!'))