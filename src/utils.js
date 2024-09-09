export const isJsonString = (data) =>  {
    try {
        JSON.parse(data);
    }
    catch(error){
        return false;
    }
    return true;
 }

 export const getBase64 = (file) => 
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export function getItem(label, key, icon, children, type){
    return {
        label,
        key,
        icon,
        children,
        type,
    };
}
export const converPrice = (price) =>{
    try{
        const result = price?.toLocaleString().replaceAll(',', '.')
        return `${result} VND`;

    }catch(err){
        return null
    }
}
