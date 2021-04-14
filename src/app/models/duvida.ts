import { Usuario } from './usuario';

/** Como pode ser composta uma duvida */
export class Duvida {

    constructor(public id?: number, public anonimo: boolean = false, 
                public autor: Usuario = new Usuario(), public titulo?: string, 
                public descricao?: string, public comentarios: Comentario[] = [],
                public data:string = '') {}
}

/** Comentário na duvida da pessoa */
export class Comentario {

    constructor(public id?: number,
                public autor?: Usuario, 
                public comentario?: string, public data: string = '') {}
}
