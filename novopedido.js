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
            console.log (" 1.1 - valor i + software" + i + " - " +valorSoftwares);
        }
        
    }
    //document.getElementById("listaSw").innerHTML = valorSoftwares;
    console.log(" 1 - valor Softwares depois do for = " + valorSoftwares);
    document.getElementById("txtCustoHora").value = valorSoftwares;
    //return valorSoftwares;
    /*custo = Number.parseFloat(custo);
    custo = (custo + valorSoftwares).toFixed(2);
    console.log(custo);
    */
}

function obterValor(){
    
    var numProc = parseInt(document.getElementById("numProc").value);
    var numMemo = parseInt(document.getElementById("numMemo").value);
    var numDisc = parseInt(document.getElementById("numDisc").value);
    var numBand = parseInt(document.getElementById("numBand").value);
    //var valorSoftwares = document.getElementById(valorSoftwares);
    var custo = 0;
    
    //var valorSoftwares = carregavalor(valorSoftwares);
    custo = numProc * 10;
    console.log(" 3.1 - valor Custo = " + custo);
    custo = custo + numMemo * 5;
    console.log(" 3.2 - valor Custo = " + custo);
    custo = custo + numDisc;
    console.log(" 3.3 - valor Custo = " + custo);
    custo = custo + numBand; 
    console.log(" 3.4 - valor Custo = " + custo);
    custo = parseInt(custo); // da 1511 se tudo 1 cpu 1 mem 1 disco.. 
    console.log(" 3 - valor Custo = " + custo);
    carregavalor(custo);
    valorSoftwares = parseInt(valorSoftwares);

    //var valorSoftwares = valorSoftwares;
    console.log(" 2 - valorSoftwares = "+ valorSoftwares);
    
    //custo = (custo + valorSoftwares);
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
    var numProc = document.getElementById("numProc").value; //1
    var numMemo = document.getElementById("numMemo").value; //1
    var numDisc = document.getElementById("numDisc").value; //1 
    var numBand = document.getElementById("numBand").value;
    var txtData = document.getElementById("txtData").value;
    var txtObs  = document.getElementById("txtObs").value;
    var txtValor = document.getElementById("txtCustoHora").value;
    txtValor = parseFloat(txtValor);
    console.log (" 5 - txtValor antes de enviarPedio = " + txtValor);
    
    var userStr = localStorage.getItem("VMuser");
    var user = JSON.parse(userStr);
/*id	int	NO	PRI		auto_increment
qntd_banda	int	YES			
qntd_cpu	int	YES			
qntd_disco	int	YES			
qntd_memoria	int	YES			
valor_total	float	YES			 */

cadastraMaquina(numProc, numMemo, numDisc, numBand);
      
    var msgSolicitacao = {
        data : txtData,
        observacoes : txtObs,
        valor : txtValor,
        solicitante: {
            id: user.id
        },
        itensSolicitacao:[]
    }

   // msgSolicitacao.itensSolicitacao[0] = { maquina : 3}

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
        band : numBand ,
        soft : valSosf            
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

function recuperaMaquina (res){
    console.log(" 6 - res recuperado = " + res);

}

function cadastraMaquina(processador, memoria, disco, banda){
    
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

    fetch("http://localhost:8080/maquina/nova",cabecalhoMaquina)
    //.then(res => alert("foi Maquina!!!"))
    .then(res => res.json("id"))
    .then(res => recuperaMaquina(res))
    .then(res => console.log( " 7 - res dentro do fech" + res))
    .catch(err => alert("deu ruim Maquina"));

    

    return id;

}