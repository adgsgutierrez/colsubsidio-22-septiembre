export const createNewUser = async (user) => {
    if(!user || !user.has('id') || !user.has('name') || !user.has('lastname') || !user.has('photo')){
        console.error('user is required');
        return;
    }
    const res = await fetch('/v1/item/create', { 
        method: 'POST',
        body: user
    });
    await res.json();
}