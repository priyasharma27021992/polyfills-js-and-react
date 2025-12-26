Array.prototype.flatArr = () => {
    const arr = this;

    const flat = (arr) => {
        for(let i=0; i<arr.length; i++){
            if(Array.isArray(arr[i)]){

            }
        }
    }
}

[1, [2,3],4].flatArr()
