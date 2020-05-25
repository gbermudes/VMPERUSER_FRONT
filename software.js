var template='<div class="row"> '+
               '<div class="col-6"> {{SOFTWARE}} </div>'+
               '<div class="col-4"> {{FORNECEDOR}} </div>'+
               '<div class="col-2"> {{VALOR}} </div>' +
            '</div>';

function inicializa(){
    /*
    qual a lógica dessa função?
    Entrar em contato com o Back-End, receber o JSON (em formato texto),
    convertê-lo e exibir dentro da div "conteudo"
    O que vamos usar para isso? A API Fetch!
    */

    fetch("http://localhost:8080/softwares")
       .then(res => res.json() )
       .then(res => preenche(res));
}

function preenche(res){
    console.log(res);
    var texto="";

    for (i=0; i<res.length; i++){
        texto = texto + 
                template.replace("{{SOFTWARE}}", res[i].nome)
                        .replace("{{FORNECEDOR}}",res[i].fornecedor)
                        .replace("{{VALOR}}", "US$ "+ res[i].valor.toFixed(2));
    }
    document.getElementById("conteudo").innerHTML = texto;
}