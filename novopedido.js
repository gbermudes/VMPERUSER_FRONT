var templateMaquina = '<p> CPU: {{CPU}}</p> '+
                      '<p> MEMORIA RAM: {{RAM}}</p>'+
                      '<p> DISCO: {{DISCO}}</p>' +
                      '<p> BANDA DE REDE: {{BANDA}}</p>';


function carregaitens(){
    fetch("http://localhost:8080/softwares")
      .then(res => res.json())
      .then(res => preencheCheckbox(res))
}


function preencheCheckbox(res){

    var templateCh = '<input type="checkbox" name="softwares[]" value="{{ID}}"> {{NOME}} <br/>';

    var txtSoftwares = "";
    for (i=0; i<res.length; i++){

        txtSoftwares = txtSoftwares + templateCh.replace("{{ID}}",res[i].id)
                                                .replace("{{NOME}}", res[i].nome);
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