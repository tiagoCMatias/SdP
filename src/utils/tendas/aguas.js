export function calcularAguas(tenda)
{
    let modulo_especial = tenda.comprimento%5;
    let modulos_5 = Math.floor(tenda.comprimento/5);


    let components = [];

    let quantidade = Math.floor((tenda.comprimento/5)+1);
    if(modulo_especial)
        quantidade++;

    components = components.concat(calcularAsnas(tenda, quantidade));
    components = components.concat(calcularFerroCabeca(tenda));
    components = components.concat(cabosAco(tenda));
    components = components.concat(ferragens(tenda, quantidade));
    
    console.log("Comp");
    console.log(UpdateRepeatedValues(components));

    modulosAguas(tenda);

}

function calcularAsnas(tenda, quantidade)
{
    let components = [];

    if(tenda.fixacao == "Estacas")
    {
        components.push(
            { qt: 2 * quantidade, title: "Sapata Chão 2aguas*"+tenda.largura, codigo:""},
            { qt: 2 * quantidade, title: "Estacas", codigo:""},
        );
    }
    else if(tenda.fixacao == "Pesos")
    {
        components.push(
            { qt: 2 * quantidade, title: "Sapata Chão 2aguas*"+tenda.largura, codigo:""},
            { qt: 1 * quantidade, title: "Pesos", codigo:""},
        );
    }
    else if(tenda.fixacao == "Estrado")
    {
        components.push(
            { qt: 2 * quantidade, title: "Sapata Estrado 2aguas*"+tenda.largura, codigo:""},
            { qt: 2 * quantidade, title: "Gulpilha R3.5", codigo:""},
            { qt: 2 * quantidade, title: "Chaveta Meia-lua", codigo:""},
        );
    }
    components.push(
        { qt: 2 * quantidade, title: "Pé 2aguas*"+tenda.largura+" - "+tenda.altura_do_pe, codigo:""},
        { qt: 2 * quantidade, title: "Roquete Esticar", codigo:""},
        { qt: 2 * quantidade, title: "Fita Esticar", codigo:""},
        { qt: (2 * quantidade)-4, title: "Entregas Normais "+tenda.largura, codigo:""},
        { qt: 4, title: "Entregas Canto "+tenda.largura, codigo:""}
    );

    let resto = tenda.largura%5;

    if(resto)
    {
        components.push(
            { qt: 2 *quantidade, title: "Viga "+ (tenda.largura-resto), codigo: "" },
            { qt: 2 *quantidade, title: "Viga Aumento "+resto, codigo: "" }
        );
    }
    else{
        components.push(
            { qt: 2 * quantidade, title: "Viga "+ (tenda.largura), codigo: "" }
        );
    }
    
    if(tenda.largura <= 12.5)
    {
        components.push(
            { qt: 1 * quantidade, title: "Cabeça 10", codigo: "" }
        );
    }
    else if(tenda.largura > 12.5)
    {
        components.push(
            { qt: 1 * quantidade, title: "Cabeça 15", codigo: "" }
        );
    }

    return components;
}

