# objglob
Run glob-like patterns against JavaScript objects

A simple recursive wrapper around
https://github.com/isaacs/minimatch

## Use

Like this
```javascript
var filter = require('objglob').filter;
var result = filter(['pattern/**', 'globs'], inputObject);
```

The objective is to take something like this:

```javascript
{
    "name":"root",
    "_attr": {
        "id":"x"
    },

    "link": [
        {
            "type":"A",
            "child": {
                "name":"a-child",
                "class":"beta"
            }
        },
        {
            "type":"B",
            "child": {
                "_attr": {
                    "id":"y",
                    "name":"identifier"
                },
                "name":"b-child",
                "class":"beta"
            }
        }
    ]
}
```

and apply a script to it like this:

```
!**/_attr
**/name
```

then end up with

```javascript
{
    "name":"root",
    "link": [
        {
            "child": {
                "name":"a-child",
            }
        },
        {
            "child": {
                "name":"b-child",
            }
        }
    ]
}
```
