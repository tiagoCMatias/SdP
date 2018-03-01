export function calcularTenda(tenda) {
        return calcularEstrutura(tenda);
}


export function calcularCobertura(tenda)
{
    if(tenda.tipo == "conica")
    {
        let cobertura = { qt: 1, title: "Cobertura "+tenda.tipo+" - "+tenda.cobertura+'*'+tenda.largura, codigo: 'x'}
        return cobertura;
    }
    else
    {
        return "bad config"
    }
}

export function calcularEstrutura(tenda)
{
    if(tenda.tipo == "conica")
    {
        return calcularEstruturaConica(tenda);
    }
    else if(tenda.tipo == "2aguas")
    {
        let componentes = "Empty";

        return componentes;
    }
    else if(tenda.tipo == "iglo")
    {

        return calcularEstruturaIglo(tenda);
    }
    else
        return "Error";
}

export function calcularLaterais(tenda)
{
    if(tenda.tipo == "conica")
    {
        let laterais = [];
        if(tenda.lateral_opaco > 0)
        {
            laterais.push( {qt: tenda.lateral_opaco, title: tenda.tipo+" - "+"Lateral Opaco*"+tenda.largura, codigo: ""});
        }
        if(tenda.lateral_transparante > 0)
        {
            laterais.push( {qt: tenda.lateral_transparante, title: tenda.tipo+" - "+"Lateral Transparente*"+tenda.largura, codigo: ""});
        }
        if(tenda.lateral_blackout > 0)
        {
            laterais.push( {qt: tenda.lateral_blackout, title: tenda.tipo+" - "+"Lateral Blackout*"+tenda.largura, codigo: ""});
        }

        return laterais;
    }
}

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

function calcularEstruturaIglo(tenda)
{
    let componentes = [ 
        { qt: 1, title: 'Viga Normal Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Viga Topo Redondo Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Pé Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Cabeça Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Ferro Esticar Lateral Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Sapa Chão Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Sapata Estrado Normal', codigo:''},
        { qt: 1, title: 'Sapata Estrado Topo Redondo Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Sapata Estrado Topo Direito Iglo*'+tenda.largura, codigo:''},

        { qt: 1, title: 'Chaveta Sapata-Pé', codigo:''},
        { qt: 1, title: 'Parafusos de esticar lateral', codigo:''},
        { qt: 1, title: 'Chaveta Meia-Lua', codigo:''},
        { qt: 1, title: 'Gulpilha R3.5', codigo:''},
        { qt: 1, title: 'Coroa topo redondo Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Olhal Femea M12', codigo:''},
        { qt: 1, title: 'Fita Esticar', codigo:''},
        { qt: 1, title: 'Roquete Esticar', codigo:''},
        { qt: 1, title: 'Entrega Normal Régua Cobertura Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Entrega Canto Régua Cobertura Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Entrega Normal Aluminio Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Entrega Canto Aluminio Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Tranca Cortineiro Prumo Direito Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Tranca Cortineiro Prumo Esquerdo Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Prumo Topo Direito Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Ferro esticar bacalhau Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Ferro esticar triangulo Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Aumento Prumo topo direito lateral Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Aumento Prumo topo direito central Iglo*'+tenda.largura, codigo:''},
    ];
    
    calcularIgloComponentesPartilhados(tenda);
    calcularIgloParafusos(tenda);
}

function calcularTopo(tenda)
{
    let topo = [];
    if(tenda.tipo_topo == "redondo")
    {
        topo.push(
            { qt: 1, title: 'Tranca Grossa Numero 1 topo redondo Iglo*'+tenda.largura, codigo:''},
            { qt: 1, title: 'Tranca Grossa Numero 2 topo redondo Iglo*'+tenda.largura, codigo:''},
            { qt: 1, title: 'Tranca Cortineiro topo redondo Iglo*'+tenda.largura, codigo:''}
        );
    }
    console.log("Topo "+topo);

}

