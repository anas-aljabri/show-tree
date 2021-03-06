﻿# show-tree

show-tree is an easy to use javascript library to show multi-level data structure. It comes with an interactive search facility. 

### Installing

Simple!

```
$ npm install --save show-tree
```
### Demo

https://anas-aljabri.github.io/show-tree

### Get Started!

Your data structure needs to have Id, name, and children..

``` JavaScript
let data = [{
            "Id": "Your Id here..",
            "Name": "Your title/text here..",
            "Children": [{
                "Id": "Your Id here..",
                "Name": "Your title/text here.."
            },
            {
                "Id": "Your Id here..",
                "Name": "Your title/text here.."
            }]
}]
```

You can show the tree by calling

``` JavaScript
showTree.start("your-container-div-id", data);

//  For customised options
let options = {
        "searchDebounceTime": 0, //  value in milliseconds
        "searchPlaceHolder": "search..",
        "showSearch": true
    }
showTree.start("your-container-div-id", data);
```
### License

MIT
