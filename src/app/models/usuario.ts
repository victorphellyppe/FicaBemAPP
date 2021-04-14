
/**
 * Modelo do usuário
 * @author Carlos W. Gama
 */
export class Usuario {

    constructor(public nome?: string, public email?: string, public id?: number,
                public telefone?: string, public senha?: string, public data_nascimento?: string) {}
}
