
/**
 * Classe que controla o acesso ao Modal do persoangem 
 * @author Carlos W. Gama
 */
export class Personagem {
    
    constructor(public mensagem: string, public avatar: Avatar = Avatar.AUTENTICACAO) { }
}

/**
 * Possíveis personagens
 * @author Gaibe
 */
export enum Avatar {
    AUTENTICACAO = 'autenticacao.png',
    COMUNIDADE = 'comunidade.png',
    QUEM_SOMOS = 'quem-somos.png',
    ENCONTRE_AJUDA = 'encontre-ajuda.png',
    EM_PERIGO = 'perigo.png',
    VIOLENTOMETRO = 'violentometro.png'
}
