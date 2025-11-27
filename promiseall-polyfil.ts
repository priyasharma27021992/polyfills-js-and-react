const promiseall = <T>(promises: Array<Promise<T>>) => {
    return new Promise((resolve, reject) => {
        const len = promises.length;
        if(len === 0){
            resolve([]);
        }
        let remaining = len; //as substraction is better
        const result = new Array(len); // as fixed size arrays are better

        promises.forEach((promise, index) => {
            promise.then(data => {
                result[index] = data;
                remaining--;

                if(remaining === 0){
                    resolve(result);
                }
            }).catch(error => reject(error));
        });
    })
}

//race is promise which returns with whichever promise settles first, does not matter if it fulfilled or rejected
const promiseRace = <T>(promises: Array<Promise<T>>) => {
    return new Promise((resolve, reject) => {
        const len = promises.length;
        if(len === 0)
            resolve([]);

        promises.forEach((promise) => {
            promise.then(data => {
                resolve(data);
            }).catch(error => reject(error));
        })
    })
}