function calcularFerroCabeca(tenda)
{
    let ferroCabeca = [];

    let asnas = tenda.comprimento/5;
    let modulos_5 = Math.floor(tenda.comprimento/5);
    let modulo_especial = tenda.comprimento%5;

    if(tenda.largura == 12.5 || tenda.largura == 15)
    {
        if(modulo_especial)
        {
            ferroCabeca.push(
                { qt: (1 * modulos_5)+2, title: "Ferro da Cabeça 2aguas*"+tenda.largura, codigo: "" },
                { qt: (modulos_5+1)*2, title: "Gulpilha R3.5", codigo:"" },
                { qt: 2*((1 * modulos_5)+2), title: "Chaveta Ferro da Cabeça", codigo:"" }

            );
        }
        else
        {
            ferroCabeca.push(
                { qt: (1 * modulos_5)+1, title: "Ferro da Cabeça 2aguas*"+tenda.largura, codigo: "" },
                { qt: (modulos_5+1)*2, title: "Gulpilha R3.5", codigo:"" },
                { qt: 2*((1 * modulos_5)+1), title: "Chaveta Ferro da Cabeça", codigo:"" }


            );
        }
    }
    if(tenda.largura > 15)
    {
        if(modulo_especial)
        {
            ferroCabeca.push(
                { qt: (1 * modulos_5)+2, title: "Ferro da Cabeça 2aguas*"+tenda.largura, codigo: "" },
                { qt: 2*(1 * modulos_5)-1, title: "Gulpilha R3.5", codigo:"" },
                { qt: 2*((1 * modulos_5)+2), title: "Chaveta Ferro da Cabeça", codigo:"" }
            );
        }
        else
        {
            ferroCabeca.push(
                { qt: (1 * modulos_5)-1, title: "Ferro da Cabeça 2aguas*"+tenda.largura, codigo: "" },
                { qt: 2*(1 * modulos_5)-2, title: "Gulpilha R3.5", codigo:"" },
                { qt: 2*((1 * modulos_5)-1), title: "Chaveta Ferro da Cabeça", codigo:"" }


            );
        }
    }

    return ferroCabeca;
}

function cabosAco(tenda)
{
    let cabosAco = [];
    let modulos_5 = Math.floor(tenda.comprimento/5);
    let quantidade = Math.floor(modulos_5/5)+1;
    if(tenda.largura <=15)
    {
        cabosAco.push(
            { qt: 2 * quantidade, title: "Cabo Aço Tecto 2aguas*"+tenda.largura, codigo:"" },
            { qt: 2 * quantidade, title: "Cabo Aço Pé " +tenda.altura_do_pe +"m 2aguas*"+tenda.largura, codigo: ""}
        );
    }
    if(tenda.largura == 17.5)
    {
        cabosAco.push(
            { qt: 2 * quantidade, title: "Cabo Aço Tecto 20", codigo: ""},
            { qt: 2 * quantidade, title: "Cabo Aço Tecto 17.5", codigo: ""},

            { qt: 2 * quantidade, title: "Cabo Aço Pé " +tenda.altura_do_pe +"m 2aguas*"+tenda.largura, codigo: ""}
        );
    }
    if(tenda.largura == 20)
    {
        cabosAco.push(
            { qt: 4 * quantidade, title: "Cabo Aço Tecto 20", codigo: ""},
            { qt: 2 * quantidade, title: "Cabo Aço Pé " +tenda.altura_do_pe +"m 2aguas*"+tenda.largura, codigo: ""}
        );
    }
    return cabosAco;
}

function ferragens(tenda, quantidade)
{
    let ferragens = [];

    ferragens.push(
        { qt: 2 * quantidade, title: "Sapata Pé 2aguas*"+tenda.largura, codigo:"" },
        { qt: 2 * quantidade, title: "Gulpilha R3.5", codigo:"" },
        { qt: 4 * quantidade, title: "Chavetas Pé Asna 2aguas*"+tenda.largura, codigo:"" },
        { qt: 4 * quantidade, title: "Chavetas da Cabeça 2aguas*"+tenda.largura, codigo:"" },
    );
    
    if(tenda.largura <= 12.5)
    {
        ferragens.push(
            { qt: 4 * quantidade, title: "Gulpilha R3.5", codigo:"" }
        );
    }
    return ferragens;
}


function UpdateRepeatedValues(componentes)
{
    let repetidos;
    console.log(componentes);
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
    //console.log(componentes);

    return componentes;
}


