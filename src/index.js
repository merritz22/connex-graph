/**
 * fichier de gestion des actions dans la page web
 */

let nodes = [
    { data: { id: '1', weight: 1} },
    { data: { id: '2', weight: 2} },
    { data: { id: '3', weight: 3} },
    { data: { id: '4', weight: 4} },
    { data: { id: '5', weight: 5} },
    { data: { id: '6', weight: 6} }
];
let edges = [
    { data: { source: '1', target: '4', directed: 'false'} },
    { data: { source: '2', target: '1', directed: 'false'} },
    { data: { source: '3', target: '5', directed: 'false'} }
];


g = new Graphe 
g.ajouterSommet(1)
g.ajouterSommet(2)
g.ajouterSommet(3)
g.ajouterSommet(4)
g.ajouterSommet(5)
g.ajouterSommet(6)
g.ajouterArc(1,'a',4)
g.ajouterArc(2,'b',1)
g.ajouterArc(3,'c',5)

function drawGraph(nodes,edges) {
    var cy = window.cy = cytoscape({
        container: document.getElementById('visual'),

        style: [
            {
                selector: 'node',
                style: {
                    'label': 'data(id)',
                    'text-valign': 'center',
                    'color': '#000000',
                    'background-color': '#3a7ecf'
                }
            },

            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'line-color': '#3a7ecf',
                    'opacity': 0.5
                }
            }
        ],

        elements: {
            nodes: nodes,
            edges: edges
        }
    });   
}


const addS = document.querySelector("#ajouterSommet");
const addArcD = document.querySelector("#arcDept");
// const addArcE = document.querySelector("#arcEtiq");
const addArcA = document.querySelector("#arcArr");
const delS = document.querySelector("#deleteSommet");

const btnAddS = document.querySelector(".ajouterSommet");
const btnAddArcD = document.querySelector(".arcDept");
const btnDelS = document.querySelector(".deleteSommet");
const btnConnex = document.querySelector(".showConnex");

const showSG = document.querySelector('.sousgraphe');

btnAddS.addEventListener("click",(e)=>{
    if (addS.value != "") {
        //on insere ce noeud dans le graphe de notre structure et dans celui de notre presentation
        let i = g.ajouterSommet(addS.valueAsNumber);
        if (i == 0) {
            nodes.push({ data: { id: ''+addS.valueAsNumber, weight: addS.valueAsNumber} });
        }else{
            alert('Attention :Le noeud '+ addS.valueAsNumber +' existe deja !!');
        }
        addS.value = null;
    } else {
        alert('Attention :L\'un des champs requis est vide !');
    }
    drawGraph(nodes,edges);
})

btnAddArcD.addEventListener("click",(e)=>{
    if ((addArcD.valueAsNumber != NaN) && (addArcA.valueAsNumber != NaN)) {
        let i = g.ajouterArc(addArcD.valueAsNumber,undefined,addArcA.valueAsNumber);
        if (i == -1 || i == -2) {
            alert('Attention :Le noeud '+addArcD.valueAsNumber +' ou '+addArcA.valueAsNumber+' est inexistant dans le graphe !');
        } else if (i == -3) {
            alert('Attention :L\'arc ('+addArcD.valueAsNumber+'->'+addArcA.valueAsNumber+') est deja dans le graphe !');
        } else {
            edges.push({ data: { source: ''+addArcD.valueAsNumber, target: ''+addArcA.valueAsNumber, directed: 'false'} });
        }
    } else {
        alert('Attention :L\'un des champs requis est vide');
    }
    addArcA.value = null;addArcD.value = null;
    drawGraph(nodes,edges);
})

btnConnex.addEventListener('click',(e)=>{
    let a = connexElements(g);
    let i = 1;
    let s = ''
    a.forEach(elt => {
        s += 'G<sub>'+i+'</sub>{';
        elt.forEach(element => {
            s += element+' ,';
        });
        s += '}<br>';
        i++;
    });
    showSG.innerHTML = s;
    drawGraph(nodes,edges);
})