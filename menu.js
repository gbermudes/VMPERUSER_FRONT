$(document).ready(function(){
  $("#perfil_div").click(function(){

   result.src="perfil_div.html";
  });
  $("#solicitacoes").click(function(){

   result.src="solicitacao.html";
  }); 
  $("#novopedido").click(function(){

   result.src="novopedido.html";
  });
});

function logout(){
    localStorage.removeItem("VMuser");
    window.location = "index.html";
}
