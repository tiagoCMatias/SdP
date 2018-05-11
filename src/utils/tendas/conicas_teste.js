export function calcularEstruturaConica(tenda)
{
    return calcularEstruturaConica(tenda);
}

export function calcularLateraisConica(lateral, estrutura)
{
    let laterais = [];
    if(lateral.opaco > 0)
    {
        laterais.push( {qt: lateral.opaco, title: "Conica Lateral Opaco*"+estrutura.tamanho, codigo: ""});
    }
    if(lateral.transparente > 0)
    {
        laterais.push( {qt: lateral.transparente, title: "Conica Lateral Transparente*"+estrutura.tamanho, codigo: ""});
    }
    if(lateral.blackout > 0)
    {
        laterais.push( {qt: lateral.blackout, title: "Conica Lateral Blackout*"+estrutura.tamanho, codigo: ""});
    }

    return laterais;
    
}

export function calcularCoberturaConica(cobertura, estrutura)
{
    return { qt: 1, title: "Cobertura Conica - "+cobertura+'*'+estrutura.tamanho, codigo: 'x'};
}

function calcularEstruturaConica(tenda)
{
    let quantidade = 1;
    let componentes = [
        { qt: 4 , title: 'Pé Conica '+tenda.tamanho+'*'+tenda.tamanho, codigo: '1' },
        { qt: 4 , title: 'Viga Conica '+tenda.tamanho+'*'+tenda.tamanho, codigo: '2' },
        { qt: 4 , title: 'Diagonal '+tenda.tamanho+'*'+tenda.tamanho, codigo: '3' },
        { qt: 4 , title: 'Ferro esticar lateral '+tenda.tamanho+'*'+tenda.tamanho, codigo: '4'},
        { qt: 1 , title: 'Cone '+tenda.tamanho+'*'+tenda.tamanho, codigo:'5.1'},
        { qt: 1 , title: 'Ferro do Cone ' +tenda.tamanho+'*'+tenda.tamanho, codigo: '5.2' },
        { qt: 1  , title: 'Cruzeta '+tenda.tamanho+'*'+tenda.tamanho,codigo: '5.3'},
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

export function UpdateRepeatedValues(componentes)
{
    let repetidos;
    console.log(componentes.length);
    for(var i = 0; i < componentes.length; i++)
    {
        for(var j = 0 ; j < componentes.length; j++)
        {
            if(j != i && componentes[i].title == componentes[j].title)
            {
                componentes[i].qt += componentes[j].qt;
                console.log("Repetido: " + componentes[i].title);
                componentes.splice (j, 1);

            }
        }
    }
    return componentes;
}