import { Nacionalidade } from './nacionalidade';
import { Estado } from './estado';
import { Escolaridade } from './escolaridade';
import { SituacaoConjugal } from './situacaoConjugal';

export class Usuario {
    id?: number;
    foto: string = "";
    nmUsuario?: string;
    email?: string;
    nacionalidade = new Nacionalidade();
    estado = new Estado();
    escolaridade = new Escolaridade();
    situacaoConjugal = new SituacaoConjugal();
    frequentaEscola?: string;
    nmMae?: string;
    nmPai?: string;
}