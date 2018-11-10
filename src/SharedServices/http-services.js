import {serviceURL} from '../axios-service';

export const get = async (url)  => {
    let response = null;
    await serviceURL.get(url)
        .then(res => {
            console.log("Res: ", res.data);
            response = res.data;
        })
        .catch(error => {
            console.log("Failed");
        });
    
    return response;
} 

export const post = async (url, data)  => {
    let response = null;
    await serviceURL.post(url, data)
        .then(res => {
            console.log("Res: ", res.data);
            response = res.data;
        })
        .catch(error => {
            console.log("Failed");
        });
    
    return response;
} 

export const del = async (url)  => {
    await serviceURL.delete(url);
}

export const put = async (url, data)  => {
    await serviceURL.put(url, data);
}