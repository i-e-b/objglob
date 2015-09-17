"use strict";
var global, exports;

var Minimatch = require("minimatch").Minimatch

function isEnumerable(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function') && (type != 'string');
}

function anyMatch(path, matchArray) {
    if (!matchArray) return false;
    return matchArray.some(function(m){return m.match(path);});
    /*return matchArray.some(function(m){
        var r = m.match(path);
        console.log(m.pattern +" = "+path +" -> "+r);
        return r;
    });*/
}

// for each path, 
// if it matches a not-patten, skip it
// if it is not enumerable (array or object)
//   - if it matches a pattern, include it
//   - else skip
// on leaving an enumerable, if it is empty and not an array, remove it
function filterREC(keeps, rejects, input) {
    var descend = function descendREC(o, p) {
        if (!isEnumerable(o)) {
            if (anyMatch(p,keeps)) {
                return o;
            } else {
                return undefined;
            }
        }
        var result = Array.isArray(o) ? ([]) : ({});
        var added = false;
        Object.keys(o).forEach(function(k){
            var npath = (p)?(p+"/"+k):(k);

            if (!anyMatch(npath, rejects)) {
                var children = descendREC(o[k], npath);
                if (children !== undefined) {
                    added = true;
                    result[k] = children;
                }
            }
        });


        return (added) ? (result) : (undefined);
    }

    return descend(input);
}

(function (provides) {

    provides.filter = function filter(patterns, input){
        var keeps = [];
        var rejects = [];
        patterns.forEach(function (p) {
            if (p.length < 1) return;
            if (p[0] === '!') {rejects.push(new Minimatch(p.substr(1)));}
            else {keeps.push(new Minimatch(p));}
        });
        return filterREC(keeps, rejects, input);
    };

/* istanbul ignore next */ // `this` branch doesn't get followed
})(global || exports || this);
