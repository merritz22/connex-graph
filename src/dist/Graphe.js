var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EltAdj = /** @class */ (function () {
    /**
     *Contruire un noeud d'un graphe ainsi que sa liste d'adjence sous forme
     *d'une liste chainee simple.
     * EltAdj(noeud:any,etiquette:any, eltadj:(undefined|EltAdj))
     */
    function EltAdj() {
        this._noeud = undefined;
        this._etiquette = undefined;
        this._eltAdjacent = undefined;
    }
    EltAdj.prototype.getNoeud = function () {
        return this._noeud;
    };
    /**
     * setNoeud
     */
    EltAdj.prototype.setNoeud = function (noeud) {
        this._noeud = noeud;
    };
    EltAdj.prototype.getEtiquette = function () {
        return this._etiquette;
    };
    /**
     * setEtiquette
     */
    EltAdj.prototype.setEtiquette = function (etiquette) {
        this._etiquette = etiquette;
    };
    /**
     * getEltAdjacent
     */
    EltAdj.prototype.getEltAdjacent = function () {
        return this._eltAdjacent;
    };
    /**
     * setEltAdjacent
     */
    EltAdj.prototype.setEltAdjacent = function (elt) {
        this._eltAdjacent = elt;
    };
    /**
     * addEltAdjacent
     */
    EltAdj.prototype.addEltAdjacent = function (node, etiquette) {
        if (this._eltAdjacent == undefined) {
            var elt = new EltAdj();
            elt.setNoeud(node);
            elt.setEtiquette(etiquette);
            this._eltAdjacent = elt;
        }
        else {
            this._eltAdjacent.addEltAdjacent(node, etiquette);
        }
    };
    /**
     * toString
     */
    EltAdj.prototype.toString = function () {
        var _a;
        if (this == undefined) {
            return " -> null";
        }
        else {
            return "Noeud " + this._noeud + " -> " + this._etiquette + " (" + ((_a = this._eltAdjacent) === null || _a === void 0 ? void 0 : _a.toString()) + ")";
        }
    };
    return EltAdj;
}());
var Sommet = /** @class */ (function (_super) {
    __extends(Sommet, _super);
    /**
     *Permettra de creer a la fois un sommet mais aussi de referencer les
     noeuds adjacents a ce sommet la (Ceux qui sont directements connectees sur lui).
     On commence par construire un noeud, puis on l'encapsule dans un sommet et on
     fait une liaison avec les autres sommets.
     */
    function Sommet() {
        var _this = _super.call(this) || this;
        _this._info = undefined;
        _this._SSuivant = undefined;
        return _this;
    }
    /**
     * initSommet
     */
    Sommet.prototype.initSommet = function (info, maxSommet) {
        this._info = info;
        _super.prototype.setNoeud.call(this, maxSommet);
    };
    Sommet.prototype.getInfo = function () {
        return this._info;
    };
    /**
     * sommetSuivant : retourne le prochain sommet dans le graphe
     */
    Sommet.prototype.sommetSuivant = function () {
        return this._SSuivant;
    };
    /**
     * getNodeValue
     */
    Sommet.prototype.getNodeValue = function () {
        return _super.prototype.getNoeud.call(this);
    };
    /**
     * getEtiquetteValue
     */
    Sommet.prototype.getEtiquetteValue = function () {
        return _super.prototype.getEtiquette;
    };
    return Sommet;
}(EltAdj));
var Graphe = /** @class */ (function () {
    /**
     * constructor
     */
    function Graphe() {
        this.nbreSommet = 0;
        this.nbreArc = 0;
        this.maxSommet = 0;
        this.premierSommet = undefined;
        this.dernierSommet = undefined;
    }
    /**
     * ajouterSommet
     */
    Graphe.prototype.ajouterSommet = function (noeud) {
        if (searchSommet(this.premierSommet, noeud) == undefined) {
            var s = new Sommet();
            this.maxSommet++;
            s.initSommet(undefined, noeud);
            if (this.nbreSommet == 0) {
                this.premierSommet = this.dernierSommet = s;
            }
            else {
                if (this.dernierSommet != undefined) {
                    this.dernierSommet._SSuivant = s;
                    this.dernierSommet = s;
                }
            }
            this.nbreSommet++;
            return 0;
        }
        else {
            return -1;
        }
    };
    /**
     * ajouterArc
     */
    Graphe.prototype.ajouterArc = function (noeudDepart, etiquette, noeudArrive) {
        var _a;
        var sommetDepart = searchSommet(this.premierSommet, noeudDepart);
        var sommetArrive = searchSommet(this.premierSommet, noeudArrive);
        if (sommetDepart == undefined) {
            return -1;
        }
        else if (sommetArrive == undefined) {
            return -2;
        }
        else {
            if (!searchEltAdj(sommetDepart.getEltAdjacent(), noeudArrive)) {
                if (sommetDepart.getEltAdjacent() == undefined) {
                    var elt = new EltAdj();
                    elt.setNoeud(noeudArrive);
                    elt.setEtiquette(etiquette);
                    sommetDepart.setEltAdjacent(elt);
                }
                else {
                    (_a = sommetDepart.getEltAdjacent()) === null || _a === void 0 ? void 0 : _a.addEltAdjacent(noeudArrive, etiquette);
                }
                this.nbreArc++;
                return 0;
            }
            else {
                return -3;
            }
        }
    };
    /**
     * deleteSommet
     */
    Graphe.prototype.deleteSommet = function (node) {
        var _a, _b, _c, _d, _e, _f;
        var s = searchSommet(this.premierSommet, node);
        if (s == undefined) {
            return -1;
        }
        else {
            this.nbreArc -= adjacentLength((_a = this.premierSommet) === null || _a === void 0 ? void 0 : _a._eltAdjacent);
            if (this.premierSommet == s) {
                this.premierSommet = s._SSuivant;
            }
            var ps = this.premierSommet;
            while ((this.premierSommet != undefined)) {
                if (this.premierSommet._SSuivant == s) {
                    this.premierSommet._SSuivant = s._SSuivant;
                }
                else {
                    if (this.premierSommet != undefined) {
                        if (this.premierSommet._eltAdjacent
                            != undefined && ((_b = this.premierSommet._eltAdjacent) === null || _b === void 0 ? void 0 : _b._noeud) == node) {
                            this.nbreArc--;
                            this.premierSommet._eltAdjacent = (_d = (_c = this.premierSommet) === null || _c === void 0 ? void 0 : _c._eltAdjacent) === null || _d === void 0 ? void 0 : _d._eltAdjacent;
                        }
                        else {
                            var eltadj = this.premierSommet._eltAdjacent;
                            while (this.premierSommet._eltAdjacent != undefined) {
                                if (this.premierSommet._eltAdjacent._eltAdjacent
                                    != undefined &&
                                    this.premierSommet._eltAdjacent._eltAdjacent._noeud == node) {
                                    this.premierSommet._eltAdjacent = this.premierSommet._eltAdjacent._eltAdjacent._eltAdjacent;
                                    this.nbreArc--;
                                    break;
                                }
                                else {
                                    this.premierSommet._eltAdjacent = (_f = (_e = this.premierSommet) === null || _e === void 0 ? void 0 : _e._eltAdjacent) === null || _f === void 0 ? void 0 : _f._eltAdjacent;
                                }
                            }
                            this.premierSommet._eltAdjacent = eltadj;
                        }
                    }
                    this.premierSommet = this.premierSommet._SSuivant;
                }
            }
            this.premierSommet = ps;
            this.maxSommet--;
            this.nbreSommet--;
            return 0;
        }
    };
    return Graphe;
}());
/**
 * searchSommet
 */
