import * as data from './data.json';
import { Node } from './node';
import './styles/styles.scss';
import { FilterTreeResult } from './filter-tree-result';

//  First call
showTree('rootContainer', data.default as Node[]);

function showTree(treeContainerId: string, tree: Node[]) {
    let rootContainer = document.getElementById('treeContainer');

    //  Add the input filed
    //#region 
    let searchInpt = document.createElement("INPUT") as HTMLInputElement;
    searchInpt.type = "text";
    searchInpt.addEventListener("input", debounce((event: Event) => {
        let keyword = (event.srcElement as HTMLInputElement).value;

        //  Get the tree container
        let currentTreeContainer = event.srcElement.parentElement.querySelector(
            ".tree-container");
        currentTreeContainer.innerHTML = "";

        //  Get new copy for the filtered tree from the original copy
        let newCopy = JSON.parse(JSON.stringify(tree));
        let filteredTree = filterTree(newCopy, keyword).Tree;
        showNodes(filteredTree, currentTreeContainer as HTMLElement);
    }));
    rootContainer.appendChild(searchInpt);
    //#endregion

    let treeContainer = document.createElement("DIV");
    treeContainer.classList.add("tree-container");
    rootContainer.appendChild(treeContainer);

    //  Create the tree in the dom here
    showNodes(tree, treeContainer);

    function showNodes(nodes: Node[], container: HTMLElement) {
        for (let node of nodes) {
            //  Create the node div
            let nodeDiv = document.createElement("div");
            nodeDiv.classList.add("node");
            container.appendChild(nodeDiv);

            //  Create the node head div
            let headDiv = document.createElement("div");
            headDiv.classList.add("head");
            headDiv.classList.add("chevron");
            //  Show chevron only if node has children
            if (node.Children) {
                headDiv.classList.add("clickable");
                //  Add the show/hide action on Click
                headDiv.addEventListener("click", (event: Event) => {
                    event.srcElement.parentElement.querySelector(".body")
                        .classList.toggle("open");

                    event.srcElement.classList.toggle("chevron-down");
                });
            }
            else {
                headDiv.classList.add("no-children")
            }
            headDiv.innerText = node.Name;
            nodeDiv.appendChild(headDiv);

            //  Create the node body div
            let bodyDiv = document.createElement("div");
            bodyDiv.classList.add("body");
            nodeDiv.appendChild(bodyDiv);
            //  If the node is open, search matches
            if (node.IsOpen) {
                bodyDiv.classList.add("open");
                bodyDiv.parentElement.querySelector(".head")
                .classList.add("chevron-down")
            }

            if (node.Children) {
                showNodes(node.Children, bodyDiv);
            }
        }
    }

}

function filterTree(tree: Node[], keyword: string): FilterTreeResult {
    let foundMatchesCount = 0;

    //  If the entry is empty string return the full tree without filtering and update the matches
    if (keyword.length == 0)
        return {
            "Tree": tree,
            "FoundMatchesCount": foundMatchesCount
        };

    //  Filtering here..
    tree = tree.filter(function filterCallback(node) {
        //  Check if the keyword is contained in the name of the root node
        //  If yes, return the entire node
        if (node.Name.toLocaleLowerCase().indexOf(keyword) > -1) {
            node.KeywordMatch = true;
            foundMatchesCount++;

            //  Check for other matches in children, to set the 'IsOpen' and 'KeywordMatch' properties
            if (node.Children) {
                let matchesLookup = (node: Node) => {
                    if (node.Children) {
                        for (let child of node.Children) {
                            if (child.Name.toLocaleLowerCase().indexOf(keyword) > -1) {
                                child.KeywordMatch = true;
                                foundMatchesCount++;
                                node.IsOpen = true;
                            }
                            matchesLookup(child);
                        }
                    }
                }

                matchesLookup(node)
            }

            return true;
        }
        //  If the keyword has no matches in the node title, check in chidlren
        else
            if (node.Children) {
                //  Recursive calls to the filter function to dig down all children, grand children ..etc
                if ((node.Children = node.Children.filter(filterCallback)).length) {
                    node.IsOpen = true;
                    return true;
                }
            }
            else {
                node.KeywordMatch = false;
            }
    });

    return {
        "Tree": tree,
        "FoundMatchesCount": foundMatchesCount
    }
}

function debounce(func: (...mainArgs: any[]) => any, wait: number = 200) {
    let timeout: number;
    return function(...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }