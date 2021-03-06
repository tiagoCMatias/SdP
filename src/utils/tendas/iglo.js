export function EstruturaIglo(tenda) {
  let comp = [];
  let new_comprimento = tenda.comprimento;
  if (tenda.tipo_topo_1 == "Redondo")
    new_comprimento -= (tenda.largura / 2);
  if (tenda.tipo_topo_2 == "Redondo")
    new_comprimento -= (tenda.largura / 2);

  let resto = new_comprimento % 5;
  let modulos_5 = Math.floor(new_comprimento / 5);

  let modulos = calcularModulosIglo(tenda);
  comp = comp.concat(modulos);
  let cabos = 0;

  if (modulos_5 % 2 == 0)
    cabos = calcularCabosAco(tenda, modulos_5 / 2);
  else
    cabos = calcularCabosAco(tenda, ((modulos_5 - 1) / 2));

  comp = comp.concat(cabos);
  let asnas = calcularAsnasIglo(tenda);

  if (tenda.tipo_topo_1 == "Redondo") {
    let quantidade = (tenda.largura / 5) + 1;
    let meia_asna = calcularMeiaAsna(tenda, quantidade);
    let meio_mod = calcularMeioModulo(tenda, quantidade);
    comp = comp.concat(meia_asna);
    comp = comp.concat(meio_mod);
  }
  if (tenda.tipo_topo_2 == "Redondo") {
    let quantidade = (tenda.largura / 5) + 1;
    let meia_asna = calcularMeiaAsna(tenda, quantidade);
    let meio_mod = calcularMeioModulo(tenda, quantidade);
    comp = comp.concat(meia_asna);
    comp = comp.concat(meio_mod);
  }

  //console.log(modulos);
  //console.log(cabos);
  //console.log(meia_asna);
  //console.log(meio_mod);

  comp = comp.concat(asnas);

  //console.log(comp);

  return UpdateRepeatedValues(comp);

  //return iglo;
}

export function CoberturaIglo(cobertura, estrutura) {
  let new_comprimento = estrutura.comprimento;
  if (estrutura.tipo_topo_1 == "Redondo")
    new_comprimento -= (estrutura.largura / 2);
  if (estrutura.tipo_topo_2 == "Redondo")
    new_comprimento -= (estrutura.largura / 2);

  let resto = new_comprimento % 5;
  console.log(resto);
  //let modulos_5 = Math.floor(estrutura.comprimento/5);
  let componentesCobertura = [];
  if (cobertura.opaco > 0) {
    componentesCobertura.push({
      qt: cobertura.opaco,
      title: "Cobertura Opaco Iglo*" + estrutura.largura,
      codigo: 'x'
    });
  }
  if (cobertura.transparente > 0) {
    componentesCobertura.push({
      qt: cobertura.transparente,
      title: "Cobertura Transparente Iglo*" + estrutura.largura,
      codigo: 'x'
    });
  }
  if (cobertura.blackout > 0) {
    componentesCobertura.push({
      qt: cobertura.blackout,
      title: "Cobertura Blackout Iglo*" + estrutura.largura,
      codigo: 'x'
    });
  }
  if (cobertura.especial != null) {
    componentesCobertura.push({
      qt: 1,
      title: "Cobertura " + cobertura.especial + " Iglo*" + resto,
      codigo: 'x'
    });
  }

  return componentesCobertura;
}

