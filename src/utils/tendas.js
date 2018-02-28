export function calcularTenda(tenda, quantidade) {


        return calcularComponentes(tenda, quantidade);

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