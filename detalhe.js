
var template='<th> {{NUMSOLICITACAO}} </th>'+
             '<th> {{OBSERVACOES}} </th>'+
             '<th> {{VALOR}} </th>' ;

var templateItemSW='<th> {{NUMITEM}} </th>'+
             '<th> {{TIPO}} </th>'+
             '<th> {{SOFTWARENAME}} </th>' +
             '<th> {{FORNECEDOR}} </th>' +
             '<th> {{VALOR}} </th>'
var templateItemHW='<th> {{NUMITEM}} </th>'+
             '<th> {{TIPO}} </th>'+
             '<th> {{HARDWAREID}} </th>' +
             '<th> {{DETALHES}} </th>' +
             '<th> {{VALORTOTAL}} </th>'
function recuperaDetalhe(){
    var parametro = window.location.search;
    console.log(parametro);

    var id = parametro.substr(4);

    console.log("Numero da solicitacao = "+id);
    fetch("http://localhost:8080/solicitacao/"+id)
        .then(res => res.json())
        .then(res => preenche(res));
        
}
/// vem de software . js


function preenche(res){

    console.log("res do preenche = " + JSON.stringify(res));
    console.log("tamanho do res = " + JSON.stringify(res).length);

    tamanhoRes = JSON.stringify(res).length;
    var texto="";

    texto = texto +  template.replace("{{NUMSOLICITACAO}}", res.numSolicitacao)
                        .replace("{{OBSERVACOES}}", res.observacoes)
                        .replace("{{VALOR}}", "R$ "+ res.valor);

    document.getElementById("detalhes").innerHTML = texto;

    tamanhoItens = res.itensSolicitacao.length;
    var textoItemSW="";
    var textoItemHW="";
    var tblSoftware = document.getElementById('thsoftware');
    for (i=0; i < tamanhoItens; i++) {
        if ( res.itensSolicitacao[i].software != null ){
        
        textoItemSW = templateItemSW.replace ("{{NUMITEM}}", res.itensSolicitacao[i].numItem)
                             .replace ("{{TIPO}}", "Software") 
                             .replace ("{{SOFTWARENAME}}", res.itensSolicitacao[i].software.id + "-" + res.itensSolicitacao[i].software.nome)
                             .replace ("{{FORNECEDOR}}", res.itensSolicitacao[i].software.fornecedor)
                             .replace ("{{VALOR}}", res.itensSolicitacao[i].software.valor);
        rowFull = tblSoftware.insertRow ();
        rowFull.innerHTML  = textoItemSW;
        } else {
        textoItemHW += templateItemHW.replace ("{{NUMITEM}}", res.itensSolicitacao[i].numItem)
            .replace ("{{TIPO}}", "Hardware") 
            .replace ("{{HARDWAREID}}", res.itensSolicitacao[i].maquina.id )
            .replace ("{{DETALHES}}", "CPU: " + res.itensSolicitacao[i].maquina.qntd_cpu + "/MEM: " + res.itensSolicitacao[i].maquina.qntd_memoria + "/DSK: " + res.itensSolicitacao[i].maquina.qntd_disco+ "/BDW: " + res.itensSolicitacao[i].maquina.qntd_banda )
            .replace ("{{VALORTOTAL}}", res.itensSolicitacao[i].maquina.valorTotal);
        
        }
    } 
    document.getElementById("detalhesSW").innerHTML = textoItemSW+"</tr>";
    document.getElementById("detalhesHW").innerHTML = textoItemHW+"</tr>";      
}