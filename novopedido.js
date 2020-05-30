var valorSoftwares = 0;
var idmaquina_global=0;

var templateMaquina = '<p> CPU: {{CPU}}</p> '+
                      '<p> MEMORIA RAM: {{RAM}}</p>'+
                      '<p> DISCO: {{DISCO}}</p>' +
                      '<p> BANDA DE REDE: {{BANDA}}</p>';


function carregaitens(){
  
    fetch("http://localhost:8080/softwares")
      .then(res => res.json())
      .then(res => preencheCheckbox(res))
}

function carregavalor(custohw){
    var x = custohw;
    fetch("http://localhost:8080/softwares")
      .then(res => res.json())
      .then(res => obterValorSw(res,x))
      .catch(err => trataErro(err))
}

function obterValorSw(res, x){

    valorSoftwares = 0;
    // X é o custo da maquina
    valorSoftwares = x;
    var listaSw = document.getElementsByName("softwares[]");
    for (i=0;i<listaSw.length;i++){
        
        if(listaSw[i].checked){
            //valorSoftwares = valorSoftwares + templateCh.replace("{{VALOR}}",res[i].valor);
            valorSoftwares = valorSoftwares + res[i].valor;
            
        }
        
    }
        
    document.getElementById("txtCustoHora").value = valorSoftwares;
    
}

function obterValor(){
    
    var numProc = parseInt(document.getElementById("numProc").value);
    var numMemo = parseInt(document.getElementById("numMemo").value);
    var numDisc = parseInt(document.getElementById("numDisc").value);
    var numBand = parseInt(document.getElementById("numBand").value);
    //var valorSoftwares = document.getElementById(valorSoftwares);
    var custo = 0;
   
    //var valorSoftwares = carregavalor(valorSoftwares);
    custo = (numProc * 10) + (numMemo * 5) + numDisc + numBand;
    custo = parseInt(custo); // da 17 se tudo 1 cpu 1 mem 1 disco.. 
    carregavalor(custo); // pega valor de maquima e soma software..
   
    valorSoftwares = parseInt(valorSoftwares);
    
}

function preencheCheckbox(res){

    var templateCh = '<input class="form-check-input" type="checkbox" name="softwares[]" value="{{ID}}"> {{NOME}}';
    // var templateCh = '<input type="checkbox" name="softwares[]" value="{{ID}}"> {{NOME}} <br>';

    var txtSoftwares = "";
    for (i=0; i<res.length; i++){

        txtSoftwares = txtSoftwares + templateCh.replace("{{ID}}",res[i].id)
                                                .replace("{{NOME}}", res[i].nome);
                                                //.replace("{{VALOR}}", res[i].valor);
    }
    document.getElementById("listaSw").innerHTML = txtSoftwares;
}


function enviarPedido(){
<<<<<<< HEAD
/*id	int	NO	PRI		auto_increment
qntd_banda	int	YES			
qntd_cpu	int	YES			
qntd_disco	int	YES			
qntd_memoria	int	YES			
valor_total	float	YES			 */
console.log(" 8 - chama cadastrar maquina");
var numProc = document.getElementById("numProc").value; //1
var numMemo = document.getElementById("numMemo").value; //1
var numDisc = document.getElementById("numDisc").value; //1 
var numBand = document.getElementById("numBand").value;
var userSTR = localStorage.getItem("VMuser");
var user = JSON.parse(userSTR);
cadastraMaquina(numProc, numMemo, numDisc, numBand, user);

}

function xhr_setup (xhr, route) {
    var url = "http://localhost:8080/" + route;
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    return(xhr);
}
function cadastraMaquina(processador, memoria, disco, banda, user){

=======
    var numProc = document.getElementById("numProc").value; //1
    var numMemo = document.getElementById("numMemo").value; //1
    var numDisc = document.getElementById("numDisc").value; //1 
    var numBand = document.getElementById("numBand").value;
    var txtData = document.getElementById("txtData").value;
    var txtObs  = document.getElementById("txtObs").value;
    var txtValor = document.getElementById("txtCustoHora").value;
    txtValor = parseFloat(txtValor);
    
  

    var userStr = localStorage.getItem("VMuser");
    var user = JSON.parse(userStr);
    var msgSolicitacao = {
        //id  : null,
        data : txtData,
        observacoes : txtObs,
        valor : txtValor,
        solicitante: {
            id: user.id
        },
        itensSolicitacao:[]
    }

    console.log (" 1 - chama cadastra maquina......");
    cadastraMaquina(numProc, numMemo, numDisc, numBand, msgSolicitacao);
       
}

