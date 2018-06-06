export function calcularAguas(estrutura)
{
    let modulo_especial = estrutura.comprimento%5;
    let modulos_5 = Math.floor(estrutura.comprimento/5);


    let components = [];

    let quantidade = Math.floor((estrutura.comprimento/5)+1);
    if(modulo_especial)
        quantidade++;

        console.log("quant: "+quantidade);
    components = components.concat(calcularAsnas(estrutura, quantidade));
    components = components.concat(calcularFerroCabeca(estrutura));
    components = components.concat(cabosAco(estrutura));
    components = components.concat(ferragens(estrutura, quantidade));
    components = components.concat(modulosAguas(estrutura));
    
    //console.log("Comp");
    //console.log(UpdateRepeatedValues(components));


    return UpdateRepeatedValues(components);
}

function calcularAsnas(estrutura, quantidade)
{
    let components = [];

    if(estrutura.fixacao == "Estacas")
    {
        components.push(
            { qt: 2 * quantidade, title: "Sapata Chão "+estrutura.largura, codigo:""},
            { qt: 4 * quantidade, title: "Estacas", codigo:""},
        );
    }
    else if(estrutura.fixacao == "Pesos")
    {
        components.push(
            { qt: 2 * quantidade, title: "Sapata Chão "+estrutura.largura, codigo:""},
            { qt: 1 * quantidade, title: "Pesos", codigo:""},
        );
    }
    else if(estrutura.fixacao == "Estrado")
    {
        components.push(
            { qt: 2 * quantidade, title: "Sapata Estrado 2aguas*"+estrutura.largura, codigo:""},
            { qt: 2 * quantidade, title: "Gulpilha R3.5", codigo:""},
            { qt: 2 * quantidade, title: "Chaveta Meia-lua", codigo:""},
        );
    }
    components.push(
        { qt: 2 * quantidade, title: "Pé 2aguas*"+estrutura.largura+" - "+estrutura.alturaDoPe, codigo:""},
        { qt: 2 * quantidade, title: "Roquete Esticar", codigo:""},
        { qt: 2 * quantidade, title: "Fita Esticar", codigo:""},
        { qt: (2 * quantidade)-4, title: "Entrega Normal 10", codigo:""},
        { qt: 4, title: "Entrega Canto 10", codigo:""}
    );

    let resto = estrutura.largura%5;

    if(resto)
    {
        components.push(
            { qt: 2 *quantidade, title: "Viga "+ (estrutura.largura-resto), codigo: "" },
            { qt: 2 *quantidade, title: "Viga Aumento "+resto, codigo: "" },
            { qt: 4 *quantidade, title: "Chaveta da Cabeça 2aguas*"+estrutura.largura, codigo: "" }
        );
    }
    else{
        components.push(
            { qt: 2 * quantidade, title: "Viga "+ (estrutura.largura), codigo: "" }
        );
    }
    
    if(estrutura.largura <= 12.5)
    {
        components.push(
            { qt: 1 * quantidade, title: "Cabeça 10", codigo: "" }
        );
    }
    else if(estrutura.largura > 12.5)
    {
        components.push(
            { qt: 1 * quantidade, title: "Cabeça 15", codigo: "" }
        );
    }

    return components;
}

