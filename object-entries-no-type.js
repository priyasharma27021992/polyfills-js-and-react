Object.myEntries = function (obj) {
    if (obj === null || obj === undefined)
        throw new TypeError("Cannot convert undefines or null to object");
    var res = [];
    for (var key in obj) {
        if (Object.hasOwn(obj, key)) {
            res.push([key, obj[key]]);
        }
    }
    return res;
};
var obj = {
    'key1': "Priya",
    "key2": "Riddhi"
};
for (var _i = 0, _a = Object.myEntries(obj); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], value = _b[1];
    console.log("".concat(key, ":").concat(value));
}