function recuperaMaquina (res){
  //  console.log(" 6 - res recuperado = " + res.id);
    console.log(" 7 - res id maquina = " + JSON.stringify(res.id));
    idmaquina_global = res.id;
}
async function cadastraMaquina(processador, memoria, disco, banda, msgSolicitacao){
    
    var id = 0;
>>>>>>> a1c62de222dd1e5602fb5083ffb053d3239036f0
    var msgMaquina = {
        qntd_cpu : processador,
        qntd_memoria : memoria,
        qntd_disco : disco,
        qntd_banda : banda,
    }

    var xhr=xhr_setup(new XMLHttpRequest(), "maquina/nova");
    xhr.onload = function () {
        var txtData = document.getElementById("txtData").value;
        var txtObs  = document.getElementById("txtObs").value;
        var txtValor = document.getElementById("txtCustoHora").value;
        txtValor = parseFloat(txtValor);      
    
        var res = JSON.parse(xhr.responseText);
        var msgSolicitacao = {
            //id  : null,
            data : txtData,
            observacoes : txtObs,
            valor : txtValor,
            solicitante: {
                id: 1
            },
            itensSolicitacao:[]
        }
        var jmaquina = { maquina : { id : res.id  }}
        msgSolicitacao.itensSolicitacao[0] = jmaquina;

        var listaSw = document.getElementsByName("softwares[]");
        var cont=1;
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
<<<<<<< HEAD

        fetch("http://localhost:8080/solicitacoes/nova",cabecalho)
          .then(res => alert("foi!!!"))
          .catch(err => alert("deu ruim"));
    }
    var json = JSON.stringify(msgMaquina);
    xhr.send(json);

/*
    fetch("http://localhost:8080/maquina/nova",cabecalhoMaquina).then(function(response) {
        if(response.ok) {
          response.blob().then(function(myBlob) {
          });
        } else {
          console.log('Network response was not ok.');
        }
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
*/
    //.then(res => alert("foi Maquina!!!"))
    //.then(res => res.json())
    //.then(res => recuperaMaquina(res))
    //.catch(err => alert("deu ruim Maquina"));
    
    //console.log(" 8 - resultado de  id depois  = " + id);     
=======
    }

     try{
            const res = await fetch('http://localhost:8080/maquina/nova',cabecalhoMaquina);
            const json = await res.json();

            console.log(" 1.1 - estou no json async! .");
            console.log(json.id);
            console.log(" 1.2 - sai doo json async! ..");
            idmaquina_global = parseInt(json.id);
           
            //return data.id;
            console.log("3 - ID maquina var global =" + idmaquina_global);    
            var jmaquina = { maquina : { id : idmaquina_global  }}
            console.log(" 4 -objeto json maquina" + JSON.stringify(jmaquina));
            msgSolicitacao.itensSolicitacao[0] = jmaquina;
            console.log( " 5 - o que tem no json msg solicitação =  " + JSON.stringify(msgSolicitacao.itensSolicitacao[0]));

            // msgSolicitacao.itensSolicitacao[0] = { maquina : 3}

            var listaSw = document.getElementsByName("softwares[]");
            var cont=1;
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
            // Tento criar uma nova solicitação
            console.log(" 6 - tento criar uma solicitação");
        if (idmaquina_global == 0)
        {
            console.log(" 6.1 -id maquina nova  = 0 sem criação de nova solicitação");
        }else{
            fetch("http://localhost:8080/solicitacoes/nova",cabecalho)
            .then(res => alert("Pedido Registrado com sucesso."))
            .catch(err => trataErro(err))
            console.log("msgSolicitacao = "+ JSON.stringify(msgSolicitacao));
        }


        }
         catch (err) {
            alert ("deu ruim maquina " );
        }
 }

function cadastraSolicitacao(maq){
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    console.log("200ms.....")
 }

 function trataErro(err){
    console.log(err);
    document.getElementById("msg").style="visibility:visible";
}

function perfil(){
    window.location = "perfil.html";
>>>>>>> a1c62de222dd1e5602fb5083ffb053d3239036f0
}