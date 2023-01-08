class EltAdj{
    public _noeud:any;
    public _etiquette:any;
    public _eltAdjacent?:EltAdj;

    /**
     *Contruire un noeud d'un graphe ainsi que sa liste d'adjence sous forme 
     *d'une liste chainee simple.
     * EltAdj(noeud:any,etiquette:any, eltadj:(undefined|EltAdj))
     */
    constructor() {
        this._noeud = undefined;
        this._etiquette = undefined;
        this._eltAdjacent = undefined;
    }

    
    public getNoeud() : any {
        return this._noeud
    }

    /**
     * setNoeud
     */
    public setNoeud(noeud) {
        this._noeud = noeud;
    }
    
    public getEtiquette() : any {
        return this._etiquette
    }

    /**
     * setEtiquette
     */
    public setEtiquette(etiquette:any) {
        this._etiquette = etiquette;
    }

    /**
     * getEltAdjacent
     */
    public getEltAdjacent() {
        return this._eltAdjacent;
    }

    /**
     * setEltAdjacent
     */
    public setEltAdjacent(elt:EltAdj) {
        this._eltAdjacent = elt;
    }

    /**
     * addEltAdjacent
     */
    public addEltAdjacent(node:any,etiquette:any) {
        if (this._eltAdjacent == undefined) {
            const elt = new EltAdj();
            elt.setNoeud(node);
            elt.setEtiquette(etiquette);
            this._eltAdjacent = elt;
        } else {
            this._eltAdjacent.addEltAdjacent(node,etiquette);
        }
    }

    
    /**
     * toString
     */
    public toString() : String {
        if (this == undefined) {
            return " -> null" ;
        } else {
            return "Noeud "+this._noeud+" -> "+ this._etiquette +" (" +this._eltAdjacent?.toString()+")";
        }
    }
}


class Sommet extends EltAdj {
    public _info?:any;
    public _SSuivant?:Sommet;

    
    /**
     *Permettra de creer a la fois un sommet mais aussi de referencer les
     noeuds adjacents a ce sommet la (Ceux qui sont directements connectees sur lui).
     On commence par construire un noeud, puis on l'encapsule dans un sommet et on 
     fait une liaison avec les autres sommets.
     */
    constructor() {
        super();
        this._info = undefined;
        this._SSuivant = undefined;
    }

    /**
     * initSommet
     */
    public initSommet(info:any,maxSommet:number){
        this._info = info;
        super.setNoeud(maxSommet);
    }

    
    public getInfo() {
        return this._info;
    }

    /**
     * sommetSuivant : retourne le prochain sommet dans le graphe
     */
    public sommetSuivant() {
        return this._SSuivant;
    }

    /**
     * getNodeValue
     */
    public getNodeValue() {
        return super.getNoeud();
    }
    
    /**
     * getEtiquetteValue
     */
    public getEtiquetteValue() {
        return super.getEtiquette;
    }
}


class Graphe {
    public nbreSommet: number;
    public nbreArc: number;
    public maxSommet:number;
    public premierSommet?: Sommet;
    public dernierSommet?: Sommet;

    /**
     * constructor
     */
    public constructor() {
        this.nbreSommet = 0;
        this.nbreArc = 0;
        this.maxSommet = 0;
        this.premierSommet = undefined;
        this.dernierSommet = undefined;
    }

    /**
     * ajouterSommet
     */
    public ajouterSommet(noeud:any) {
        if (searchSommet(this.premierSommet,noeud) == undefined) {
            const s = new Sommet();
            this.maxSommet++;
            s.initSommet(undefined,noeud);
            if (this.nbreSommet == 0) {
                this.premierSommet = this.dernierSommet = s;
            } else {
                if (this.dernierSommet != undefined) {
                    this.dernierSommet._SSuivant = s;
                    this.dernierSommet = s;   
                }
            }
            this.nbreSommet++;
            return 0;
        } else {
            return -1;
        }
    }

    /**
     * ajouterArc
     */
    public ajouterArc(noeudDepart:any,etiquette:any,noeudArrive:any) :number {
        var sommetDepart:Sommet = searchSommet(this.premierSommet,noeudDepart);
        var sommetArrive:Sommet = searchSommet(this.premierSommet,noeudArrive);
        if (sommetDepart == undefined) {
            return -1;
        } else if (sommetArrive == undefined) {
            return -2
        }else{
            if (!searchEltAdj(sommetDepart.getEltAdjacent(),noeudArrive)) {
                if (sommetDepart.getEltAdjacent() == undefined) {
                    const elt = new EltAdj();
                    elt.setNoeud(noeudArrive);
                    elt.setEtiquette(etiquette);
                    sommetDepart.setEltAdjacent(elt);
                } else {
                    sommetDepart.getEltAdjacent()?.addEltAdjacent(noeudArrive,etiquette);
                }
                this.nbreArc++;
                return 0;
            } else {
                return -3;
            }
        }
    }

