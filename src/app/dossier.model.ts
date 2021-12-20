import { Child } from "./child.model";

export interface Dossier {
    id:string;
    name:string;
    last_modification:number;
    child?:Array<Child>;
}
