window.onload = ()=>{
  document.querySelector("#ok").onclick = ()=>{
    fetch('teste/teste/nome',{
      method: 'get',
      headers: {
        'Content-Type': 'text/plain'
      }
    }).then((response)=>{
      return response.text();
    }).then((data)=>{
      console.log(data);
      document.querySelector("#demo").innerHTML = data;
    })
  }
}
