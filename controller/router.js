const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

class Rout {
  constructor(url) {
    app.get(url,(req,res)=>{
      if(dir == '/') res.sendFile(path.join(__dirname,'./view/home.html'));
      else res.sendFile(path.join(__dirname,`./view/${url}.html`));
    })
  }
}

app.listen(3000,()=> console.log('Servidor rodando na porta 3000'));

module.exports(Rout);
