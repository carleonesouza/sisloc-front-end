import { Item } from "./item";

export class Modalidade {
    _id?: string;
    nome: string;
    descricao: string;
    preco: number;
    itens: Array<Item>
    status?: boolean;

    public constructor(init?: Partial<Modalidade>) {
        Object.assign(this, init);
    }
}
