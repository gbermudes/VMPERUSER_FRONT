var templateFoto    = '<img src="{{IMAGEMFOTO}}" width="50%">';
var templateBio     = '<h3> {{NOME}} </h3> <hr> <p> RACKF: {{RACF}}</p> '+
                                                ' <p> SETOR: {{SETOR}}</p>'+
                                                ' <p> TELEFONE: {{TELEFONE}}</p>' ;
var templatePedidos = '<div class="row">'+ 
                          '<div class="col-12"> <a href="detalhe.html?id={{NUM}}">{{DATA}} - {{OBSERVACOES}} </a></div>'+
                      '</div>';
                      
function carregaperfil(){
    // qual a lógica disso?
    // primeiro: se o usuário tá logado, as infos dele estão no LocalStorage, certo?
    // e se não tiver? --> mando pro index
    // se estiver, eu só preencho as coisas (o que é bem legal!!!)
    var userSTR = localStorage.getItem("VMuser");
    console.log(userSTR);

    if (!userSTR){ 
       window.location= "index.html";  // se não existir info do usuario, ele não tá logado, logo mando pro index
    }
    usuario = JSON.parse(userSTR);
    document.getElementById("foto").innerHTML = templateFoto.replace("{{IMAGEMFOTO}}", usuario.linkFoto);
    document.getElementById("personal").innerHTML = templateBio.replace("{{NOME}}",usuario.nome)
                                                               .replace("{{RACF}}",usuario.racf)
                                                               .replace("{{SETOR}}",usuario.setor)
                                                               .replace("{{TELEFONE}}",usuario.telefone);


//    var todosPedidos="";
//    for (i=0; i<usuario.pedidos.length; i++){
//        todosPedidos = todosPedidos+templatePedidos.replace("{{DATA}}",usuario.pedidos[i].data)
//                                                   .replace("{{OBSERVACOES}}",usuario.pedidos[i].observacoes)
//                                                   .replace("{{NUM}}",usuario.pedidos[i].numSolicitacao);
//    }
   
//    document.getElementById("pedidos").innerHTML = todosPedidos;
}
