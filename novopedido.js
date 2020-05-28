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
}

function obterValorSw(res, x){
    /*carregavalor();
    var numProc = document.getElementById("numProc").value;
    var numMemo = document.getElementById("numMemo").value;
    var numDisc = document.getElementById("numDisc").value;
    var numBand = document.getElementById("numBand").value;
    var custo = 0;
    custo = (numProc * 10) + (numMemo * 5) + numDisc + numBand ;
    */
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
    var msgMaquina = {
        qntd_cpu : processador,
        qntd_memoria : memoria,
        qntd_disco : disco,
        qntd_banda : banda,
    }

    var cabecalhoMaquina = {
        method : 'POST',
        body : JSON.stringify(msgMaquina),
        headers : {
            'Content-Type': 'application/json'
        }
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
            .then(res => alert("foi!!!"))
            .catch(err => alert("deu ruim nova solicitacao"));
            console.log("msgSolicitacao = "+ JSON.stringify(msgSolicitacao));
        }


        }
         catch (err) {
            alert ("deu ruim maquina " );
        }



    //.then(res => alert("foi Maquina!!!"))
    //.then(res => res.json())
    //.then(res => recuperaMaquina(res))
    //.catch(err => alert("deu ruim Maquina"));
    
    //console.log(" 8 - resultado de  id depois  = " + id);
 }

function cadastraSolicitacao(maq){
    // monta json para criar a solicitação + tbl_itens com id maquina + id software + id solicitacao
    
    /* json ideal para criar uma solicitação completa.
     	"itensSolicitacao" : [  {
								"maquina" : {"id": 1}
							    },
								{
								"software": { "id": 2}
							    },
							    {
								 "software": { "id" :3 }
							    }
							],*/
    

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    console.log("200ms.....")
 }