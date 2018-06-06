export function calcEstrado(largura, comprimento) {
    return new Promise(function (resolve, reject) {
		let b_vertical = calcularBarras2Verticais(largura, comprimento);
        let b_horizontais = calcularBarras2Horizontais(largura, comprimento);
        let taipal = calcularTaipal( largura, comprimento );
        let b_total = b_horizontais + b_vertical;

        let b125 = calcularBarras125(largura, comprimento);

        let pontoApoio = calcularPontosApoio(largura, comprimento);

        let resposta = {
            taipal: taipal,
            b25_total: b_total,
            b125: b125,
            pontoApoio: pontoApoio
        };
        
        return resolve(resposta);
	});
}

export function calcularEstrado(largura, comprimento) {
    let b_vertical = calcularBarras2Verticais(largura, comprimento);
    let b_horizontais = calcularBarras2Horizontais(largura, comprimento);
    let taipal = calcularTaipal( largura, comprimento );
    let b_total = b_horizontais + b_vertical;

    let b125 = calcularBarras125(largura, comprimento);

    let pontoApoio = calcularPontosApoio(largura, comprimento);

    let resposta = [
        { qt: taipal, title:"Taipal Estrado", codigo: "" },
        { qt: b_total, title: "Barras 2.5 Estrado", codigo: ""},
        { qt: b125, title: "Barras 1.25 Estrado", codigo: ""},
        { qt: pontoApoio, title: "Pontos de Apoio", codigo: ""}
    ];

    return resposta;
        
}


function calcularBarras125(largura, comprimento){
    return calcularn1(largura, comprimento) 
    + calcularn2(largura, comprimento) 
    + calcularm1(largura, comprimento) 
    + calcularm2(largura, comprimento);
}

function calcularPontosApoio(largura, comprimento){
    let factor_mult = 0;
    let pontoApoio = 0;
    if(largura%2.5 == 0)
    {
        pontoApoio = (largura/2.5) + 1;
    }
    else{
        pontoApoio = ((largura-1.25)/2.5) + 2;
    }

    if(comprimento % 2.5 == 0){
        factor_mult = (comprimento/2.5)+1;
    }
    else{
        factor_mult = ((comprimento-1.25)/2.5)+2;
    }
    return factor_mult*pontoApoio;
}

function calcularm1(largura, comprimento){
    let factor_mult = 0;
    let b = 0;
    if(comprimento%2.5 == 0){
        factor_mult = 0;
    }
    else{
        factor_mult = 1;
    }

    if(largura % 2.5 == 0){
        b = (largura/2.5 + 1);
    }
    else{
        b = ((largura-1.25)/2.5)+2;
    }
    //console.log("m1:" + factor_mult*b);
    return factor_mult*b;
}

function calcularm2(largura, comprimento){
    let factor_mult = 0;
    let b = 0;
    if(comprimento%2.5 == 0){
        factor_mult = (comprimento/2.5)*2;
    }
    else
    {
        //factor_mult = (((comprimento - 1.25)/2.5)*2)+1;
        if(largura%2.5 == 0){
            b = largura/2.5;
        }
        else{
            b =((largura-1.25)/2.5);
        }
    }
    return b;
}

function calcularn2(largura, comprimento){
    let factor_mult = 0;
    let b = 0;
    if(largura%2.5 == 0){
        factor_mult = (largura/2.5)*2;
    }
    else
    {
        factor_mult = (((largura - 1.25)/2.5)*2)+1;
    }
    //console.log("factor_mult:"+ factor_mult);
    if(comprimento%2.5==0){
        b = (comprimento/2.5);
    }
    else{
        b = ((comprimento-1.25)/2.5);
    }
    //console.log("n2:"+ b*factor_mult);
    return b*factor_mult;
}

function calcularn1(largura, comprimento){
    let factor_mult = 0;
    let b = 0;
    if(largura % 2.5 != 0)
    {
        factor_mult = 1;
    }

    if(comprimento % 2.5 == 0)
    {
        b = (comprimento/2.5 + 1);
    }
    else
    {
        b = (comprimento - 1.25)/2.5 + 2;
    }

    //console.log("n1:" + factor_mult*b);
    return factor_mult*b;
}

function calcularTaipal(largura, comprimento){
    return ((largura/1.25) * (comprimento/1.25));
}

function calcularBarras2Horizontais(largura, comprimento){

    let b_horizontais = 0;
    let resto = comprimento%2.5;
    let b = comprimento;
    let a = 0;

    if(comprimento%2.5 == 0){
        b = (b / 2.5) + 1;
    }
    else{
        b = ((b - 1.25) / 2.5)+2;
        //console.log(b);
    }
    if(largura >= 2.5)
    {
        if(largura%2.5 == 0){
            a = largura / 2.5;
            b_horizontais = a * b;
        }
        else{
            //console.log("1-"+ (largura - 1.25));
            //console.log("2-"+(largura - 1.25)/2.5);

            a = (largura - 1.25) / 2.5;
            b_horizontais = a * b;
        }
    }

    return b_horizontais;
}

function calcularBarras2Verticais(largura, comprimento){

    let b_vertical = 0;
    
    let b = comprimento%2.5;
    let a = ( largura / 1.25 ) + 1;
    //console.log(a);
    if( comprimento >= 2.5) {
        if( !b ){
            b_vertical = ( comprimento / 2.5 ) * a;
        }
        else{
            b_vertical = ( (comprimento-1.25) / 2.5 ) * a;
        }
    }

    return b_vertical;
}

function getBase64Image(url) {
    return new Promise(function(resolve, reject) {
  
      var img = new Image();
      // To prevent: "Uncaught SecurityError: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported."
      img.crossOrigin = "Anonymous"; 
      img.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL.replace(/^data:image\/(png|jpg|jpeg|pdf);base64,/, ""));
      };  
      img.src = url;   
      
      return resolve(url);
    });
  
};