function calcularFerroCabeca(estrutura)
{
    let ferroCabeca = [];

    let asnas = estrutura.comprimento/5;
    let modulos_5 = Math.floor(estrutura.comprimento/5);
    let modulo_especial = estrutura.comprimento%5;

    if(estrutura.largura == 12.5 || estrutura.largura == 15)
    {
        if(modulo_especial)
        {
            ferroCabeca.push(
                { qt: (1 * modulos_5)+2, title: "Ferro da Cabeça 2aguas*"+estrutura.largura, codigo: "" },
                { qt: (modulos_5+1)*2, title: "Gulpilha R3.5", codigo:"" },
                { qt: 2*((1 * modulos_5)+2), title: "Chaveta Ferro da Cabeça", codigo:"" }

            );
        }
        else
        {
            ferroCabeca.push(
                { qt: (1 * modulos_5)+1, title: "Ferro da Cabeça 2aguas*"+estrutura.largura, codigo: "" },
                { qt: (modulos_5+1)*2, title: "Gulpilha R3.5", codigo:"" },
                { qt: 2*((1 * modulos_5)+1), title: "Chaveta Ferro da Cabeça", codigo:"" }


            );
        }
    }
    if(estrutura.largura > 15)
    {
        if(modulo_especial)
        {
            ferroCabeca.push(
                { qt: (1 * modulos_5), title: "Ferro da Cabeça 2aguas*"+estrutura.largura, codigo: "" },
                { qt: 2*(1 * modulos_5)-1, title: "Gulpilha R3.5", codigo:"" },
                { qt: 2*((1 * modulos_5)+2), title: "Chaveta Ferro da Cabeça", codigo:"" }
            );
        }
        else
        {
            ferroCabeca.push(
                { qt: (1 * modulos_5)-1, title: "Ferro da Cabeça 2aguas*"+estrutura.largura, codigo: "" },
                { qt: 2*(1 * modulos_5)-2, title: "Gulpilha R3.5", codigo:"" },
                { qt: 2*((1 * modulos_5)-1), title: "Chaveta Ferro da Cabeça", codigo:"" }


            );
        }
    }

    return ferroCabeca;
}

function cabosAco(estrutura)
{
    let cabosAco = [];
    let modulos_5 = Math.floor(estrutura.comprimento/5);
    let quantidade = Math.floor(modulos_5/5)+1;
    if(estrutura.largura <=15)
    {
        cabosAco.push(
            { qt: 2 * quantidade, title: "Cabo Aço Tecto 2aguas*"+estrutura.largura, codigo:"" },
            { qt: 2 * quantidade, title: "Cabo Aço Pé " +estrutura.alturaDoPe +"m 2aguas*"+estrutura.largura, codigo: ""}
        );
    }
    if(estrutura.largura == 17.5)
    {
        cabosAco.push(
            { qt: 2 * quantidade, title: "Cabo Aço Tecto 20", codigo: ""},
            { qt: 2 * quantidade, title: "Cabo Aço Tecto 17.5", codigo: ""},

            { qt: 2 * quantidade, title: "Cabo Aço Pé " +estrutura.alturaDoPe +"m 2aguas*"+estrutura.largura, codigo: ""}
        );
    }
    if(estrutura.largura == 20)
    {
        cabosAco.push(
            { qt: 4 * quantidade, title: "Cabo Aço Tecto 20", codigo: ""},
            { qt: 2 * quantidade, title: "Cabo Aço Pé " +estrutura.alturaDoPe +"m 2aguas*"+estrutura.largura, codigo: ""}
        );
    }
    return cabosAco;
}

