const url = require('url');
const fs = require('fs');
const path = require('path');

const loadView = (req,res)=>{
  let end = url.parse(req.url,true).pathname;
  let file = end.split('/');

  if(end == '/'){
    fs.readFile('./view/home.html','utf8',(err,data)=>{
      if(err){
        res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
        res.end('404 Página não encontrada');
      }
      else{
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.write(data);
        res.end();
      }
    })
  }

  else if(file.length > 2){

    if(file.length > 3){
      let func = require(`./${file[1]}`);
      let data = func[file[2]](file.slice(3));
      res.end(data);
    }
    else{
      let func = require(`./${file[1]}`)[file[2]]();
      let data = func[file[2]];
      res.end(data);
    }
  }

  else{
    fs.readFile(`./view${end}.html`,'utf8',(err,data)=>{
      if(err){
        res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
        res.end('404 Página não encontrada');
      }
      else{
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.write(data);
        res.end();
      }
    })
  }
}

module.exports = {loadView};