export function LateraisIglo(lateral, estrutura) {
  let new_comprimento = estrutura.comprimento;
  if (estrutura.tipo_topo_1 == "Redondo")
    new_comprimento -= (estrutura.largura / 2);
  if (estrutura.tipo_topo_2 == "Redondo")
    new_comprimento -= (estrutura.largura / 2);

  let resto = new_comprimento % 5;

  let componentesLaterais = [];
  if (lateral.opaco > 0) {
    console.log("push opaco");
    componentesLaterais.push({
      qt: lateral.opaco,
      title: "Lateral Opaco Iglo*" + estrutura.largura,
      codigo: 'x'
    });
  }
  if (lateral.transparente > 0) {
    console.log("transparente: " + lateral.transparente);
    componentesLaterais.push({
      qt: lateral.transparente,
      title: "Lateral Transparente Iglo*" + estrutura.largura,
      codigo: 'x'
    });
  }
  if (lateral.blackout > 0) {
    console.log("blackout");
    componentesLaterais.push({
      qt: lateral.blackout,
      title: "Lateral Blackout Iglo*" + estrutura.largura,
      codigo: 'x'
    });
  }
  if (lateral.especial1 != null) {
    componentesLaterais.push({
      qt: 1,
      title: "Lateral " + lateral.especial1 + " Iglo*" + resto,
      codigo: 'x'
    });
  }
  if (lateral.especial2 != null) {
    componentesLaterais.push({
      qt: 1,
      title: "Lateral " + lateral.especial2 + " Iglo*" + resto,
      codigo: 'x'
    });
  }

  if (estrutura.tipo_topo_1 == "Direito") {
    componentesLaterais.push({
      qt: 1,
      title: "Lateral de Angulo Direito " + lateral.topoDireito1 + " Iglo*" + estrutura.largura,
      codigo: 'x'
    }, {
      qt: 1,
      title: "Lateral de Angulo Esquerdo " + lateral.topoEsquerdo1 + " Iglo*" + estrutura.largura,
      codigo: 'x'
    });
  }
  if (estrutura.tipo_topo_2 == "Direito") {
    componentesLaterais.push({
      qt: 1,
      title: "Lateral de Angulo Direito " + lateral.topoDireito2 + " Iglo*" + estrutura.largura,
      codigo: 'x'
    }, {
      qt: 1,
      title: "Lateral de Angulo Esquerdo " + lateral.topoEsquerdo2 + " Iglo*" + estrutura.largura,
      codigo: 'x'
    });
  }
  if (lateral.topoRedondo1 != null) {
    componentesLaterais.push({
      qt: (estrutura.largura / 5) + 2,
      title: "Lateral Topo Redondo " + lateral.topoRedondo1 + " Iglo*" + estrutura.largura,
      codigo: 'x'
    }, {
      qt: (estrutura.largura / 5) + 2,
      title: "Ferro Esticar Topo Redondo Iglo*" + estrutura.largura,
      codigo: 'x'
    });
  }
  if (lateral.topoRedondo2 != null) {
    componentesLaterais.push({
      qt: (estrutura.largura / 5) + 2,
      title: "Lateral Topo Redondo " + lateral.topoRedondo2 + " Iglo*" + estrutura.largura,
      codigo: 'x'
    }, {
      qt: (estrutura.largura / 5) + 2,
      title: "Ferro Esticar Topo Redondo Iglo*" + estrutura.largura,
      codigo: 'x'
    });
  }

  //console.log(lateral);
  return componentesLaterais;
}

export function TrianguloIglo(bacalhau) {
  let triangulos = [];
  if (tenda.triangulo_opaco > 0) {
    triangulos.push({
      qt: tenda.triangulo_opaco,
      title: "Triangulo Opaco Iglo*" + tenda.largura,
      codigo: 'x'
    });
  }
  if (tenda.triangulo_transparente > 0) {
    triangulos.push({
      qt: tenda.triangulo_transparente,
      title: "Triangulo Transparente Iglo*" + tenda.largura,
      codigo: 'x'
    });
  }
  if (tenda.triangulo_blackout > 0) {
    triangulos.push({
      qt: tenda.triangulo_blackout,
      title: "Triangulo Blackout Iglo*" + tenda.largura,
      codigo: 'x'
    });
  }

  return triangulos;
}

export function UpdateRepeatedValues(componentes) {
  let repetidos;
  console.log(componentes.length);
  for (var i = 0; i < componentes.length; i++) {
    for (var j = 0; j < componentes.length; j++) {
      if (j != i && componentes[i].title == componentes[j].title) {
        componentes[i].qt += componentes[j].qt;
        console.log("Repetido: " + componentes[i].title);
        componentes.splice(j, 1);

      }
    }
  }
  return componentes;
}

