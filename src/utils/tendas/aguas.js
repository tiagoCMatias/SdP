export function calcularAguas(tenda)
{
    let modulo_especial = tenda.comprimento%5;
    let modulos_5 = Math.floor(tenda.comprimento/5);


    let components = [];

    let quantidade = Math.floor((tenda.comprimento/5)+1);
    if(modulo_especial)
        quantidade++;

        console.log("quant: "+quantidade);
    components = components.concat(calcularAsnas(tenda, quantidade));
    components = components.concat(calcularFerroCabeca(tenda));
    components = components.concat(cabosAco(tenda));
    components = components.concat(ferragens(tenda, quantidade));
    components = components.concat(modulosAguas(tenda));
    
    //console.log("Comp");
    //console.log(UpdateRepeatedValues(components));


    return UpdateRepeatedValues(components);
}

function calcularAsnas(tenda, quantidade)
{
    let components = [];

    if(tenda.fixacao == "Estacas")
    {
        components.push(
            { qt: 2 * quantidade, title: "Sapata Chão "+tenda.largura, codigo:""},
            { qt: 4 * quantidade, title: "Estacas", codigo:""},
        );
    }
    else if(tenda.fixacao == "Pesos")
    {
        components.push(
            { qt: 2 * quantidade, title: "Sapata Chão "+tenda.largura, codigo:""},
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
        { qt: (2 * quantidade)-4, title: "Entrega Normal 10", codigo:""},
        { qt: 4, title: "Entrega Canto 10", codigo:""}
    );

    let resto = tenda.largura%5;

    if(resto)
    {
        components.push(
            { qt: 2 *quantidade, title: "Viga "+ (tenda.largura-resto), codigo: "" },
            { qt: 2 *quantidade, title: "Viga Aumento "+resto, codigo: "" },
            { qt: 4 *quantidade, title: "Chaveta da Cabeça 2aguas*"+tenda.largura, codigo: "" }
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
                { qt: (1 * modulos_5), title: "Ferro da Cabeça 2aguas*"+tenda.largura, codigo: "" },
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
        { qt: 2 * quantidade, title: "Chaveta Sapata Pé 15", codigo:"" },
        { qt: 2 * quantidade, title: "Gulpilha R3.5", codigo:"" },
        { qt: 4 * quantidade, title: "Chaveta Pé Asna 2aguas*"+tenda.largura, codigo:"" },
        { qt: 4 * quantidade, title: "Chaveta da Cabeça 2aguas*"+tenda.largura, codigo:"" },
    );
    
    if(tenda.largura <= 12.5)
    {
        ferragens.push(
            { qt: 4 * quantidade, title: "Gulpilha R3.5", codigo:"" },
            { qt: 2 * quantidade, title: "Chaveta Sapata Pé 10", codigo:"" },
        );
    }
    return ferragens;
}


export function UpdateRepeatedValues(componentes)
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
            { qt: 2*modulos_5, title: "Ferro Esticar Lateral 10m", codigo: ''},

        );
        if(modulo_especial)
        {
            components.push(
                { qt: 2, title: 'Cortineiro 10m - '+modulo_especial, codigo: '' },
                { qt: 1, title: 'Central 10m - '+modulo_especial, codigo: '' },
                { qt: 2, title: 'Régua Aluminio Esticar Cobertura - '+modulo_especial, codigo: '' },
                { qt: 2, title: "Tranca Fina 10m - "+modulo_especial, codigo: ''},
                { qt: 2, title: "Ferro Esticar Lateral 10m - "+ modulo_especial, codigo: ''},

            );
        }
    }

    if(tenda.largura == 10 || tenda.largura == 12.5)
    {
        components.push(
            { qt: 2*modulos_5, title: "Tranca Fina 10m", codigo: ''},
            { qt: 2*modulos_5, title: "Ferro Esticar Lateral 10m", codigo: ''}
        );
    }

    if(tenda.largura >= 15 && tenda.largura < 20)
    {
        components.push(
            { qt: 2*modulos_5, title: "Cortineiro 15m", codigo: ''},
            { qt: 6*modulos_5, title: "Tranca Fina 15m", codigo: ''},
            { qt: 1*modulos_5, title: "Central 15m", codigo: ''},
            { qt: 2*modulos_5, title: "Régua Esticar Cobertura 15m", codigo: ''},
            { qt: 2*modulos_5, title: "Ferro Esticar Lateral 15m", codigo: ''},
            { qt: 4*modulos_5, title: "Parafuso Esticar Lateral", codigo: ''}

        );
        if(modulo_especial)
        {
            components.push(
                { qt: 2, title: "Cortineiro 15m -"+modulo_especial, codigo: ''},
                { qt: 6, title: "Tranca Fina 15m -"+modulo_especial, codigo: ''},
                { qt: 1, title: "Central 15m -"+modulo_especial, codigo: ''},
                { qt: 2, title: "Régua Esticar Cobertura 15m -"+modulo_especial, codigo: ''},
                { qt: 2, title: "Ferro Esticar Lateral 15m -"+modulo_especial, codigo: ''},
                { qt: 4, title: "Parafuso Esticar Lateral", codigo: ''}

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
            { qt: 2*modulos_5, title: "Ferro Esticar Lateral 15m", codigo: ''},
            { qt: 4*modulos_5, title: "Parafuso Esticar Lateral", codigo: ''}

        );

        if(modulo_especial)
        {
            components.push(
                { qt: 2, title: "Cortineiro 15m -"+modulo_especial, codigo: ''},
                { qt: 6, title: "Tranca Fina 15m -"+modulo_especial, codigo: ''},
                { qt: 3, title: "Central 15m -"+modulo_especial, codigo: ''},
                { qt: 2, title: "Ferro Esticar Cobertura 15m -"+modulo_especial, codigo: ''},
                { qt: 2, title: "Ferro Esticar Lateral 15m -"+modulo_especial, codigo: ''},
                { qt: 4, title: "Parafuso Esticar Lateral", codigo: ''}

            );
        }
    }

    console.log(components);

    return components;
}