function ferragens(estrutura, quantidade)
{
    let ferragens = [];

    ferragens.push(
        { qt: 2 * quantidade, title: "Chaveta Sapata Pé 15", codigo:"" },
        { qt: 2 * quantidade, title: "Gulpilha R3.5", codigo:"" },
        { qt: 4 * quantidade, title: "Chaveta Pé Asna 2aguas*"+estrutura.largura, codigo:"" },
        { qt: 4 * quantidade, title: "Chaveta da Cabeça 2aguas*"+estrutura.largura, codigo:"" },
    );
    
    if(estrutura.largura <= 12.5)
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


function modulosAguas(estrutura)
{
    let components = [];
    let modulos_5 = Math.floor(estrutura.comprimento/5);
    let modulo_especial = estrutura.comprimento%5;

    if(estrutura.largura <= 12.5)
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

    if(estrutura.largura == 10 || estrutura.largura == 12.5)
    {
        components.push(
            { qt: 2*modulos_5, title: "Tranca Fina 10m", codigo: ''},
            { qt: 2*modulos_5, title: "Ferro Esticar Lateral 10m", codigo: ''}
        );
    }

    if(estrutura.largura >= 15 && estrutura.largura < 20)
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

    if(estrutura.largura == 20)
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

export function calcularCobertura(estrutura, cobertura)
{
    let resto = estrutura.comprimento%5;
    let componentesCobertura = [];
    if(cobertura.opaco > 0)
    {
        componentesCobertura.push(
            { qt: cobertura.opaco, title: "Cobertura Opaco 2Aguas "+ estrutura.largura, codigo: ""}
        );
    }
    if(cobertura.transparente > 0)
    {
        componentesCobertura.push(
            { qt: cobertura.transparente, title: "Cobertura Transparente 2Aguas "+estrutura.largura, codigo: ""}
        );
    }
    if(cobertura.blackout > 0)
    {
        componentesCobertura.push(
            { qt: cobertura.blackout, title: "Cobertura Blackout 2Aguas "+estrutura.largura, codigo: ""}
        );
    }
    if(cobertura.especial != null)
    {
        componentesCobertura.push(
            { qt: 1, title: "Cobertura "+cobertura.especial+" 2Aguas "+resto+ " - " +estrutura.largura, codigo: ""}
        );
    }

    console.log(componentesCobertura);
    return componentesCobertura;
}

export function calcularLaterais(estrutura, lateral)
{
    let componentesLaterais = [];
    let resto = estrutura.comprimento%5;
    if(lateral.opaco > 0)
    {
        componentesLaterais.push(
            { qt: lateral.opaco, title: "Lateral 5m Opaco Pé "+ estrutura.alturaDoPe+" 2Aguas "+estrutura.largura, codigo: ""}
        );
    }
    if(lateral.transparente > 0)
    {
        componentesLaterais.push(
            { qt: lateral.transparente, title: "Lateral 5m Transparente Pé "+ estrutura.alturaDoPe+" 2Aguas "+estrutura.largura, codigo: ""}
        );
    }
    if(lateral.blackout > 0)
    {
        componentesLaterais.push(
            { qt: lateral.blackout, title: "Lateral 5m Blackout Pé "+ estrutura.alturaDoPe+" 2Aguas "+estrutura.largura, codigo: ""}
        );
    }
    if(lateral.especial1 != null)
    {
        componentesLaterais.push(
            { qt: 1, title: "Lateral "+ resto + "m "+lateral.especial1+" Pé "+ estrutura.alturaDoPe+" 2Aguas "+estrutura.largura, codigo: ""}
        );
    }

    if(lateral.especial2 != null)
    {
        componentesLaterais.push(
            { qt: 1, title: "Lateral "+ resto + "m "+lateral.especial2+" Pé "+ estrutura.alturaDoPe+" 2Aguas "+estrutura.largura, codigo: ""}
        );
    }

    if(lateral.especialOpaco > 0)
    {
        if(estrutura.largura == 7.5 || estrutura.largura == 17.5)
            componentesLaterais.push({ qt: lateral.especialOpaco, title: "Lateral 3.75m Opaco Pé "+ estrutura.alturaDoPe+" 2Aguas", codigo: ""});
        else
            componentesLaterais.push({ qt: lateral.especialOpaco, title: "Lateral 2.5m Opaco Pé "+ estrutura.alturaDoPe+" 2Aguas", codigo: ""});
    }
    if(lateral.especialTransparente > 0)
    {
        if(estrutura.largura == 7.5 || estrutura.largura == 17.5)
            componentesLaterais.push({ qt: lateral.especialTransparente, title: "Lateral 3.75m Transparente Pé "+ estrutura.alturaDoPe+" 2Aguas", codigo: ""});
        else
            componentesLaterais.push({ qt: lateral.especialTransparente, title: "Lateral 2.5m Transparente Pé "+ estrutura.alturaDoPe+" 2Aguas", codigo: ""});
    }
    if(lateral.especialBlackout > 0)
    {
        if(estrutura.largura == 7.5 || estrutura.largura == 17.5)
        {
            componentesLaterais.push(
                { qt: lateral.especialBlackout, title: "Lateral 3.75m Blackout Pé "+ estrutura.alturaDoPe+" 2Aguas", codigo: ""},
                { qt: 2, title: "Ferro Esticar Lateral 3.75m", codigo: ""}
            );

        }
        else
        {
            componentesLaterais.push(
                { qt: lateral.especialBlackout, title: "Lateral 2.5m Blackout Pé "+ estrutura.alturaDoPe+" 2Aguas", codigo: ""},
                { qt: 2, title: "Ferro Esticar Lateral 2.5m", codigo: ""}
            );

        }
    }

    //console.log(componentesLaterais);
    return componentesLaterais;
}


export function calcularTriangulo(estrutura, triangulo)
{
    let componentesTriangulo = [];
    let quantidade = 2;

    componentesTriangulo.push(
        { qt: 1 , title: "Triangulo "+triangulo.one + " 2Aguas "+estrutura.largura, codigo: ""}, 
        { qt: 1 , title: "Triangulo "+triangulo.two + " 2Aguas "+estrutura.largura, codigo: ""},                        
    );
    if(estrutura.largura == 5)
    {
        componentesTriangulo.push(
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas - 5", codigo: ""},
            { qt: 1 * quantidade, title: "Régua Aluminio Esticar Cobertura - 5", codigo: ""},
            { qt: 2 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Peça U para esticar lateral", codigo: ""},
            { qt: 2 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10 ", codigo: ""},   
            { qt: 2 * quantidade, title: "Peça L tranca cortineiro Topo"+estrutura.largura, codigo: ""},
            { qt: 1 * quantidade, title: "Ferro Esticar Lateral 10m", codigo: ""}

        );
    }
    else if(estrutura.largura == 7.5 || estrutura.largura == 10)
    {
        componentesTriangulo.push(
            { qt: 2 * quantidade, title: "Tranca Cortineiro Topo 2Aguas"+estrutura.largura, codigo: ""},
            { qt: 2 * quantidade, title: "Régua Aluminio Esticar Cobertura - "+(estrutura.largura/2), codigo: ""},
            { qt: 3 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 3 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 3 * quantidade, title: "Peça U para esticar lateral", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10", codigo: ""},
            { qt: 1 * quantidade, title: "Entrega Normal 10", codigo: ""},
            { qt: 1 * quantidade, title: "Prumo Topo "+estrutura.largura + " Altura do Pé "+ estrutura.alturaDoPe, codigo: ""},
            { qt: 1 * quantidade, title: "Gulpilha R3.5", codigo: ""},
            { qt: 2 * quantidade, title: "Peça L tranca cortineiro Topo"+estrutura.largura, codigo: ""},
            { qt: 2 * quantidade, title: (estrutura.largura == 7.5) ? ("Ferro Esticar Lateral 3.75m") : "Ferro Esticar Lateral 10m", codigo: ""}
        );
    }
    else if(estrutura.largura == 12.5)
    {
        componentesTriangulo.push(
            { qt: 2 * quantidade, title: "Tranca Cortineiro Topo 2Aguas"+estrutura.largura, codigo: ""},
            { qt: 2 * quantidade, title: "Peça L tranca cortineiro Topo"+estrutura.largura, codigo: ""},
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas 2.5", codigo: ""},
            { qt: 2 * quantidade, title: "Régua Aluminio Esticar Cobertura  - 5", codigo: ""},
            { qt: 1 * quantidade, title: "Régua Aluminio Esticar Cobertura - 2.5", codigo: ""},
            { qt: 4 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 4 * quantidade, title: "Peça U para esticar lateral", codigo: ""},
            { qt: 4 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10", codigo: ""},
            { qt: 1 * quantidade, title: "Gulpilha R3.5", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Normal 10", codigo: ""},
            { qt: 2 * quantidade, title: "Prumo Topo 10" + " Altura do Pé "+ estrutura.alturaDoPe, codigo: ""},
            { qt: 2 * quantidade, title: "Ferro Esticar Lateral 10m", codigo: ""},
            { qt: 1 * quantidade, title: "Ferro Esticar Lateral 2.5m", codigo: ""}

        );
    }
    else if(estrutura.largura == 15)
    {
        componentesTriangulo.push(
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Esquerdo 15", codigo: ""},
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Direito 15", codigo: ""},
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Central", codigo: ""},
            { qt: 3 * quantidade, title: "Régua Aluminio Esticar Cobertura - 5", codigo: ""},
            { qt: 4 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 4 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Normal 10", codigo: ""},
            { qt: 2 * quantidade, title: "Prumo Topo 15 " + " Altura do Pé "+ estrutura.alturaDoPe, codigo: ""},
            { qt: 3 * quantidade, title: "Ferro Esticar Lateral 15m", codigo: ""},
            { qt: 6 * quantidade, title: "Parafuso Esticar Lateral", codigo: ""}

        );
    } 
    else if(estrutura.largura == 17.5)
    {
        componentesTriangulo.push(
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Esquerdo 15", codigo: ""},
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Direito 15", codigo: ""},
            { qt: 2 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Central 3.75", codigo: ""},
            { qt: 2 * quantidade, title: "Régua Aluminio Esticar Cobertura - 5", codigo: ""},
            { qt: 2 * quantidade, title: "Régua Aluminio Esticar Cobertura - 3.75", codigo: ""},
            { qt: 5 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 5 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10", codigo: ""},
            { qt: 3 * quantidade, title: "Entrega Normal 10", codigo: ""},
            { qt: 3 * quantidade, title: "Prumo Topo 15" + " Altura do Pé "+ estrutura.alturaDoPe, codigo: ""},
            { qt: 1 * quantidade, title: "Aumento Prumo Central 17.5", codigo: ""},
            { qt: 2 * quantidade, title: "Ferro Esticar Lateral 15m", codigo: ""},
            { qt: 2 * quantidade, title: "Ferro Esticar Lateral 3.75m", codigo: ""},
            { qt: 8 * quantidade, title: "Parafuso Esticar Lateral", codigo: ""}

        );
    }
    else if(estrutura.largura == 20)
    {
        componentesTriangulo.push(
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Esquerdo 15", codigo: ""},
            { qt: 1 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Direito 15", codigo: ""},
            { qt: 2 * quantidade, title: "Tranca Cortineiro Topo 2Aguas Central", codigo: ""},

            { qt: 4 * quantidade, title: "Régua Aluminio Esticar Cobertura - 5", codigo: ""},

            { qt: 5 * quantidade, title: "Roquete Esticar", codigo: ""},
            { qt: 5 * quantidade, title: "Fita Esticar", codigo: ""},
            { qt: 2 * quantidade, title: "Entrega Canto 10", codigo: ""},
            { qt: 3 * quantidade, title: "Entrega Normal 10", codigo: ""},
            { qt: 2 * quantidade, title: "Prumo Topo 15"+ " Altura do Pé "+ estrutura.alturaDoPe, codigo: ""},
            { qt: 1 * quantidade, title: "Prumo Topo Central 20", codigo: ""},
            { qt: 4 * quantidade, title: "Ferro Esticar Lateral 15m", codigo: ""},
            { qt: 8 * quantidade, title: "Parafuso Esticar Lateral", codigo: ""}

        );
    }
    else if(estrutura.largura== 25)
    {
        console.log("Não existe");
    }

    if(estrutura.fixacao == "Estacas" || estrutura.fixacao == "Pesos")
    {
        if(estrutura.largura > 5 && estrutura.largura < 12.5)
        {
            //console.log("Sapat");
            componentesTriangulo.push(
                { qt: 1 * quantidade, title: "Sapata Chão "+estrutura.largura, codigo: ""},
                { qt: 1 * quantidade, title: "Chaveta Sapata Pé 10", codigo: ""}
            );
            if(estrutura.fixacao == "Estacas")
            {
                componentesTriangulo.push(
                    { qt: 2 * quantidade, title: "Estacas", codigo: ""}
                );
            }
            if(estrutura.fixacao == "Pesos")
        {
            componentesTriangulo.push(
                { qt: 1 * quantidade, title: "Pesos", codigo: ""}
            );
        }
            
        }
        else if(estrutura.largura == 12.5)
        {
            componentesTriangulo.push(
                { qt: 2 * quantidade, title: "Sapata Chão "+estrutura.largura, codigo: ""},
                { qt: 2 * quantidade, title: "Chaveta Sapata Pé 10", codigo: ""}
            );

            if(estrutura.fixacao == "Estacas")
            {
                componentesTriangulo.push(
                    { qt: 4 * quantidade, title: "Estacas", codigo: ""}
                );
            }
            if(estrutura.fixacao == "Pesos")
        {
            componentesTriangulo.push(
                { qt: 2 * quantidade, title: "Pesos", codigo: ""}
            );
        }
        }
        else if(estrutura.largura == 15)
        {
            componentesTriangulo.push(
                { qt: 2 * quantidade, title: "Sapata Chão "+estrutura.largura, codigo: ""},
                { qt: 2 * quantidade, title: "Chaveta Sapata Pé 15", codigo: ""}

            );
            if(estrutura.fixacao == "Estacas")
            {
                componentesTriangulo.push(
                    { qt: 4 * quantidade, title: "Estacas", codigo: ""}
                );
            }
            if(estrutura.fixacao == "Pesos")
            {
                componentesTriangulo.push(
                    { qt: 2 * quantidade, title: "Pesos", codigo: ""}
                );
            }
        }
        else if(estrutura.largura > 15 && estrutura.largura <= 20)
        {
            componentesTriangulo.push(
                { qt: 3 * quantidade, title: "Sapata Chão "+estrutura.largura, codigo: ""},
                { qt: 3 * quantidade, title: "Chaveta Sapata Pé 15", codigo: ""},
            );
            if(estrutura.fixacao == "Estacas")
            {
                componentesTriangulo.push(
                    { qt: 6 * quantidade, title: "Estacas", codigo: ""}
                );
            }
            if(estrutura.fixacao == "Pesos")
            {
                triangulo.push(
                    { qt: 3 * quantidade, title: "Pesos", codigo: ""}
                );
            }
        }
    }
    if(estrutura.fixacao == "Estrado" )
    {
        if(estrutura.largura > 5 && estrutura.largura <= 12.5)
        {
            componentesTriangulo.push(
                { qt: 1 * quantidade, title: "Sapata Estrado Topo", codigo: ""},
                { qt: 1 * quantidade, title: "Chaveta Sapata Pé", codigo: ""},
                { qt: 1 * quantidade, title: "Chaveta Meia-lua", codigo: ""},
            );
        }
        else if(estrutura.largura == 15)
        {
            componentesTriangulo.push(
                { qt: 2 * quantidade, title: "Sapata Estrado Topo", codigo: ""},
                { qt: 2 * quantidade, title: "Chaveta Sapata Pé", codigo: ""},
                { qt: 2 * quantidade, title: "Chaveta Meia-lua", codigo: ""},
            );
        }
        else if(estrutura.largura > 15 && estrutura.largura <= 20)
        {
            componentesTriangulo.push(
                { qt: 3 * quantidade, title: "Sapata Estrado Topo", codigo: ""},
                { qt: 3 * quantidade, title: "Chaveta Sapata Pé 15", codigo: ""},
                { qt: 3 * quantidade, title: "Chaveta Meia-lua", codigo: ""},
            );
        }
    }

    console.log(componentesTriangulo);
    return UpdateRepeatedValues(componentesTriangulo);
}