export function calcularBola(tenda) {
  let componentes = [];

  let n_vezes = ((tenda.largura / 5) + 2) * 2;
  console.log(n_vezes);
  componentes = componentes.concat(calcularMeioModulo(tenda, n_vezes - 1));

  n_vezes = ((tenda.largura / 5) + 1) * 2;
  componentes = componentes.concat(calcularMeiaAsna(tenda, n_vezes));


  componentes = componentes.concat(calcularAsnasIglo(tenda))
  componentes = componentes.concat(calcularTopoRedondo(tenda));

  componentes = componentes.concat(LateraisIglo(tenda));

  return UpdateRepeatedValues(componentes);

}


function calcularTopoDireitoIglo(tenda, bacalhau) {

  let topo = [];
  let resto = tenda.comprimento % 5;
  let modulos_5 = Math.floor(tenda.comprimento / 5);

  let n_prumo = (tenda.largura / 5) - 1;

  let quantidade = 1;
  if (tenda.tipo_topo_1 == tenda.tipo_topo_2)
    quantidade = 2;
  else
    quantidade = 1;


  topo.push({
      qt: (2 + n_prumo) * quantidade,
      title: 'Roquete Esticar',
      codigo: ''
    }, {
      qt: 1 * quantidade,
      title: 'Tranca Corno Esquerda Topo Direito Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 1 * quantidade,
      title: 'Tranca Corno Direita Topo Direito Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: (tenda.largura / 5) * quantidade,
      title: 'Ferro Esticar Lateral 5m Iglo*' + tenda.largura,
      codigo: ''
    }

  );
  if (bacalhau.triangulo1 != null) {
    topo.push({
      qt: 1,
      title: 'Triangulo Topo Direito ' + bacalhau.triangulo1 + ' Iglo*' + tenda.largura,
      codigo: ''
    });
  }
  if (bacalhau.triangulo2 != null) {
    topo.push({
      qt: 1,
      title: 'Triangulo Topo Direito ' + bacalhau.triangulo2 + ' Iglo*' + tenda.largura,
      codigo: ''
    });
  }
  if (tenda.largura >= 15) {
    topo.push({
      qt: quantidade * ((tenda.largura / 5) - 2),
      title: 'Tranca Corno Central Topo Direito Iglo*' + tenda.largura,
      codigo: ''
    });
  }
  if (tenda.largura > 10) {
    topo.push({
      qt: (n_prumo + 2) * quantidade,
      title: 'Fita Esticar Gancho Duplo',
      codigo: ''
    });
  }
  if (n_prumo > 2) {
    topo.push({
      qt: n_prumo * quantidade,
      title: 'Prumo Topo Direito 15',
      codigo: ''
    }, {
      qt: n_prumo * quantidade,
      title: 'Gulpilha R3.5',
      codigo: ''
    }, {
      qt: 2 * quantidade,
      title: 'Aumento Prumo Topo Direito Lateral Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: (n_prumo - 2) * quantidade,
      title: 'Aumento Prumo Topo Direito Central Iglo*' + tenda.largura,
      codigo: ''
    }, );
  } else {
    topo.push({
      qt: n_prumo * quantidade,
      title: 'Prumo Topo Direito Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: n_prumo * quantidade,
      title: 'Gulpilha R3.5',
      codigo: ''
    });
  }

  if (tenda.largura == 10) {
    topo.push({
      qt: 2 * quantidade,
      title: 'Ferro Esticar Triangulo Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 2 * quantidade,
      title: 'Entrega Canto Regua Aluminio Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 1 * quantidade,
      title: 'Entrega Normal Regua Aluminio Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 1 * quantidade,
      title: 'Entrega Normal Regua Aluminio Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 3 * quantidade,
      title: 'Fita Esticar Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 1 * quantidade,
      title: 'União Prumo Viga Iglo*' + tenda.largura,
      codigo: ''
    });
  }

  if (tenda.fixacao == "Estacas" || tenda.fixacao == "Pesos") {
    topo.push({
      qt: quantidade * n_prumo,
      title: 'Sapata Chão Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: quantidade * n_prumo,
      title: 'Chaveta Sapata Pé Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: ((2 * n_prumo) + 2) * quantidade,
      title: 'Parafuso Esticar Lateral',
      codigo: ''
    }, {
      qt: (2 * n_prumo) * quantidade,
      title: (tenda.fixacao == "Estacas") ? "Estacas" : "Pesos",
      codigo: ''
    });
  } else if (tenda.fixacao == "Estrado") {
    topo.push({
      qt: quantidade * n_prumo,
      title: 'Sapata Estrado Topo Direito Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: quantidade * n_prumo,
      title: 'Chaveta Sapata Pé Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: ((2 * n_prumo) + 2) * quantidade,
      title: 'Parafuso Esticar Lateral',
      codigo: ''
    }, {
      qt: quantidade * n_prumo,
      title: 'Chaveta Meia-Lua ',
      codigo: ''
    });
  }

  //console.log("topoDireito");
  //console.log(topo);
  //console.log("quant: ");
  //console.log(quantidade);

  return UpdateRepeatedValues(topo);
}


