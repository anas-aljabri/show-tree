# show-tree

show-tree is an easy to use javascript library to show multi-level data structure. It comes with an interactive search facility. 

### Installing

Simple!

```
$ npm install --save show-tree
```
### Demo

https://github.com/anas-aljabri/show-tree

### Get Started!

Your data structure needs to have Id, name, and children..

``` JSON
[{
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
showTree.start('your-container-div-id', data);
```

### License

MIT