function modulosAguas(tenda)
{
    let components = [];
    let modulos_5 = Math.floor(tenda.comprimento/5);
    let modulo_especial = tenda.comprimento%5;

    if(tenda.largura <= 12.5)
    {
        components.push(
            { qt: 2*modulos_5, title: 'Cortineiro 10m - 5', codigo: '' },
            { qt: 1*modulos_5, title: 'Central 10m - 5', codigo: '' },
            { qt: 2*modulos_5, title: 'Régua Aluminio Esticar Cobertura - 5', codigo: '' },
            { qt: 2*modulos_5, title: 'Tubo Esticar Lateral - 5', codigo: '' }

        );
        if(modulo_especial)
        {
            components.push(
                { qt: 2, title: 'Cortineiro 10m - '+modulo_especial, codigo: '' },
                { qt: 1, title: 'Central 10m - '+modulo_especial, codigo: '' },
                { qt: 2, title: 'Régua Aluminio Esticar Cobertura - '+modulo_especial, codigo: '' },
                { qt: 2, title: 'Tubo Esticar Lateral - '+modulo_especial, codigo: '' },
                { qt: 2, title: "Tranca Fina 10m - "+modulo_especial, codigo: ''}
            );
        }
    }

    if(tenda.largura == 10 || tenda.largura == 12.5)
    {
        components.push(
            { qt: 2*modulos_5, title: "Tranca Fina 10m", codigo: ''}
        );
    }

    if(tenda.largura > 15 && tenda.largura < 20)
    {
        components.push(
            { qt: 2*modulos_5, title: "Cortineiro 15m", codigo: ''},
            { qt: 6*modulos_5, title: "Tranca Fina 15m", codigo: ''},
            { qt: 1*modulos_5, title: "Central 15m", codigo: ''},
            { qt: 2*modulos_5, title: "Ferro Esticar Cobertura 15m", codigo: ''},
            { qt: 2*modulos_5, title: "Ferro Esticar Lateral 15m", codigo: ''}
        );
        if(modulo_especial)
        {
            components.push(
                { qt: 2, title: "Cortineiro 15m -"+modulo_especial, codigo: ''},
                { qt: 6, title: "Tranca Fina 15m -"+modulo_especial, codigo: ''},
                { qt: 1, title: "Central 15m -"+modulo_especial, codigo: ''},
                { qt: 2, title: "Ferro Esticar Cobertura 15m -"+modulo_especial, codigo: ''},
                { qt: 2, title: "Ferro Esticar Lateral 15m -"+modulo_especial, codigo: ''}
            );
        }
    }

    if(tenda.largura == 20)
    {
        components.push(
            { qt: 2*modulos_5, title: "Cortineiro 15m", codigo: ''},
            { qt: 6*modulos_5, title: "Tranca Fina 15m", codigo: ''},
            { qt: 3*modulos_5, title: "Central 15m", codigo: ''},
            { qt: 2*modulos_5, title: "Ferro Esticar Cobertura 15m", codigo: ''},
            { qt: 2*modulos_5, title: "Ferro Esticar Lateral 15m", codigo: ''}
        );

        if(modulo_especial)
        {
            components.push(
                { qt: 2, title: "Cortineiro 15m -"+modulo_especial, codigo: ''},
                { qt: 6, title: "Tranca Fina 15m -"+modulo_especial, codigo: ''},
                { qt: 3, title: "Central 15m -"+modulo_especial, codigo: ''},
                { qt: 2, title: "Ferro Esticar Cobertura 15m -"+modulo_especial, codigo: ''},
                { qt: 2, title: "Ferro Esticar Lateral 15m -"+modulo_especial, codigo: ''}
            );
        }
    }

    console.log(components);
}


function calcularTriangulo(tenda)
{
    let triangulo = [];
    let quantidade = 1;

    if(tenda.largura == 5)
    {
        triangulo.push(
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo Aguas 5m", codigo: ""},
            { qt: 1 * quantidade, title: "Régua Aluminio Esticar Cobertura 5m", codigo: ""},
            { qt: 2 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Entregas Canto", codigo: ""},
            { qt: 2 * quantidade, title: "", codigo: ""},
            
        );
    }
    
}