export function calcularIglo(tenda)
{
    let iglo = [];
    let resto = tenda.comprimento%5;
    let modulos_5 = Math.floor(tenda.comprimento/5);

    calcularModulosIglo(tenda);

    if(modulos_5%2 == 0)
        calcularCabosAco(tenda, modulos_5/2);
    else
        calcularCabosAco(tenda, ((modulos_5-1)/2));

    calcularAsnasIglo(tenda);
    calcularCortineiroIglo(tenda);
    calcularIgloFina(tenda);    
    calcularTopoDireitoIglo(tenda);

    let quantidade = (tenda.largura/5)+1;
    calcularMeiaAsna(tenda, quantidade);
    calcularMeioModulo(tenda, quantidade);

    calcularTopoRedondo(tenda);

    return iglo;
}

function calcularAsnasIglo(tenda)
{
    let resto = tenda.comprimento%5;

    let modulos_5 = Math.floor(tenda.comprimento/5);

    let asnas = [];

    let n_asnas = 1;

    if(resto)
        n_asnas = 2;
    else
        n_asnas = 1;

    asnas.push(
        { qt: 2*(modulos_5+n_asnas), title: 'Pé Iglo*'+tenda.largura, codigo:''},
        { qt: 6*(modulos_5+n_asnas), title: 'Viga Normal Iglo*'+tenda.largura, codigo:''},
        { qt: 7*(modulos_5+n_asnas), title: 'Cabeça Iglo*'+tenda.largura, codigo:''},
        { qt: 2*(modulos_5+n_asnas), title: 'Roquete Esticar Iglo*'+tenda.largura, codigo:''},
        { qt: 2*(modulos_5+n_asnas), title: 'Gulpilha R3.5', codigo:''}
    );

    if(tenda.fixacao == "Estacas" || tenda.fixacao == "Pesos" )
    {
        asnas.push(
            { qt: 2 * (modulos_5+n_asnas), title: 'Sapata Chão Iglo*'+tenda.largura, codigo: ''},
            { qt: 2 * (modulos_5+n_asnas), title: 'Chaveta Sapata Pé Iglo*'+tenda.largura, codigo: ''},
            { qt: 4 * (modulos_5+n_asnas), title: 'Parafuso Esticar Lateral ', codigo: ''}
        );
    }
    else if(tenda.fixacao == "Estrado")
    {
        asnas.push(
            { qt: 2 * (modulos_5+n_asnas), title: 'Sapata Estrado Normal Iglo*'+tenda.largura, codigo: ''},
            { qt: 2 * (modulos_5+n_asnas), title: 'Chaveta Sapata Pé Iglo*'+tenda.largura, codigo: ''},
            { qt: 4 * (modulos_5+n_asnas), title: 'Parafuso Esticar Lateral ', codigo: ''},
            { qt: 2 * (modulos_5+n_asnas), title: 'Chaveta Meia-Lua ', codigo: ''}
        );
    }

    if(tenda.largura > 10)
    {
        asnas.push(
            { qt: 42*(modulos_5+n_asnas), title: 'Parafusos M16 Iglo*'+tenda.largura, codigo:''},
            { qt: 2*(modulos_5+n_asnas), title: 'Fita Esticar Gancho Duplo Iglo*'+tenda.largura, codigo:''}
        );
    }
    else if(tenda.largura == 10)
    {
        
        asnas.push(
            { qt: 28*(modulos_5+n_asnas), title: 'Parafusos M12 Iglo*'+tenda.largura, codigo:''},
            { qt: 2*(modulos_5+n_asnas), title: 'Fita Esticar Iglo*'+tenda.largura, codigo:''}
        );

        if(modulos_5 == 1)
        {
            asnas.push(
                { qt: 4, title: 'Entrega Canto Regua Cobertura Iglo*'+tenda.largura, codigo:''}
            ); 
        }
        else if(modulos_5 > 1)
        {
            if(resto)
            {
                asnas.push(
                    { qt: 4, title: 'Entrega Canto Regua Cobertura Iglo*'+tenda.largura, codigo:''},
                    { qt: 2*(modulos_5), title: 'Entrega Normal Cobertura Iglo*'+tenda.largura, codigo:''}
                );
            }
            else{
                asnas.push(
                    { qt: 4, title: 'Entrega Canto Regua Cobertura Iglo*'+tenda.largura, codigo:''},
                    { qt: 2*(modulos_5-1), title: 'Entrega Normal Cobertura Iglo*'+tenda.largura, codigo:''}
                );
            }
            
        }
    }
    console.log("asnas");

    console.log(asnas);

    return asnas;
}



function calcularMeioModulo(tenda, quantidade)
{
    let meio_modulo = [];

    quantidade = quantidade + 1;
    meio_modulo.push(
        { qt: 1 * quantidade , title: 'Tranca Grossa Numero 1 Topo Redondo Iglo*'+tenda.largura, codigo: ''},
        { qt: 1 *quantidade, title: 'Tranca Grossa Numero 2 Topo Redondo Iglo*'+tenda.largura, codigo: ''},
        { qt: 1 *quantidade, title: 'Tranca Cortineiro Topo Redondo Iglo*'+tenda.largura, codigo: ''}
    );

    if(tenda.largura > 15)
    {
        meio_modulo.push(
            { qt: 1 *quantidade, title: 'Tranca Fina Numero 1 Topo Redondo Iglo*'+tenda.largura, codigo: ''},
            { qt: 1 *quantidade, title: 'Tranca Fina Numero 2 Topo Redondo Iglo*'+tenda.largura, codigo: ''},
            { qt: 1 *quantidade, title: 'Tranca Fina Numero 3 Topo Redondo Iglo*'+tenda.largura, codigo: ''}
        );
    }

    console.log("Meio_Modulo");
    console.log(meio_modulo);
}