function searchSommet(s, nodeValue) {
    if (s != undefined && s.getNodeValue() == nodeValue) {
        return s;
    }
    else if (s == undefined || s._SSuivant == undefined) {
        return undefined;
    }
    else {
        return searchSommet(s._SSuivant, nodeValue);
    }
}
function searchEltAdj(eltadj, node) {
    if (eltadj == undefined) {
        return false;
    }
    else if (eltadj.getNoeud() == node) {
        return true;
    }
    else {
        return searchEltAdj(eltadj === null || eltadj === void 0 ? void 0 : eltadj.getEltAdjacent(), node);
    }
}
function deleteAdjacent(eltadj, node) {
    var _a, _b;
    while (eltadj._eltAdjacent != undefined) {
        if (eltadj._eltAdjacent._noeud == node) {
            eltadj._eltAdjacent = (_a = eltadj._eltAdjacent._eltAdjacent) === null || _a === void 0 ? void 0 : _a._eltAdjacent;
            break;
        }
        eltadj._eltAdjacent = (_b = eltadj._eltAdjacent) === null || _b === void 0 ? void 0 : _b._eltAdjacent;
    }
}
function adjacentLength(sommet) {
    if (sommet == undefined) {
        return 0;
    }
    else {
        return 1 + adjacentLength(sommet._eltAdjacent);
    }
}
function connexElements(graphe) {
    if (graphe == undefined) {
        return [];
    }
    else {
        var list = listeDesSommets([], graphe.premierSommet);
        var allAdj_1 = [[list[0]]];
        list.forEach(function (node) {
            var sommet = searchSommet(graphe.premierSommet, node);
            var tab = [node];
            allAdj_1.push(tab.concat(listeDAdjacences([], sommet._eltAdjacent)));
        });
        allAdj_1.shift();
        return subGraphNodes(allAdj_1, []);
    }
}
function subGraphNodes(allList, result) {
    if (allList.length == 0) {
        return result;
    }
    else {
        var t_1 = allList.shift();
        allList.forEach(function (elt) {
            if (commonElem(elt, t_1)) {
                t_1 = t_1.concat(elt);
            }
        });
        t_1 = deleteDouble([], t_1);
        result.push(t_1);
        allList = deleteListList(allList, t_1, []);
        return subGraphNodes(allList, result);
    }
}
function commonElem(list, list2) {
    var i = false;
    list.forEach(function (elt) {
        if (list2.indexOf(elt) != -1) {
            i = true;
        }
    });
    return i;
}
function deleteListList(list, listSol, result) {
    list.forEach(function (elt) {
        if (!commonElem(elt, listSol)) {
            result.push(elt);
        }
    });
    return result;
}
function deleteDouble(result, liste) {
    if (liste.length == 0) {
        return result;
    }
    else {
        var elt = liste.shift();
        if (result.indexOf(elt) == -1) {
            result.push(elt);
        }
        return deleteDouble(result, liste);
    }
}
function listeDesSommets(list, sommet) {
    if (sommet == undefined) {
        return list;
    }
    else {
        list.push(sommet._noeud);
        return listeDesSommets(list, sommet._SSuivant);
    }
}
function listeDAdjacences(list, elt) {
    if (elt == undefined) {
        return list;
    }
    else {
        if (list.indexOf(elt._noeud) == -1) {
            list.push(elt._noeud);
        }
        return listeDAdjacences(list, elt._eltAdjacent);
    }
}
