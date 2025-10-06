//extending ObjectConstructor interface
declare global {
    interface ObjectConstructor{
        myEntries<T extends Object>(obj:T): [keyof T, T[keyof T]][];
    }
}

Object.myEntries= <T extends Object>(obj: T): [keyof T, T[keyof T]][] => {
    if(obj === null || obj === undefined)
        throw new TypeError("Cannot convert undefines or null to object");

    const res: [keyof T, T[keyof T]][] = [];
    for(const key in obj){
        if(Object.hasOwn(obj, key)){
            res.push([key, obj[key]]);
        }
    }
    return res;
}

const obj = {
    'key1': "Priya",
    "key2": "Riddhi"
}

for(const [key,value] of Object.myEntries(obj)){
    console.log(`${key}:${value}`)
}

class Parent {
    x= 1;
}
class Child extends Parent {
    y=1;
}
const obj2 = new Child();

console.log(Object.myEntries(obj2))
