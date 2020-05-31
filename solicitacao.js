var templatePedidos = '<div class="row">'+ 
                          '<div class="col-12"> <a href="detalhe.html?id={{NUM}}">{{DATA}} - {{OBSERVACOES}} </a></div>'+
                      '</div>';
var templatePedidosTH='<th> <a href="detalhe.html?id={{ID}}"> {{NUM}} </a> </th>'+
                      '<th> {{DATA}} </th>'+
                      '<th> {{OBSERVACOES}} </th>'
function carregasolicatacao(){
    // qual a lógica disso?
    // primeiro: se o usuário tá logado, as infos dele estão no LocalStorage, certo?
    // e se não tiver? --> mando pro index
    // se estiver, eu só preencho as coisas (o que é bem legal!!!)

    var userSTR = localStorage.getItem("VMuser");
    usuario = JSON.parse(userSTR);
    var todosPedidos="";
    var tblSolicitacao = document.getElementById('thsoftware');
    for (i=0; i<usuario.pedidos.length; i++){
        todosPedidos = templatePedidosTH.replace("{{DATA}}",usuario.pedidos[i].data)
                                        .replace("{{OBSERVACOES}}",usuario.pedidos[i].observacoes)
                                        .replace("{{NUM}}",usuario.pedidos[i].numSolicitacao)
                                        .replace("{{ID}}",usuario.pedidos[i].numSolicitacao);
        rowFull = tblSolicitacao.insertRow ();
        rowFull.innerHTML  = todosPedidos;
   }
   document.getElementById("solicitacaoTH").innerHTML = todosPedidos+"</tr>";   
}