function calcularMeiaAsna(tenda, quantidade) {
  let meia_asna = [];

  meia_asna.push({
    qt: 1 * quantidade,
    title: 'Pé Iglo*' + tenda.largura,
    codigo: ''
  }, {
    qt: 2 * quantidade,
    title: 'Viga Normal Iglo*' + tenda.largura,
    codigo: ''
  }, {
    qt: 1 * quantidade,
    title: 'Viga Redondo Iglo*' + tenda.largura + "(mais-curta)",
    codigo: ''
  }, {
    qt: 2 * quantidade,
    title: 'Chaveta Sapata Pé Iglo*' + tenda.largura,
    codigo: ''
  }, {
    qt: 2 * quantidade,
    title: 'Gulpilha R3.5',
    codigo: ''
  }, {
    qt: 3 * quantidade,
    title: 'Cabeça Iglo*' + tenda.largura,
    codigo: ''
  });

  if (tenda.largura == tenda.comprimento) {
    meia_asna.push({
      qt: (2 * quantidade) + 4,
      title: 'Parafuso Esticar Lateral',
      codigo: ''
    });
  } else {
    meia_asna.push({
      qt: (2 * quantidade) + 2,
      title: 'Parafuso Esticar Lateral',
      codigo: ''
    });
  }

  if (tenda.largura == 10) {
    meia_asna.push({
        qt: (2 * quantidade) + 2,
        title: 'Fita Esticar',
        codigo: ''
      }, {
        qt: (2 * quantidade) + 2,
        title: 'Roquete Esticar',
        codigo: ''
      }, {
        qt: (2 * quantidade) + 2,
        title: 'Entrega Normal Cobertura Iglo*' + tenda.largura,
        codigo: ''
      }

    );
  } else if (tenda.largura > 10) {
    if (tenda.largura == tenda.comprimento) {
      meia_asna.push({
          qt: (1 * quantidade),
          title: 'Fita Esticar Gancho Duplo',
          codigo: ''
        }, {
          qt: (1 * quantidade),
          title: 'Roquete Esticar',
          codigo: ''
        }

      );
    } else {
      meia_asna.push({
          qt: (1 * quantidade) + 2,
          title: 'Fita Esticar Gancho Duplo',
          codigo: ''
        }, {
          qt: (1 * quantidade) + 2,
          title: 'Roquete Esticar',
          codigo: ''
        }

      );
    }
  }
  if (tenda.fixacao == "Estacas" || tenda.fixacao == "Pesos") {
    meia_asna.push({
        qt: 1 * quantidade,
        title: 'Sapata Chão Iglo*' + tenda.largura,
        codigo: ''
      }, {
        qt: (tenda.fixacao == "Estacas") ? (2 * quantidade) : (1 * quantidade),
        title: (tenda.fixacao == "Estacas") ? "Estacas" : "Pesos",
        codigo: ''
      }

    );
  } else if (tenda.fixacao == "Estrado") {
    meia_asna.push({
      qt: 1 * quantidade,
      title: 'Sapata Estrado Topo Redondo Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 1 * quantidade,
      title: 'Chaveta Meia-Lua ',
      codigo: ''
    });
  }

  return meia_asna;
}

