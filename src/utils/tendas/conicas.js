export function calcularEstruturaConica(tenda)
{
    return calcularEstruturaConica(tenda);
}

export function calcularLateraisConica(tenda)
{
    let laterais = [];
    if(tenda.lateral_opaco > 0)
    {
        laterais.push( {qt: tenda.lateral_opaco, title: "Conica Lateral Opaco*"+tenda.largura, codigo: ""});
    }
    if(tenda.lateral_transparante > 0)
    {
        laterais.push( {qt: tenda.lateral_transparante, title: "Conica Lateral Transparente*"+tenda.largura, codigo: ""});
    }
    if(tenda.lateral_blackout > 0)
    {
        laterais.push( {qt: tenda.lateral_blackout, title: "Conica Lateral Blackout*"+tenda.largura, codigo: ""});
    }

    return laterais;
    
}

export function calcularCoberturaConica(tenda)
{
    let cobertura = { qt: 1, title: "Cobertura Conica - "+tenda.cobertura+'*'+tenda.largura, codigo: 'x'}
    return cobertura;
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