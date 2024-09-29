
const get = async () => {
    const res = await fetch('/v1/item/list');
    const data = await res.json();
    return data;
};


export const getListUsers = get;