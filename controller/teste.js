const teste = require('../model/teste_model');

const login = (usr,pas)=>{
  let result = teste.getAll('users');
  console.log(result);
}

module.exports = {login};