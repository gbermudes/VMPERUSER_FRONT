
var template='<div class="row"> '+
                '<div class="col-6"> {{NUMSOLICITACAO}} </div>'+
                '<div class="col-4"> {{OBSERVACOES}} </div>'+
                '<div class="col-2"> {{VALOR}} </div>' +
            '</div>';

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
                        .replace("{{VALOR}}", "R$ "+ res.valor.toFixed(2));

    document.getElementById("detalhes").innerHTML = texto;
}