function calcularIgloFina(tenda)
{
    let finas = [];
    let resto = tenda.comprimento%5;
    let modulos_5 = Math.floor(tenda.comprimento/5);
    if(tenda.largura >= 20)
    {
        if(resto == 3.75)
        {
            finas.push(
                { qt: 1, title: 'Tranca Fina 3.75m Iglo*'+tenda.largura, codigo:''}
            );
        }
        if(resto == 2.5)
        {
            finas.push(
                { qt: 1, title: 'Tranca Fina 2.5m Iglo*'+tenda.largura, codigo:''}
            );
        }
        if(resto == 1.25)
        {
            finas.push(
                { qt: 1, title: 'Tranca Fina 1.25m Iglo*'+tenda.largura, codigo:''}
            );
        }

        if(tenda.tipo_topo == "redondo")
        {
            finas.push(
                { qt: 1, title: 'Tranca Fina Numero 1 Topo Redondo Iglo*'+tenda.largura, codigo:''},
                { qt: 1, title: 'Tranca Fina Numero 2 Topo Redondo Iglo*'+tenda.largura, codigo:''},
                { qt: 1, title: 'Tranca Fina Numero 3 Topo Redondo Iglo*'+tenda.largura, codigo:''}
            );
        }
        
    }
    console.log("finas");

    console.log(finas);
    return finas;
}

