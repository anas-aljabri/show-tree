import * as data from './data.json';
import { Node } from './node';
import './styles/styles.scss';


showTree('treeContainer');

function showTree(treeContainerId: string) {
    //  Create the tree in the dom here

    let treeContainer = document.getElementById('treeContainer');

    let nodes = data.default as Node[];

    function showNodes(node: Node, container: HTMLElement) {
        //  Create the node div
        let nodeDiv = document.createElement("div");
        nodeDiv.classList.add("node");
        container.appendChild(nodeDiv);

        //  Create the node head div
        let headDiv = document.createElement("div");
        headDiv.classList.add("head");
        headDiv.classList.add("chevron");
        headDiv.classList.add("clickable");
        //  Add the show/hide action on Click
        headDiv.addEventListener("click", (event: Event) => {
            event.srcElement.parentElement.querySelector(".body")
                .classList.toggle("open");

            event.srcElement.classList.toggle("chevron-down");
        });
        headDiv.innerText = node.Name;
        nodeDiv.appendChild(headDiv);

        //  Create the node body div
        let bodyDiv = document.createElement("div");
        bodyDiv.classList.add("body");
        nodeDiv.appendChild(bodyDiv);

        if (node.Children) {
            for (let child of node.Children) {
                showNodes(child, bodyDiv);
            }
        }
    }

    for (let node of nodes) {
        showNodes(node, treeContainer);

        // let headElem = nodes[i].querySelector(".head");
        // headElem.addEventListener("click",
        //     function () {
        //         showHide(this.parentElement.querySelector(".body"));
        //     })
    }

}


// function showHide(element) {
// if (element.style.display === "none") {
//     element.style.display = "block";
// } else {
//     element.style.display = "none";
// }
// }