export function calcularCobertura(tenda)
{
    let resto = tenda.comprimento%5;
    let cobertura = [];
    if(tenda.cobertura_opaco > 0)
    {
        cobertura.push(
            { qt: tenda.cobertura_opaco, title: "Cobertura Opaco 2Aguas "+tenda.largura, codigo: ""}
        );
    }
    if(tenda.cobertura_transparente > 0)
    {
        cobertura.push(
            { qt: tenda.cobertura_transparente, title: "Cobertura Transparente 2Aguas "+tenda.largura, codigo: ""}
        );
    }
    if(tenda.cobertura_blackout > 0)
    {
        cobertura.push(
            { qt: tenda.cobertura_blackout, title: "Cobertura Blackout 2Aguas "+tenda.largura, codigo: ""}
        );
    }
    if(tenda.cobertura_especial != null)
    {
        cobertura.push(
            { qt: 1, title: "Cobertura "+tenda.cobertura_especial+" 2Aguas "+resto+ " - " +tenda.largura, codigo: ""}
        );
    }

    console.log(cobertura);
    return cobertura;
}

export function calcularLaterais(tenda)
{
    let laterais = [];
    let resto = tenda.comprimento%5;
    if(tenda.lateral_opaco > 0)
    {
        laterais.push(
            { qt: tenda.lateral_opaco, title: "Lateral 5m Opaco Pé "+ tenda.altura_do_pe+" 2Aguas "+tenda.largura, codigo: ""}
        );
    }
    if(tenda.lateral_transparente > 0)
    {
        laterais.push(
            { qt: tenda.lateral_transparente, title: "Lateral 5m Transparente Pé "+ tenda.altura_do_pe+" 2Aguas "+tenda.largura, codigo: ""}
        );
    }
    if(tenda.lateral_blackout > 0)
    {
        laterais.push(
            { qt: tenda.lateral_blackout, title: "Lateral 5m Blackout Pé "+ tenda.altura_do_pe+" 2Aguas "+tenda.largura, codigo: ""}
        );
    }
    if(tenda.lateral_especial_1 != null)
    {
        laterais.push(
            { qt: 1, title: "Lateral "+ resto + "m "+tenda.lateral_especial_1+" Pé "+ tenda.altura_do_pe+" 2Aguas "+tenda.largura, codigo: ""}
        );
    }

    if(tenda.lateral_especial_2 != null)
    {
        laterais.push(
            { qt: 1, title: "Lateral "+ resto + "m "+tenda.lateral_especial_1+" Pé "+ tenda.altura_do_pe+" 2Aguas "+tenda.largura, codigo: ""}
        );
    }

    if(tenda.lateral_opaco_diferente > 0)
    {
        if(tenda.largura == 7.5 || tenda.largura == 17.5)
            laterais.push({ qt: tenda.lateral_opaco_diferente, title: "Lateral 3.75m Opaco Pé "+ tenda.altura_do_pe+" 2Aguas", codigo: ""});
        else
            laterais.push({ qt: tenda.lateral_opaco_diferente, title: "Lateral 2.5m Opaco Pé "+ tenda.altura_do_pe+" 2Aguas", codigo: ""});
    }
    if(tenda.lateral_transparante_diferente > 0)
    {
        if(tenda.largura == 7.5 || tenda.largura == 17.5)
            laterais.push({ qt: tenda.lateral_transparante_diferente, title: "Lateral 3.75m Transparente Pé "+ tenda.altura_do_pe+" 2Aguas", codigo: ""});
        else
            laterais.push({ qt: tenda.lateral_transparante_diferente, title: "Lateral 2.5m Transparente Pé "+ tenda.altura_do_pe+" 2Aguas", codigo: ""});
    }
    if(tenda.lateral_blackout_diferente > 0)
    {
        if(tenda.largura == 7.5 || tenda.largura == 17.5)
        {
            laterais.push(
                { qt: tenda.lateral_blackout_diferente, title: "Lateral 3.75m Blackout Pé "+ tenda.altura_do_pe+" 2Aguas", codigo: ""},
                { qt: 2, title: "Ferro Esticar Lateral 3.75m", codigo: ""}
            );

        }
        else
        {
            laterais.push(
                { qt: tenda.lateral_blackout_diferente, title: "Lateral 2.5m Blackout Pé "+ tenda.altura_do_pe+" 2Aguas", codigo: ""},
                { qt: 2, title: "Ferro Esticar Lateral 2.5m", codigo: ""}
            );

        }
    }

    //console.log(laterais);
    return laterais;
}


