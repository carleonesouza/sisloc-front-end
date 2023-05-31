import { Produto } from "./produto";

export class ListProduct {
    produtos: Array<Produto>;
    quantidade: number;
    total: number;
 
    public constructor(init?: Partial<ListProduct>) {
        Object.assign(this, init);
    }

    *[Symbol.iterator]() {
        this.produtos;
    }

 
}