function calcularCabosAco(tenda, quantidade) {
  let cabosAco = [];

  cabosAco.push({
    qt: 6 * quantidade,
    title: 'Cabos de Aço Teto Iglo*' + tenda.largura,
    codigo: ''
  }, {
    qt: 2 * quantidade,
    title: 'Cabos de Aço Pé Iglo*' + tenda.largura,
    codigo: ''
  });
  //console.log("cabosAco");

  //console.log(cabosAco);

  return cabosAco;
}

function calcularAsnasIglo(tenda) {
  let new_comprimento = tenda.comprimento;
  if (tenda.tipo_topo_1 == "Redondo")
    new_comprimento -= (tenda.largura / 2);
  if (tenda.tipo_topo_2 == "Redondo")
    new_comprimento -= (tenda.largura / 2);

  let resto = new_comprimento % 5;
  let modulos_5 = Math.floor(new_comprimento / 5);

  let asnas = [];

  let n_asnas = 1;

  if (resto)
    n_asnas = 2;
  else
    n_asnas = 1;
  //console.log("Parafusos: " +(((modulos_5+n_asnas)*4)-4));
  asnas.push({
    qt: 2 * (modulos_5 + n_asnas),
    title: 'Pé Iglo*' + tenda.largura,
    codigo: ''
  }, {
    qt: 6 * (modulos_5 + n_asnas),
    title: 'Viga Normal Iglo*' + tenda.largura,
    codigo: ''
  }, {
    qt: 7 * (modulos_5 + n_asnas),
    title: 'Cabeça Iglo*' + tenda.largura,
    codigo: ''
  }, {
    qt: 2 * (modulos_5 + n_asnas),
    title: 'Roquete Esticar',
    codigo: ''
  }, {
    qt: 2 * (modulos_5 + n_asnas),
    title: 'Gulpilha R3.5',
    codigo: ''
  }, {
    qt: ((modulos_5 + n_asnas) * 4) - 4,
    title: 'Parafuso Esticar Lateral',
    codigo: ''
  });

  if (tenda.fixacao == "Estacas" || tenda.fixacao == "Pesos") {
    asnas.push({
        qt: 2 * (modulos_5 + n_asnas),
        title: 'Sapata Chão Iglo*' + tenda.largura,
        codigo: ''
      }, {
        qt: 2 * (modulos_5 + n_asnas),
        title: 'Chaveta Sapata Pé Iglo*' + tenda.largura,
        codigo: ''
      }, {
        qt: 4 * (modulos_5 + n_asnas),
        title: (tenda.fixacao == "Estacas") ? "Estacas" : "Pesos",
        codigo: ''
      }

    );
  } else if (tenda.fixacao == "Estrado") {
    asnas.push({
      qt: 2 * (modulos_5 + n_asnas),
      title: 'Sapata Estrado Normal Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 2 * (modulos_5 + n_asnas),
      title: 'Chaveta Sapata Pé Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 2 * (modulos_5 + n_asnas),
      title: 'Chaveta Meia-Lua ',
      codigo: ''
    });
  }

  if (tenda.largura > 10) {
    asnas.push({
      qt: 42 * (modulos_5 + n_asnas),
      title: 'Parafusos M16 Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 2 * (modulos_5 + n_asnas),
      title: 'Fita Esticar Gancho Duplo',
      codigo: ''
    });
  } else if (tenda.largura == 10) {

    asnas.push({
      qt: 28 * (modulos_5 + n_asnas),
      title: 'Parafusos M12 Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 2 * (modulos_5 + n_asnas),
      title: 'Fita Esticar Iglo*' + tenda.largura,
      codigo: ''
    });

    if (modulos_5 == 1) {
      asnas.push({
        qt: 4,
        title: 'Entrega Canto Regua Cobertura Iglo*' + tenda.largura,
        codigo: ''
      });
    } else if (modulos_5 > 1) {
      if (resto) {
        asnas.push({
          qt: 4,
          title: 'Entrega Canto Regua Cobertura Iglo*' + tenda.largura,
          codigo: ''
        }, {
          qt: 2 * (modulos_5),
          title: 'Entrega Normal Cobertura Iglo*' + tenda.largura,
          codigo: ''
        });
      } else {
        asnas.push({
          qt: 4,
          title: 'Entrega Canto Regua Cobertura Iglo*' + tenda.largura,
          codigo: ''
        }, {
          qt: 2 * (modulos_5 - 1),
          title: 'Entrega Normal Cobertura Iglo*' + tenda.largura,
          codigo: ''
        });
      }

    }
  }
  //console.log("asnas");

  //console.log(asnas);

  return asnas;
}



