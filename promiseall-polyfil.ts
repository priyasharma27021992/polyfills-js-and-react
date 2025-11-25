const promiseall = <T>(promises: Array<Promise<T>>) => {
    return new Promise((resolve, reject) => {
        const len = promises.length;
        if(len === 0){
            return resolve([]);
        }
        let remaining = len; //as substraction is better
        const result = new Array(len); // as fixed size arrays are better

        promises.forEach((promise, index) => {
            promise.then(data => {
            console.log('result', result);
                result[index] = data;
                remaining--;

                if(remaining === 0){
                    resolve(result);
                }
            }).catch(error => reject(error));
        });
    })
}