import { Address } from './address';
import { Perfil } from './perfil';

export class Usuario {

    _id?: string;
    nome: string;
    email: string;
    password: string;
    status: boolean;

    public constructor(init?: Partial<Usuario>) {
        Object.assign(this, init);
    }
};
