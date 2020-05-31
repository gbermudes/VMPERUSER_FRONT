var templatePedidos = '<div class="row">'+ 
                          '<div class="col-12"> <a href="detalhe.html?id={{NUM}}">{{DATA}} - {{OBSERVACOES}} </a></div>'+
                      '</div>';

function carregasolicatacao(){
    // qual a lógica disso?
    // primeiro: se o usuário tá logado, as infos dele estão no LocalStorage, certo?
    // e se não tiver? --> mando pro index
    // se estiver, eu só preencho as coisas (o que é bem legal!!!)

    var userSTR = localStorage.getItem("VMuser");
    usuario = JSON.parse(userSTR);
    var todosPedidos="";
    for (i=0; i<usuario.pedidos.length; i++){
        todosPedidos = todosPedidos+templatePedidos.replace("{{DATA}}",usuario.pedidos[i].data)
                                                   .replace("{{OBSERVACOES}}",usuario.pedidos[i].observacoes)
                                                   .replace("{{NUM}}",usuario.pedidos[i].numSolicitacao);
    }
   
    document.getElementById("pedidos").innerHTML = todosPedidos;
}
