export interface Objet {
  id: string;
  name: string;
  type: string;
  data?: string;
  last_modification: number;
  creation: number;
  idParent: string;
}