    /**
     * deleteSommet
     */
    public deleteSommet(node:any):number {
        const s:Sommet = searchSommet(this.premierSommet,node);
        if (s == undefined) {
            return -1;
        } else {
            this.nbreArc -= adjacentLength(this.premierSommet?._eltAdjacent);
            if (this.premierSommet == s) {
                this.premierSommet = s._SSuivant;
            }
                const ps = this.premierSommet;
                while ((this.premierSommet != undefined)) {
                    if (this.premierSommet._SSuivant == s) {
                        this.premierSommet._SSuivant = s._SSuivant;
                    }
                    else{
                        if (this.premierSommet != undefined) {
                            if (this.premierSommet._eltAdjacent 
                                != undefined && this.premierSommet._eltAdjacent?._noeud == node) {
                                    this.nbreArc--;
                                    this.premierSommet._eltAdjacent = this.premierSommet?._eltAdjacent?._eltAdjacent;
                            }else{
                                const eltadj = this.premierSommet._eltAdjacent;
                                while (this.premierSommet._eltAdjacent != undefined) {
                                    if (this.premierSommet._eltAdjacent._eltAdjacent 
                                        != undefined && 
                                        this.premierSommet._eltAdjacent._eltAdjacent._noeud == node) {
                                        this.premierSommet._eltAdjacent = this.premierSommet._eltAdjacent._eltAdjacent._eltAdjacent;
                                        this.nbreArc--;
                                        break;
                                    } else {
                                        this.premierSommet._eltAdjacent = this.premierSommet?._eltAdjacent?._eltAdjacent;
                                    }
                                }
                                this.premierSommet._eltAdjacent = eltadj;
                            }
                        }
                        this.premierSommet= this.premierSommet._SSuivant
                    }
                }
                this.premierSommet = ps;
            
            this.maxSommet--;
            this.nbreSommet--;
            return 0;
        }
    }

}


/**
 * searchSommet
 */
function searchSommet(s?:Sommet,nodeValue?:any) {
    if (s != undefined && s.getNodeValue() == nodeValue){
        return s;
    }else if(s == undefined || s._SSuivant == undefined){
        return undefined;
    }else{
        return searchSommet(s._SSuivant,nodeValue);
    }
}

function searchEltAdj(eltadj?:EltAdj,node?:any) {
    if (eltadj == undefined) {
        return false;
    }else if (eltadj.getNoeud() == node) {
        return true;
    } else {
        return searchEltAdj(eltadj?.getEltAdjacent(),node);
    }
}

function deleteAdjacent(eltadj:EltAdj, node:any) {
    
        while (eltadj._eltAdjacent != undefined) {
            if (eltadj._eltAdjacent._noeud == node) {
                eltadj._eltAdjacent = eltadj._eltAdjacent._eltAdjacent?._eltAdjacent;
                break;
            }
            eltadj._eltAdjacent = eltadj._eltAdjacent?._eltAdjacent;
        }
}

function adjacentLength(sommet?:EltAdj):number {
    if (sommet == undefined) {
        return 0
    } else {
        return 1 + adjacentLength(sommet._eltAdjacent);
    }
}

function connexElements(graphe?:Graphe) {
    if (graphe == undefined) {
        return [];
    }else{
        var list = listeDesSommets([],graphe.premierSommet);
        let allAdj = [[list[0]]];
        list.forEach(node => {
            const sommet:Sommet = searchSommet(graphe.premierSommet,node);
            let tab = [node];
            allAdj.push(tab.concat(listeDAdjacences([],sommet._eltAdjacent)));
        });
        allAdj.shift();
        return subGraphNodes(allAdj,[]);
    }
}

function subGraphNodes(allList,result) {
    if (allList.length == 0) {
        return result;
    } else {
        let t = allList.shift();
        allList.forEach(elt => {
            if (commonElem(elt,t)) {
                t = t.concat(elt);
            }
        });
        t = deleteDouble([],t);
        result.push(t);
        allList = deleteListList(allList,t,[]);
        return subGraphNodes(allList,result);
    }
}

function commonElem(list,list2) {
    let i =false;
    list.forEach(elt => {
        if (list2.indexOf(elt) != -1) {
            i=true;
        }
    });
    return i;
}

function deleteListList(list,listSol,result) {
    list.forEach(elt => {
        if (!commonElem(elt,listSol)) {
            result.push(elt)
        }
    });
    return result;
}

function deleteDouble(result:[any],liste:[any]) {
    if (liste.length == 0) {
        return result;
    } else {
        let elt = liste.shift();
        if (result.indexOf(elt) == -1) {
            result.push(elt);
        }
        return deleteDouble(result,liste);
    }
}

function listeDesSommets(list:[any],sommet?:Sommet) {
    if (sommet == undefined) {
        return list;
    } else {
        list.push(sommet._noeud);
        return listeDesSommets(list,sommet._SSuivant);
    }
}

function listeDAdjacences(list:[any],elt?:EltAdj) {
    if (elt == undefined) {
        return list;
    } else {
        if (list.indexOf(elt._noeud) == -1) {
            list.push(elt._noeud);
        }
        return listeDAdjacences(list,elt._eltAdjacent);
    }
}

