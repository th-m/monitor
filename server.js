const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();
const dev = (process.env.NODE_ENV !== 'production') ? true : false;
  

if(!dev){
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));
  
  app.use(express.static(path.resolve(__dirname, 'build')));
  
  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build'));
  });
}

if(dev){
  app.use(morgan('dev'));
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))