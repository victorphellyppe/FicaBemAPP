/**
 * Modelo dos contatos de apoiio do usuário
 * @author Carlos W. Gama
 */
export class Contato {
    public constructor(public id: number = null, public nome?: string, public telefone?: string, 
        public ativo: boolean = true) {}
}
