export const fetchResource = (url)=>{
    return fetch(url).then(async (res)=>{
        let text = await res.text();
        return text;
    })
}