export class Item {
    _id?: string;
    nome: string;
    descricao: string;
    status?: boolean;

    public constructor(init?: Partial<Item>) {
        Object.assign(this, init);
    }
}
