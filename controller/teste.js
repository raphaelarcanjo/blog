const teste = require('../model/teste_model');

const login = (req,res)=>{
  teste.getAll('users');
  console.log(teste.result);
}

module.exports = {login};