function calcularMeioModulo(tenda, quantidade) {
  let meio_modulo = [];


  if (tenda.tipo_topo_1 == "Redondo" || tenda.tipo_topo_2 == "Redondo") {
    quantidade = quantidade + 1;
    meio_modulo.push({
      qt: 1 * quantidade,
      title: 'Tranca Grossa Numero 1 Topo Redondo Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 1 * quantidade,
      title: 'Tranca Grossa Numero 2 Topo Redondo Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 1 * quantidade,
      title: 'Tranca Cortineiro Topo Redondo Iglo*' + tenda.largura,
      codigo: ''
    });
    if (tenda.largura >= 25) {
      meio_modulo.push({
        qt: 1 * quantidade,
        title: 'Tranca Grossa Numero 3 Topo Redondo Iglo*' + tenda.largura,
        codigo: ''
      });
    }
    if (tenda.largura > 15) {
      meio_modulo.push({
        qt: 1 * quantidade,
        title: 'Tranca Fina Numero 1 Topo Redondo Iglo*' + tenda.largura,
        codigo: ''
      }, {
        qt: 1 * quantidade,
        title: 'Tranca Fina Numero 2 Topo Redondo Iglo*' + tenda.largura,
        codigo: ''
      }, {
        qt: 1 * quantidade,
        title: 'Tranca Fina Numero 3 Topo Redondo Iglo*' + tenda.largura,
        codigo: ''
      });
    }
  }

  //console.log("Meio_Modulo");
  //console.log(meio_modulo);

  return meio_modulo;
}

export function calcularTopoIglo(tenda, bacalhau) {
  let topo_1 = [];
  let topo_2 = [];

  let topo_direito = [];

  let topo_redondo = [];

  if (tenda.tipo_topo_1 != tenda.tipo_topo_2) {
    topo_direito = calcularTopoDireitoIglo(tenda, bacalhau);
    topo_redondo = calcularTopoRedondo(tenda, bacalhau);
  } else if (tenda.tipo_topo_1 == "Direito" || tenda.tipo_topo_2 == "Direito") {
    topo_direito = calcularTopoDireitoIglo(tenda, bacalhau);
  } else {
    topo_redondo = calcularTopoRedondo(tenda, bacalhau);
    topo_redondo = topo_redondo.concat(calcularTopoRedondo(tenda, bacalhau));
  }

  /*
    if(estrutura.tipo_topo_1 == "Direito" || estrutura.tipo_topo_1 == "direito")
        topo_1 = calcularTopoDireitoIglo(estrutura);
    else
        topo_1 = calcularTopoRedondo(estrutura);

    if(estrutura.tipo_topo_2 == "Direito" || estrutura.tipo_topo_2 == "direito")
        topo_2 = calcularTopoDireitoIglo(estrutura);
    else
        topo_2 = calcularTopoRedondo(estrutura);
*/
  let comp = [];

  if (topo_direito.length > 0)
    comp = comp.concat(topo_direito);
  if (topo_redondo.length > 0)
    comp = comp.concat(topo_redondo);

  console.log("Comp");
  console.log(comp);

  return UpdateRepeatedValues(comp);
}

function calcularTopoRedondo(tenda, bacalhau) {
  let topo = [];
  let quantidade = (tenda.largura / 5) + 2;

  //console.log("Calcular Topo Redondo");

  if (tenda.comprimento == tenda.largura) {
    topo.push({
      qt: 2,
      title: 'Coroa Topo Redondo Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 1,
      title: 'Chapeu Chines ',
      codigo: ''
    }, );
  } else {
    topo.push({
      qt: 1,
      title: 'Coroa Topo Redondo Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 1,
      title: 'Chapeu Chines ',
      codigo: ''
    }, );
  }
  if (bacalhau.opaco > 0) {
    console.log("bacalhau.opaco");
    topo.push({
      qt: bacalhau.opaco,
      title: 'Bacalhau Opaco Iglo*' + tenda.largura,
      codigo: ''
    }, );
  }
  if (bacalhau.transparente > 0) {
    topo.push({
      qt: bacalhau.transparente,
      title: 'Bacalhau Transparente Iglo*' + tenda.largura,
      codigo: ''
    }, );
  }
  if (bacalhau.blackout > 0) {
    topo.push({
      qt: bacalhau.blackout,
      title: 'Bacalhau Blackout Iglo*' + tenda.largura,
      codigo: ''
    }, );
  }


  //console.log("Topo");
  //console.log(topo);

  return topo;
}


