import { Child } from "./child.model";

export interface Dossier {
    id:string;
    name:string;
    child?:Array<Child>;
}
