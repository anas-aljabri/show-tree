import { Node } from './node';
import { ShowTreeConfig } from './show-tree-config';
import './styles/styles.scss';
import { FilterTreeResult } from './filter-tree-result';


export function start(treeContainerId: string, tree: Node[], config: ShowTreeConfig =
    {
        "searchDebounceTime": 0,
        "searchPlaceHolder": "search..",
        "showSearch": true
    }) {
    //  Set the default values for config properties (if not provided)
    setDefaultConfigValues(config);

    let rootContainer = document.getElementById(treeContainerId);
    rootContainer.classList.add("show-tree-container");

    //  Add the search container
    //#region 
    if (config.showSearch) {
        let searchContainer = document.createElement("DIV") as HTMLDivElement;
        searchContainer.classList.add("search-container");

        //  The input element
        let searchInpt = document.createElement("INPUT") as HTMLInputElement;
        searchInpt.type = "text";
        searchInpt.placeholder = config.searchPlaceHolder;
        searchInpt.addEventListener("input", debounce((event: Event) => {
            let keyword = (event.srcElement as HTMLInputElement).value;

            //  Get the tree container
            let currentTreeContainer = event.srcElement.parentElement.parentElement.querySelector(
                ".tree-container");
            currentTreeContainer.innerHTML = "";

            //  Get new copy for the filtered tree from the original copy
            let newCopy = JSON.parse(JSON.stringify(tree));
            let filteredTreeResult = filterTree(newCopy, keyword);
            showNodes(filteredTreeResult.Tree, currentTreeContainer as HTMLElement);

            if (keyword) {
                foundMatchesTag.innerHTML = filteredTreeResult.FoundMatchesCount.toString()
                    + " match(es)";
                foundMatchesTag.style.display = "inline-block";
            }
            else {
                foundMatchesTag.innerHTML = "";
                foundMatchesTag.style.display = "none";
            }

        }, config.searchDebounceTime));
        searchContainer.appendChild(searchInpt);

        //  Add the founch-matches tag
        let foundMatchesTag = document.createElement("SPAN") as HTMLSpanElement;
        foundMatchesTag.innerHTML = "test";
        foundMatchesTag.classList.add("found-matches");

        searchContainer.appendChild(foundMatchesTag);
        rootContainer.appendChild(searchContainer);
    }
    //#endregion

    //  Creating the tree container
    //#region 
    let treeContainer = document.createElement("DIV");
    treeContainer.classList.add("tree-container");
    rootContainer.appendChild(treeContainer);
    //#endregion

    //  Create the tree
    //#region 
    showNodes(tree, treeContainer);

    //  Recursive function
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
            if (node.KeywordMatch) {
                headDiv.classList.add("keyword-match");
            }
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
    //#endregion
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
    return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

function setDefaultConfigValues(config: ShowTreeConfig) {
    if (!config.searchDebounceTime)
        config.searchDebounceTime = 200;
    if (!config.searchPlaceHolder)
        config.searchPlaceHolder = "search..";
    if (config.showSearch == null)
        config.showSearch = true;
}

