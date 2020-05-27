
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
    //fetch("http://localhost:8080/softwares")
    fetch("http://localhost:8080/solicitacao/"+id)
        .then(res => res.json())
        .then(res => preenche(res));
        //.then(res => console.log(res))
        //.catch(err => alert("pedido nao encontrado"));
        
}
/// vem de software . js


function preenche(res){

    console.log("res do preenche = " + JSON.stringify(res));
    console.log("tamanho do res = " + JSON.stringify(res).length);

    tamanhoRes = JSON.stringify(res).length;
    var texto="";

    texto = texto +  template.replace("{{NUMSOLICITACAO}}", res.numSolicitacao)
                        .replace("{{OBSERVACOES}}", res.observacoes)
                        .replace("{{VALOR}}", "US$ "+ res.valor.toFixed(2));

    /*for (i=0; i<=tamanhoRes; i++){
            //console.log("log do for i =" + i);
            console.log("log do for i = " + JSON.stringify(res[i]));

        texto = texto +  template.replace("{{NUMSOLICITACAO}}", res[i].numSolicitacao);
                        //.replace("{{NOME}}",res[i].observacoes)
                        //.replace("{{VALOR}}", "US$ "+ res[i].valor.toFixed(2));
    }*/
    document.getElementById("detalhes").innerHTML = texto;
}