async function updateUrlPram(updateKey, newValue) {
    /**
     * Updates URL with new prams
     */
    urlSplit = (window.location.href).split('?');
    baseUrl = urlSplit[0];
    const currentParams = new URLSearchParams(window.location.search);
    const newParams = new URLSearchParams();
    currentParams.forEach((value, key) => {
        if (key != updateKey) {
            newParams.append(key, value);
        } else {
            newParams.append(updateKey, newValue);
        }
    });
    if (!newParams.has(updateKey)) {
        newParams.append(updateKey, newValue);
    }
    let newURL = `${baseUrl}?${newParams.toString()}`;
    window.location.replace(newURL);
}

function getNewUrl(page, updateKey = null, newValue = null) {
    /**
     * Get link to new page with new key value for URL param
     */
    let accountLink2 = window.location.origin
    const currentParams = new URLSearchParams(window.location.search);
    let newParams = new URLSearchParams(window.location.search);

    if (!(updateKey == null) && !(newValue == null)) {
        newParams = new URLSearchParams();
        currentParams.forEach((value, key) => {
            if (key != updateKey) {
                newParams.append(key, value);
            } else {
                newParams.append(updateKey, newValue);
            }
            if (!newParams.has(updateKey)) {
                newParams.append(updateKey, newValue);
            }
        });
    } else if (!(updateKey == null) && (newValue == null)){
        newParams.delete(updateKey)
    }
    
    newLink = `${accountLink2}/${page}?${newParams.toString()}`
    return newLink
}

function getHomeURL(){
    let orginURL = window.location.origin
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has("id")){
        return `${orginURL}/?id=${currentParams.get("id")}`
    }else{
        return `${orginURL}}`
    }
}
