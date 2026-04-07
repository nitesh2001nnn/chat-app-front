export function getLocalStorageObjDetails(key: string) {
    if (key.indexOf(".") > -1) {
        const keys = key.split('.');
        console.log("what is here", JSON.parse(localStorage.getItem(keys[0]) || '{}')[keys[1]])
        return JSON.parse(localStorage.getItem(keys[0]) || '{}')[keys[1]]
    } else {
        return localStorage.getItem(key);
    }

}