function calcularTopoRedondo(tenda)
{
    let topo = [];

    topo.push(
        { qt: 1 , title: 'Coroa Topo Redondo Iglo*'+tenda.largura, codigo: ''},
        { qt: 1 , title: 'Chapeu Chines ', codigo: ''},

    );

    console.log("Topo");
    console.log(topo);

}


function calcularFerroEsticarCobertura(tenda)
{
    let ferro_esticar_cobertura = [];

    let resto = tenda.comprimento%5;
    let modulos_5 = Math.floor(tenda.comprimento/5);

    if(tenda.largura == 10){
        if(resto == 3.75)
        {
            ferro_esticar_cobertura.push(
                { qt: 2, title: 'Ferro Esticar Cobertura 3.75m Iglo*'+tenda.largura, codigo:''}
            );
        }
        if(resto == 2.5)
        {
            ferro_esticar_cobertura.push(
                { qt: 2, title: 'Ferro Esticar Cobertura 2.5m Iglo*'+tenda.largura, codigo:''}
            );
        }
        if(resto == 1.25)
        {
            ferro_esticar_cobertura.push(
                { qt: 2, title: 'Ferro Esticar Cobertura 1.25m Iglo*'+tenda.largura, codigo:''}
            );
        }

        if(modulos_5 > 0)
        {
            ferro_esticar_cobertura.push(
                { qt: 2 * modulos_5, title: 'Ferro Esticar Cobertura 5m Iglo*'+tenda.largura, codigo:''}
            );
        }
    }
    console.log("ferro_esticar_cobertura");

    console.log(ferro_esticar_cobertura);
    return ferro_esticar_cobertura;
}


function calcularModulosIglo(tenda)
{
    let resto = tenda.comprimento%5;
    let modulos_5 = Math.floor(tenda.comprimento/5);

    let modulos = [];

    console.log(modulos_5 + "-" +tenda.largura);

    if(modulos_5 > 1)
    {
        modulos.push(
            { qt: 2 * modulos_5, title: 'Tranca Cortineiro 5m Iglo*'+tenda.largura, codigo:''},
            { qt: 5 * modulos_5, title: 'Tranca Grossa 5m Iglo*'+tenda.largura, codigo:''},
            { qt: 2 * modulos_5, title: 'Ferro Esticar Lateral 5m Iglo*'+tenda.largura, codigo:''}
        );
        if(tenda.largura >= 20)
        {
            modulos.push(
                { qt: 6 * modulos_5, title: 'Tranca Fina 5m Iglo*'+tenda.largura, codigo:''}
            );
            if(resto)
            {
                modulos.push(
                    { qt: 6 * modulos_5, title: 'Tranca Fina '+resto+'m Iglo*'+tenda.largura, codigo:''}
                );
            }            
        }
        if(tenda.largura == 10)
        {
            modulos.push(
                { qt: 6 * modulos_5, title: 'Tranca Fina 5m Iglo*'+tenda.largura, codigo:''}
            );
        }
        if(resto)
        {
            modulos.push(
                { qt: 2 , title: 'Tranca Cortineiro '+resto+'m Iglo*'+tenda.largura, codigo:''},
                { qt: 5 , title: 'Tranca Grossa '+resto+'m Iglo*'+tenda.largura, codigo:''},
                { qt: 2 , title: 'Tranca Esticar Lateral '+resto+'m Iglo*'+tenda.largura, codigo:''},
            );
        }
        calcularFerroEsticarCobertura(tenda);
    }
    console.log("Modulos");
    console.log(modulos);
}


function calcularFerroEsticarCobertura(tenda)
{
    let ferro_esticar_cobertura = [];

    let resto = tenda.comprimento%5;
    let modulos_5 = Math.floor(tenda.comprimento/5);

    if(tenda.largura == 10){
        if(resto == 3.75)
        {
            ferro_esticar_cobertura.push(
                { qt: 2, title: 'Ferro Esticar Cobertura 3.75m Iglo*'+tenda.largura, codigo:''}
            );
        }
        if(resto == 2.5)
        {
            ferro_esticar_cobertura.push(
                { qt: 2, title: 'Ferro Esticar Cobertura 2.5m Iglo*'+tenda.largura, codigo:''}
            );
        }
        if(resto == 1.25)
        {
            ferro_esticar_cobertura.push(
                { qt: 2, title: 'Ferro Esticar Cobertura 1.25m Iglo*'+tenda.largura, codigo:''}
            );
        }

        if(modulos_5 > 0)
        {
            ferro_esticar_cobertura.push(
                { qt: 2 * modulos_5, title: 'Ferro Esticar Cobertura 5m Iglo*'+tenda.largura, codigo:''}
            );
        }
    }
    console.log("ferro_esticar_cobertura");

    console.log(ferro_esticar_cobertura);
    return ferro_esticar_cobertura;
}