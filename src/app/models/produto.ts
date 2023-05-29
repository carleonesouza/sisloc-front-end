import { Modalidade } from "./modalidade";

export class Produto {

    _id?: string;
    nome: string;
    descricao: string;
    modalidades: Array<Modalidade>;
    classificacao: string;
    modelo: string;
    imagem: string;
    status: boolean;

    public constructor(init?: Partial<Produto>) {
        Object.assign(this, init);
    }
};
