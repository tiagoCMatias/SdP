//@ts-check

class Tenda{
    
    /**
     * @param {number}  largura  
     * @param {number}  comprimento        
     */
    constructor(largura, comprimento){
        if(this.constructor == Tenda){
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.largura = largura;
        this.comprimento = comprimento;
    }

    /**
     * @param {string}  fixacao  
     */
    calcularEstrutura(fixacao){
        this.fixacao = fixacao;
        throw new Error("Not Implemented");
    }

    calcularLaterais(){
        throw new Error("Not Implemented");
    }

    calcularCobertura(tipo_de_cobertura){
        this.tipo_de_cobertura = tipo_de_cobertura;
        throw new Error("Not Implemented");
    }

    obterComponentes(){
        throw new Error("Not Implemented");
    }
}


class Conica extends Tenda{

    calcularEstrutura() {
        this.calcularVigas();
        this.calcularDiagonais();
    }

    calcularLaterais(tipo_de_lateral){
        this.tipo_de_lateral = tipo_de_lateral;
        this.lateral = [];
        this.tipo_de_lateral.forEach(lateral => {
            this.lateral = [ ...this.lateral, {qt: lateral.quantidade, title: "Conica Lateral " + lateral.nome + " * " + this.largura, codigo: ""}]
        });

        return this.lateral;
    }

    calcularCobertura(){
        return { qt: 1, title: "Cobertura Conica - "+this.tipo_de_cobertura+'*'+this.largura, codigo: 'x'};
    }

    calcularPe() {
        console.log("Pe");
    }

    calcularCone() {
        console.log("Cone");
    }

    calcularFerragens(){
        console.log("Ferragens");
    }

    calcularFEL(){
        console.log("FEL");
    }

    calcularVigas(){
        console.log("Vigas");
    }

    calcularDiagonais(){
        console.log("Diagonais");
    }
}


let conica = new Conica(10, 10);

console.log(conica.largura, conica.comprimento);

let laterais = [
    {quantidade: 10, nome: "Transparente"},
    {quantidade: 10, nome: "Opaco"},
    {quantidade: 2, nome: "Blackout"}
]

let CompLaterais = conica.calcularLaterais(laterais)

CompLaterais.forEach(element => {
    console.log(element.title);
});