export function calcularTriangulo(tenda)
{
    let triangulo = [];
    let quantidade = 2;

    triangulo.push(
        { qt: 1 , title: "Triangulo "+tenda.triangulo_1 + " 2Aguas "+tenda.largura, codigo: ""}, 
        { qt: 1 , title: "Triangulo "+tenda.triangulo_2 + " 2Aguas "+tenda.largura, codigo: ""},                        
    );
    if(tenda.largura == 5)
    {
        triangulo.push(
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas - 5", codigo: ""},
            { qt: 1 * quantidade, title: "Régua Aluminio Esticar Cobertura - 5", codigo: ""},
            { qt: 2 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Peça U para esticar lateral", codigo: ""},
            { qt: 2 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10 ", codigo: ""},   
            { qt: 2 * quantidade, title: "Peça L tranca cortineiro Topo"+tenda.largura, codigo: ""},
            { qt: 1 * quantidade, title: "Ferro Esticar Lateral 10m", codigo: ""}

        );
    }
    else if(tenda.largura == 7.5 || tenda.largura == 10)
    {
        triangulo.push(
            { qt: 2 * quantidade, title: "Tranca Cortineiro Topo 2Aguas"+tenda.largura, codigo: ""},
            { qt: 2 * quantidade, title: "Régua Aluminio Esticar Cobertura - "+(tenda.largura/2), codigo: ""},
            { qt: 3 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 3 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 3 * quantidade, title: "Peça U para esticar lateral", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10", codigo: ""},
            { qt: 1 * quantidade, title: "Entrega Normal 10", codigo: ""},
            { qt: 1 * quantidade, title: "Prumo Topo "+tenda.largura + " Altura do Pé "+ tenda.altura_do_pe, codigo: ""},
            { qt: 1 * quantidade, title: "Gulpilha R3.5", codigo: ""},
            { qt: 2 * quantidade, title: "Peça L tranca cortineiro Topo"+tenda.largura, codigo: ""},
            { qt: 2 * quantidade, title: (tenda.largura == 7.5) ? ("Ferro Esticar Lateral 3.75m") : "Ferro Esticar Lateral 10m", codigo: ""}
        );
    }
    else if(tenda.largura == 12.5)
    {
        triangulo.push(
            { qt: 2 * quantidade, title: "Tranca Cortineiro Topo 2Aguas"+tenda.largura, codigo: ""},
            { qt: 2 * quantidade, title: "Peça L tranca cortineiro Topo"+tenda.largura, codigo: ""},
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas 2.5", codigo: ""},
            { qt: 2 * quantidade, title: "Régua Aluminio Esticar Cobertura  - 5", codigo: ""},
            { qt: 1 * quantidade, title: "Régua Aluminio Esticar Cobertura - 2.5", codigo: ""},
            { qt: 4 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 4 * quantidade, title: "Peça U para esticar lateral", codigo: ""},
            { qt: 4 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10", codigo: ""},
            { qt: 1 * quantidade, title: "Gulpilha R3.5", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Normal 10", codigo: ""},
            { qt: 2 * quantidade, title: "Prumo Topo 10" + " Altura do Pé "+ tenda.altura_do_pe, codigo: ""},
            { qt: 2 * quantidade, title: "Ferro Esticar Lateral 10m", codigo: ""},
            { qt: 1 * quantidade, title: "Ferro Esticar Lateral 2.5m", codigo: ""}

        );
    }
    else if(tenda.largura == 15)
    {
        triangulo.push(
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Esquerdo 15", codigo: ""},
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Direito 15", codigo: ""},
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Central", codigo: ""},
            { qt: 3 * quantidade, title: "Régua Aluminio Esticar Cobertura - 5", codigo: ""},
            { qt: 4 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 4 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Normal 10", codigo: ""},
            { qt: 2 * quantidade, title: "Prumo Topo 15 " + " Altura do Pé "+ tenda.altura_do_pe, codigo: ""},
            { qt: 3 * quantidade, title: "Ferro Esticar Lateral 15m", codigo: ""},
            { qt: 6 * quantidade, title: "Parafuso Esticar Lateral", codigo: ""}

        );
    } 
    else if(tenda.largura == 17.5)
    {
        triangulo.push(
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Esquerdo 15", codigo: ""},
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Direito 15", codigo: ""},
            { qt: 2 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Central 3.75", codigo: ""},
            { qt: 2 * quantidade, title: "Régua Aluminio Esticar Cobertura - 5", codigo: ""},
            { qt: 2 * quantidade, title: "Régua Aluminio Esticar Cobertura - 3.75", codigo: ""},
            { qt: 5 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 5 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10", codigo: ""},
            { qt: 3 * quantidade, title: "Entrega Normal 10", codigo: ""},
            { qt: 3 * quantidade, title: "Prumo Topo 15" + " Altura do Pé "+ tenda.altura_do_pe, codigo: ""},
            { qt: 1 * quantidade, title: "Aumento Prumo Central 17.5", codigo: ""},
            { qt: 2 * quantidade, title: "Ferro Esticar Lateral 15m", codigo: ""},
            { qt: 2 * quantidade, title: "Ferro Esticar Lateral 3.75m", codigo: ""},
            { qt: 8 * quantidade, title: "Parafuso Esticar Lateral", codigo: ""}

        );
    }
    else if(tenda.largura == 20)
    {
        triangulo.push(
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Esquerdo 15", codigo: ""},
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Direito 15", codigo: ""},
            { qt: 2 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Central", codigo: ""},

            { qt: 4 * quantidade, title: "Régua Aluminio Esticar Cobertura - 5", codigo: ""},

            { qt: 5 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 5 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10", codigo: ""},
            { qt: 3 * quantidade, title: "Entrega Normal 10", codigo: ""},
            { qt: 2 * quantidade, title: "Prumo Topo 15"+ " Altura do Pé "+ tenda.altura_do_pe, codigo: ""},
            { qt: 1 * quantidade, title: "Prumo Topo Central 20", codigo: ""},
            { qt: 4 * quantidade, title: "Ferro Esticar Lateral 15m", codigo: ""},
            { qt: 8 * quantidade, title: "Parafuso Esticar Lateral", codigo: ""}

        );
    }
    else if(tenda.largura== 25)
    {
        console.log("Não existe");
    }

    if(tenda.fixacao == "Estacas" || tenda.fixacao == "Pesos")
    {
        
        
        if(tenda.largura > 5 && tenda.largura < 12.5)
        {
            //console.log("Sapat");
            triangulo.push(
                { qt: 1 * quantidade, title: "Sapata Chão "+tenda.largura, codigo: ""},
                { qt: 1 * quantidade, title: "Chaveta Sapata Pé 10", codigo: ""}
            );
            if(tenda.fixacao == "Estacas")
            {
                triangulo.push(
                    { qt: 2 * quantidade, title: "Estacas", codigo: ""}
                );
            }
            if(tenda.fixacao == "Pesos")
        {
            triangulo.push(
                { qt: 1 * quantidade, title: "Pesos", codigo: ""}
            );
        }
            
        }
        else if(tenda.largura == 12.5)
        {
            triangulo.push(
                { qt: 2 * quantidade, title: "Sapata Chão "+tenda.largura, codigo: ""},
                { qt: 2 * quantidade, title: "Chaveta Sapata Pé 10", codigo: ""}
            );

            if(tenda.fixacao == "Estacas")
            {
                triangulo.push(
                    { qt: 4 * quantidade, title: "Estacas", codigo: ""}
                );
            }
            if(tenda.fixacao == "Pesos")
        {
            triangulo.push(
                { qt: 2 * quantidade, title: "Pesos", codigo: ""}
            );
        }
        }
        else if(tenda.largura == 15)
        {
            triangulo.push(
                { qt: 2 * quantidade, title: "Sapata Chão "+tenda.largura, codigo: ""},
                { qt: 2 * quantidade, title: "Chaveta Sapata Pé 15", codigo: ""}

            );
            if(tenda.fixacao == "Estacas")
            {
                triangulo.push(
                    { qt: 4 * quantidade, title: "Estacas", codigo: ""}
                );
            }
            if(tenda.fixacao == "Pesos")
            {
                triangulo.push(
                    { qt: 2 * quantidade, title: "Pesos", codigo: ""}
                );
            }
        }
        else if(tenda.largura > 15 && tenda.largura <= 20)
        {
            triangulo.push(
                { qt: 3 * quantidade, title: "Sapata Chão "+tenda.largura, codigo: ""},
                { qt: 3 * quantidade, title: "Chaveta Sapata Pé 15", codigo: ""},
            );
            if(tenda.fixacao == "Estacas")
            {
                triangulo.push(
                    { qt: 6 * quantidade, title: "Estacas", codigo: ""}
                );
            }
            if(tenda.fixacao == "Pesos")
            {
                triangulo.push(
                    { qt: 3 * quantidade, title: "Pesos", codigo: ""}
                );
            }
        }
    }
    if(tenda.fixacao == "Estrado" )
    {
        if(tenda.largura > 5 && tenda.largura <= 12.5)
        {
            triangulo.push(
                { qt: 1 * quantidade, title: "Sapata Estrado Topo", codigo: ""},
                { qt: 1 * quantidade, title: "Chaveta Sapata Pé", codigo: ""},
                { qt: 1 * quantidade, title: "Chaveta Meia-lua", codigo: ""},
            );
        }
        else if(tenda.largura == 15)
        {
            triangulo.push(
                { qt: 2 * quantidade, title: "Sapata Estrado Topo", codigo: ""},
                { qt: 2 * quantidade, title: "Chaveta Sapata Pé", codigo: ""},
                { qt: 2 * quantidade, title: "Chaveta Meia-lua", codigo: ""},
            );
        }
        else if(tenda.largura > 15 && tenda.largura <= 20)
        {
            triangulo.push(
                { qt: 3 * quantidade, title: "Sapata Estrado Topo", codigo: ""},
                { qt: 3 * quantidade, title: "Chaveta Sapata Pé 15", codigo: ""},
                { qt: 3 * quantidade, title: "Chaveta Meia-lua", codigo: ""},
            );
        }
    }

    console.log(triangulo);
    return UpdateRepeatedValues(triangulo);
}