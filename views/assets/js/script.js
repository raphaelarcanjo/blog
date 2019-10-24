window.onload = ()=>{
  document.querySelector("#ok").onclick = ()=>{
    fetch('teste/login/raphael/123456',{
      method: 'get'
    }).then((response)=>{
      return response.text();
    }).then((data)=>{
      document.querySelector("#demo").innerHTML = data;
    })
  }
}
