var valorSoftwares = 0;
var templateMaquina = '<p> CPU: {{CPU}}</p> '+
                      '<p> MEMORIA RAM: {{RAM}}</p>'+
                      '<p> DISCO: {{DISCO}}</p>' +
                      '<p> BANDA DE REDE: {{BANDA}}</p>';


function carregaitens(){
    fetch("http://localhost:8080/softwares")
      .then(res => res.json())
      .then(res => preencheCheckbox(res))
}

function carregavalor(){
    fetch("http://localhost:8080/softwares")
      .then(res => res.json())
      .then(res => obterValorSw(res))
}

function obterValorSw(res){
    /*carregavalor();
    var numProc = document.getElementById("numProc").value;
    var numMemo = document.getElementById("numMemo").value;
    var numDisc = document.getElementById("numDisc").value;
    var numBand = document.getElementById("numBand").value;
    var custo = 0;
    custo = (numProc * 10) + (numMemo * 5) + numDisc + numBand ;
    */
    valorSoftwares = 0;
    var listaSw = document.getElementsByName("softwares[]");
    for (i=0;i<listaSw.length;i++){
        if(listaSw[i].checked){
            //valorSoftwares = valorSoftwares + templateCh.replace("{{VALOR}}",res[i].valor);
            valorSoftwares = valorSoftwares + res[i].valor;
            
        }
    }
    //document.getElementById("listaSw").innerHTML = valorSoftwares;
    console.log(" 1 - valor Softwares depois do for = " + valorSoftwares);
    //return valorSoftwares;
    /*custo = Number.parseFloat(custo);
    custo = (custo + valorSoftwares).toFixed(2);
    console.log(custo);
    */
}

function obterValor(){
    

    var numProc = document.getElementById("numProc").value;
    var numMemo = document.getElementById("numMemo").value;
    var numDisc = document.getElementById("numDisc").value;
    var numBand = document.getElementById("numBand").value;
    //var valorSoftwares = document.getElementById(valorSoftwares);
    var custo = 0;
    
    //var valorSoftwares = carregavalor(valorSoftwares);
    custo = (numProc * 10) + (numMemo * 5) + numDisc + numBand ;
    custo = parseInt(custo); // da 1511 se tudo 1 cpu 1 mem 1 disco.. 
    carregavalor();
    valorSoftwares = parseInt(valorSoftwares);
    //var valorSoftwares = valorSoftwares;
    console.log(" 2 - valorSoftwares = "+ valorSoftwares);
    console.log(" 3 - valor Custo = " + custo);
    custo = (custo + valorSoftwares);
    console.log(" 4 -valor custo + valor software = " + custo);
    
}

function preencheCheckbox(res){

    var templateCh = '<input type="checkbox" name="softwares[]" value="{{ID}}"> {{NOME}} {{VALOR}} <br/>';

    var txtSoftwares = "";
    for (i=0; i<res.length; i++){

        txtSoftwares = txtSoftwares + templateCh.replace("{{ID}}",res[i].id)
                                                .replace("{{NOME}}", res[i].nome)
                                                .replace("{{VALOR}}", res[i].valor);
    }
    document.getElementById("listaSw").innerHTML = txtSoftwares;
}


function enviarPedido(){
    var numProc = document.getElementById("numProc").value;
    var numMemo = document.getElementById("numMemo").value;
    var numDisc = document.getElementById("numDisc").value;
    var numBand = document.getElementById("numBand").value;
    var txtData = document.getElementById("txtData").value;
    var txtObs  = document.getElementById("txtObs").value;
    
    var userStr = localStorage.getItem("VMuser");
    var user = JSON.parse(userStr);

    var msgSolicitacao = {
        data : txtData,
        observacoes : txtObs,
        solicitante: {
            id: user.id
        },
        itensSolicitacao:[]
    }

    var listaSw = document.getElementsByName("softwares[]");
    var cont=0;
    for (i=0; i<listaSw.length; i++){
        if (listaSw[i].checked){
            var idSoftware = parseInt(listaSw[i].value);
            var itemSoftware = {
               software : { id: idSoftware }
            }
            msgSolicitacao.itensSolicitacao[cont] = itemSoftware;
            cont++;
        }
    }

    var cabecalho = {
        method : 'POST',
        body : JSON.stringify(msgSolicitacao),
        headers : {
            'Content-Type': 'application/json'
        }
    }

    fetch("http://localhost:8080/solicitacoes/nova",cabecalho)
      .then(res => alert("foi!!!"))
      .catch(err => alert("deu ruim"));

    console.log(msgSolicitacao);
}

function calculoPrevio(){
    var numProc = document.getElementById("numProc").value;
    var numMemo = document.getElementById("numMemo").value;
    var numDisc = document.getElementById("numDisc").value;
    var numBand = document.getElementById("numBand").value;
    carregavalor();
    var valSosf = valorSoftwares;
    var userStr = localStorage.getItem("VMuser");
    var user = JSON.parse(userStr);

    var msgCalculoPrevio = {
        proc : numProc,
        mem  : numMemo,
        disc : numDisc,
        band : numBand              
    }

    var cabecalho = {
        method : 'POST',
        body : JSON.stringify(msgCalculoPrevio),
        headers : {
            'Content-Type': 'application/json'
        }
    }
    
    fetch("http://localhost:8080/maquina/calculo",cabecalho)
    .then(res => alert("foi!!!"))
    .catch(err => alert("deu ruim"));

  console.log(msgCalculoPrevio);

}