function calcularCortineiroIglo(tenda)
{
    let cortineiro = [];
    let resto = tenda.comprimento%5;
    let modulos_5 = Math.floor(tenda.comprimento/5);

    if(resto == 3.75)
    {
        cortineiro.push(
            { qt: 1, title: 'Tranca Cortineiro 3.75m Iglo*'+tenda.largura, codigo:''}
        );
    }
    if(resto == 2.5)
    {
        cortineiro.push(
            { qt: 1, title: 'Tranca Fina 2.5m Iglo*'+tenda.largura, codigo:''}
        );
    }
    if(resto == 1.25)
    {
        cortineiro.push(
            { qt: 1, title: 'Tranca Fina 1.25m Iglo*'+tenda.largura, codigo:''}
        );
    }
    if(tenda.tipo_topo == "redondo" && tenda.largura >= 15)
    {
        cortineiro.push(
            { qt: 1, title: 'Tranca Cortineiro Topo Redondo Iglo*'+tenda.largura, codigo:''}
        );
    }
    if(tenda.tipo_topo == "direito")
    {
        cortineiro.push(
            { qt: 1, title: 'Tranca Cortineiro Esquerda Topo Direito Iglo*'+tenda.largura, codigo:''},
            { qt: 1, title: 'Tranca Cortineiro Direita Topo Direito Iglo*'+tenda.largura, codigo:''}
        );
        if(tenda.largura > 15)
        {
            cortineiro.push(
                { qt: 1, title: 'Tranca Cortineiro Topo Redondo Iglo*'+tenda.largura, codigo:''}
            );
        }
    }
    if(modulos_5 > 0)
    {
        cortineiro.push(
            { qt: modulos_5, title: 'Tranca Cortineiro 5m Iglo*'+tenda.largura, codigo:''}
        );
    }

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

function calcularMeiaAsna(tenda, quantidade)
{
    let meia_asna = [];

    meia_asna.push(
        { qt: 1 * quantidade, title: 'Pé Iglo*'+tenda.largura, codigo: ''},
        { qt: 2 * quantidade, title: 'Viga Normal Iglo*'+tenda.largura, codigo: ''},
        { qt: 1 * quantidade, title: 'Viga Topo Redondo Iglo*'+tenda.largura, codigo: ''},
        { qt: 2 * quantidade, title: 'Chaveta Sapata Pé Iglo*'+tenda.largura, codigo: ''},
        { qt: 2 * quantidade, title: 'Gulpilha R3.5', codigo: ''},
    );

    if(tenda.largura == 10)
    {
        meia_asna.push(
            { qt: (2 * quantidade)+2, title: 'Fita Esticar', codigo: ''},
            { qt: (2 * quantidade)+2, title: 'Roquete Esticar ', codigo: ''},
            { qt: (2 * quantidade)+2, title: 'Entrega Normal Cobertura Iglo*'+tenda.largura, codigo: ''}

        );
    }
    else if(tenda.largura > 10)
    {
        meia_asna.push(
            { qt: (1 * quantidade)+2, title: 'Fita Esticar Gancho Duplo ', codigo: ''},
            { qt: (1 * quantidade)+2, title: 'Roquete Esticar ', codigo: ''}

        );
    
    }
    if(tenda.fixacao == "Estacas" || tenda.fixacao == "Pesos" )
    {
        meia_asna.push(
            { qt: 1 * quantidade, title: 'Sapata Chão Iglo*'+tenda.largura, codigo: ''},
            { qt: 2 * quantidade, title: 'Parafuso Esticar Lateral ', codigo: ''}
        );
    }
    else if(tenda.fixacao == "Estrado")
    {
        meia_asna.push(
            { qt: 1 * quantidade, title: 'Sapata Estrado Topo Redondo Iglo*'+tenda.largura, codigo: ''},
            { qt: 2 * quantidade, title: 'Parafuso Esticar Lateral ', codigo: ''},
            { qt: 1 * quantidade, title: 'Chaveta Meia-Lua ', codigo: ''}
        );
    }

    console.log("MeiaAsna");
    console.log(meia_asna);
}

function calcularTopoDireitoIglo(tenda)
{
    let topo = [];
    let resto = tenda.comprimento%5;
    let modulos_5 = Math.floor(tenda.comprimento/5);

    let n_prumo = (tenda.largura/5)-1;

    topo.push(
        { qt: 2+n_prumo, title: 'Roquete Esticar', codigo:''},
        { qt: 1, title: 'Tranca Esquerda Topo Direito Iglo*'+tenda.largura, codigo:''},
        { qt: 1, title: 'Tranca Direita Topo Direito Iglo*'+tenda.largura, codigo:''},
        { qt: (tenda.largura/5), title: 'Ferro Esticar Lateral Iglo*'+tenda.largura, codigo:''}

    );

    if(tenda.largura >= 15)
    {
        topo.push(
            { qt: 1*((tenda.largura/5)-2), title: 'Tranca Central Topo Direito Iglo*'+tenda.largura, codigo:''}
        );
    }
    if(tenda.largura > 10)
    {
        topo.push(
            { qt: n_prumo+2, title: 'Fita Esticar Gancho Duplo Iglo*'+tenda.largura, codigo:''}
        );
    }
    if(n_prumo > 2)
    {
        topo.push(
            { qt: n_prumo, title: 'Prumo Topo Direito 15', codigo:''},
            { qt: 2, title: 'Aumento Prumo Topo Direito Lateral Iglo*'+tenda.largura, codigo:''},
            { qt: n_prumo-2, title: 'Aumento Prumo Topo Direito Central Iglo*'+tenda.largura, codigo:''},
        );
    }
    else{
        topo.push(
            { qt: n_prumo, title: 'Prumo Topo Direito Iglo*'+tenda.largura, codigo:''}
        );
    }

    if(tenda.largura == 10)
    {
        topo.push(
            { qt: 2, title: 'Ferro Esticar Triangulo Iglo*'+tenda.largura, codigo:''},
            { qt: 2, title: 'Entrega Canto Regua Aluminio Iglo*'+tenda.largura, codigo:''},
            { qt: 1, title: 'Entrega Normal Regua Aluminio Iglo*'+tenda.largura, codigo:''},
            { qt: 1, title: 'Entrega Normal Regua Aluminio Iglo*'+tenda.largura, codigo:''},
            { qt: 3, title: 'Fita Esticar Iglo*'+tenda.largura, codigo:''}
        );
    }

    if(tenda.fixacao == "Estacas" || tenda.fixacao == "Pesos" )
    {
        topo.push(
            { qt: 1 * n_prumo, title: 'Sapata Chão Iglo*'+tenda.largura, codigo: ''},
            { qt: 1 * n_prumo, title: 'Chaveta Sapata Pé Iglo*'+tenda.largura, codigo: ''},
            { qt: 2 * n_prumo, title: 'Parafuso Esticar Lateral ', codigo: ''}
        );
    }
    else if(tenda.fixacao == "Estrado")
    {
        topo.push(
            { qt: 1 * n_prumo, title: 'Sapata Estrado Topo Direito Iglo*'+tenda.largura, codigo: ''},
            { qt: 1 * n_prumo, title: 'Chaveta Sapata Pé Iglo*'+tenda.largura, codigo: ''},
            { qt: 2 * n_prumo, title: 'Parafuso Esticar Lateral ', codigo: ''},
            { qt: 1 * n_prumo, title: 'Chaveta Meia-Lua ', codigo: ''}
        );
    }

    console.log("topoDireito");
    console.log(topo);
}

function calcularCabosAco(tenda, quantidade)
{
    let cabosAco = [];

    cabosAco.push(
        { qt: 6 * quantidade, title: 'Cabos de Aço Teto Iglo*'+tenda.largura, codigo:''},
        { qt: 2 * quantidade, title: 'Cabos de Aço Pé Iglo*'+tenda.largura, codigo:''}
    );
    console.log("cabosAco");

    console.log(cabosAco);

    return cabosAco;
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

function calcularTopoIglo(tenda)
{

}

function calcularIgloParafusos(tenda)
{
    let parafusos = [];
    if(tenda.largura == 10)
    {
        parafusos.push({ qt: 1, title: 'Parafuso M12', codigo:''});
    }
    else
    {
        parafusos.push({ qt: 1, title: 'Parafuso M16', codigo:''});
    }
    return parafusos;
}
function calcularIgloComponentesPartilhados(tenda)
{
    let componentes = [];
    let resto = tenda.comprimento%5;
    let modulos_5 = Math.floor(tenda.comprimento/5);

    if(resto == 3.75)
    {
        componentes.push(
            { qt: 1, title: 'Tranca Grossa 3.75m Iglo*'+tenda.largura, codigo:''},
            { qt: 1, title: 'Tranca Cortineiro 3.75m Iglo*'+tenda.largura, codigo:''},
            
        );
        if(tenda.largura == 10)
        {
            componentes.push({ qt: 1, title: 'Ferro esticar Cobertura 3.75m Iglo*'+tenda.largura, codigo:''});
        }
        else if(tenda.largura >= 20)
        {
            componentes.push({ qt: 1, title: 'Tranca Fina 3.75m Iglo*'+tenda.largura, codigo:''});
        }
    }
    else if(resto == 2.5)
    {
        componentes.push(
            { qt: 1, title: 'Tranca Grossa 2.5m Iglo*'+tenda.largura, codigo:''},
            { qt: 1, title: 'Tranca Cortineiro 2.5m Iglo*'+tenda.largura, codigo:''},
        );
        if(tenda.largura == 10)
        {
            componentes.push({ qt: 1, title: 'Ferro esticar Cobertura 2.5m Iglo*'+tenda.largura, codigo:''});
        }
        else if(tenda.largura >= 20)
        {
            componentes.push({ qt: 1, title: 'Tranca Fina 2.5m Iglo*'+tenda.largura, codigo:''});
        }
    }
    else if(resto == 1.25)
    {
        componentes.push(
            { qt: 1, title: 'Tranca Grossa 1.25m Iglo*'+tenda.largura, codigo:''},
            { qt: 1, title: 'Tranca Cortineiro 1.25m Iglo*'+tenda.largura, codigo:''},
        );
        if(tenda.largura == 10)
        {
            componentes.push({ qt: 1, title: 'Ferro esticar Cobertura 1.25m Iglo*'+tenda.largura, codigo:''});
        }
        else if(tenda.largura >= 20)
        {
            componentes.push({ qt: 1, title: 'Tranca Fina 1.25m Iglo*'+tenda.largura, codigo:''});
        }
    }
    else {
        console.log("erro");
    }

    return componentes;
}

function calcularEstruturaConica(tenda)
{
    let componentes = [
        { qt: 4 , title: 'Pé Conica '+tenda.largura+'*'+tenda.largura, codigo: '1' },
        { qt: 4 , title: 'Viga Conica '+tenda.largura+'*'+tenda.largura, codigo: '2' },
        { qt: 4 , title: 'Diagonal '+tenda.largura+'*'+tenda.largura, codigo: '3' },
        { qt: 4 , title: 'Ferro esticar lateral '+tenda.largura+'*'+tenda.largura, codigo: '4'},
        { qt: 1 , title: 'Cone '+tenda.largura+'*'+tenda.largura, codigo:'5.1'},
        { qt: 1 , title: 'Ferro do Cone ' +tenda.largura+'*'+tenda.largura, codigo: '5.2' },
        { qt: 1  , title: 'Cruzeta '+tenda.largura+'*'+tenda.largura,codigo: '5.3'},
        { qt: 4 , title: 'Parafusos M12 80', codigo: '5.4' },
        { qt: 4 , title: 'Chapa Fixação Ferro Lateral', codigo: '5.5'},
        { qt: 8 , title: 'Gulpilha R3.5', codigo: '5.6'},
    ];

    if(tenda.fixacao == "Estrado")
        componentes.push( { qt: 4, title: 'Sapata Estrado', codigo: '5.7'}, { qt: 4 * quantidade, title: 'Chaveta Meia Lua', codigo: '5.8'});
    else if(tenda.fixacao == "Estacas")
        componentes.push( { qt : 4 , title: 'Estacas', codigo: '6'});
    else if(tenda.fixacao == "Pesos")
        componentes.push( { qt : 4, title: 'Pesos', codigo: '7' });

    return componentes;
}

function calcularComponentes(tenda, quantidade)
{
    let componentes = [
        { qt: 4 * quantidade, title: 'Pé Conica '+tenda.largura+'*'+tenda.largura, codigo: '1' },
        { qt: 4 * quantidade, title: 'Viga Conica '+tenda.largura+'*'+tenda.largura, codigo: '2' },
        { qt: 4 * quantidade, title: 'Diagonal '+tenda.largura+'*'+tenda.largura, codigo: '3' },
        { qt: 4 * quantidade, title: 'Ferro esticar lateral '+tenda.largura+'*'+tenda.largura, codigo: '4'},
        { qt: 1 * quantidade, title: 'Cone '+tenda.largura+'*'+tenda.largura, codigo:'5.1'},
        { qt: 1 * quantidade, title: 'Ferro do Cone ' +tenda.largura+'*'+tenda.largura, codigo: '5.2' },
        { qt: 1 * quantidade , title: 'Cruzeta '+tenda.largura+'*'+tenda.largura,codigo: '5.3'},
        { qt: 4 * quantidade, title: 'Parafusos M12 80', codigo: '5.4' },
        { qt: 4 * quantidade, title: 'Chapa Fixação Ferro Lateral', codigo: '5.5'},
        { qt: 8 * quantidade, title: 'Gulpilha R3.5', codigo: '5.6'},
    ];

    componentes.push( { qt: 4 * quantidade, title: 'Lateral ' + tenda.laterais, codigo: '1'});
    componentes.push( { qt: 1 * quantidade, title: 'Cobertura ' + tenda.laterais, codigo: '1'});
    componentes.push( { qt: 1 * quantidade, title: 'Conjunto Filetes ' + tenda.largura, codigo: '1'});

    if(tenda.fixacao == "Estrado")
        componentes.push( { qt: 4 * quantidade, title: 'Sapata Estrado', codigo: '5.7'}, { qt: 4 * quantidade, title: 'Chaveta Meia Lua', codigo: '5.8'});
    else if(tenda.fixacao == "Estacas")
        componentes.push( { qt : 4 * quantidade , title: 'Estacas', codigo: '6'});
    else if(tenda.fixacao == "Pesos")
        componentes.push( { qt : 4 * quantidade, title: 'Pesos', codigo: '7' });

    return componentes;
}