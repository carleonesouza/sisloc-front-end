import { Produto } from "./produto";
import { Usuario } from "./usuario";

export class Locacao {
    _id?: string;
    inicio_loca: Date;
    fim_loca: Date;
    hora_inicio: Date;
    hora_fim: Date;
    total: number;
    usuario: Usuario;
    produtos: Array<Produto>
    status: boolean;

    public constructor(init?: Partial<Locacao>) {
        Object.assign(this, init);
    }
}