function calcularFerroEsticarCobertura(tenda) {
  let ferro_esticar_cobertura = [];

  let resto = tenda.comprimento % 5;
  let modulos_5 = Math.floor(tenda.comprimento / 5);

  if (tenda.largura == 10) {
    if (resto == 3.75) {
      ferro_esticar_cobertura.push({
        qt: 2,
        title: 'Ferro Esticar Cobertura 3.75m Iglo*' + tenda.largura,
        codigo: ''
      });
    }
    if (resto == 2.5) {
      ferro_esticar_cobertura.push({
        qt: 2,
        title: 'Ferro Esticar Cobertura 2.5m Iglo*' + tenda.largura,
        codigo: ''
      });
    }
    if (resto == 1.25) {
      ferro_esticar_cobertura.push({
        qt: 2,
        title: 'Ferro Esticar Cobertura 1.25m Iglo*' + tenda.largura,
        codigo: ''
      });
    }

    if (modulos_5 > 0) {
      ferro_esticar_cobertura.push({
        qt: 2 * modulos_5,
        title: 'Ferro Esticar Cobertura 5m Iglo*' + tenda.largura,
        codigo: ''
      });
    }
  }
  //console.log("ferro_esticar_cobertura");

  //console.log(ferro_esticar_cobertura);
  return ferro_esticar_cobertura;
}


function calcularModulosIglo(tenda) {
  let new_comprimento = tenda.comprimento;
  if (tenda.tipo_topo_1 == "Redondo")
    new_comprimento -= (tenda.largura / 2);
  if (tenda.tipo_topo_2 == "Redondo")
    new_comprimento -= (tenda.largura / 2);

  let resto = new_comprimento % 5;
  let modulos_5 = Math.floor(new_comprimento / 5);

  let modulos = [];

  console.log(modulos_5 + "-" + tenda.largura);

  if (modulos_5 > 1) {
    modulos.push({
      qt: 2 * modulos_5,
      title: 'Tranca Cortineiro 5m Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 5 * modulos_5,
      title: 'Tranca Grossa 5m Iglo*' + tenda.largura,
      codigo: ''
    }, {
      qt: 2 * modulos_5,
      title: 'Ferro Esticar Lateral 5m Iglo*' + tenda.largura,
      codigo: ''
    });
    if (tenda.largura >= 20) {
      modulos.push({
        qt: 6 * modulos_5,
        title: 'Tranca Fina 5m Iglo*' + tenda.largura,
        codigo: ''
      });
      if (resto) {
        modulos.push({
          qt: 6 * modulos_5,
          title: 'Tranca Fina ' + resto + 'm Iglo*' + tenda.largura,
          codigo: ''
        });
      }
    }
    /*if(estrutura.largura == 10)
    {
        modulos.push(
            { qt: 6 * modulos_5, title: 'Tranca Fina 5m Iglo*'+estrutura.largura, codigo:''}
        );
    }*/
    if (resto) {
      modulos.push({
        qt: 2,
        title: 'Tranca Cortineiro ' + resto + 'm Iglo*' + tenda.largura,
        codigo: ''
      }, {
        qt: 5,
        title: 'Tranca Grossa ' + resto + 'm Iglo*' + tenda.largura,
        codigo: ''
      }, {
        qt: 2,
        title: 'Tranca Esticar Lateral ' + resto + 'm Iglo*' + tenda.largura,
        codigo: ''
      }, );
    }
    calcularFerroEsticarCobertura(tenda);
  }
  //console.log("Modulos");
  //console.log(modulos);

  return modulos;
}
