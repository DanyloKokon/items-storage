const API_URL = "https://6a43f44f6dba791499aba793.mockapi.io/api/menu/choice";
const API_USER_URL = "https://6a43f44f6dba791499aba793.mockapi.io/api/menu/accounts";

export const fetchItems = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`API error! Status: ${response.status}`);
    }
    return await response.json();
};

export const postItem = async (newItem) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newItem)
    });
    if (!response.ok) {
        throw new Error(`API error! Status: ${response.status}`);
    }
    return await response.json();
};

export const putAmmount = async ({ itemId, amm }) => {
    const response = await fetch(`${API_URL}/${itemId}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ Ammount: amm })
    });
    if (!response.ok) {
        throw new Error(`API error! Status: ${response.status}`);
    }
    const data = await response.json();
    // Ensure the response includes the itemId for the reducer to find the correct item
    return { ...data, id: itemId };
};

export const deleteItem = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`API error! Status: ${response.status}`);
    }
    // After deletion, fetch the updated list of items
    const itemsResponse = await fetch(API_URL);
    if (!itemsResponse.ok) {
        throw new Error(`API error! Status: ${itemsResponse.status}`);
    }
    return await itemsResponse.json();
}

//=====================================================

export const fetchUsers = async () => {
    const response = await fetch(API_USER_URL);
    if (!response.ok) {
        throw new Error(`API error! Status: ${response.status}`);
    }
    return await response.json();
};

export const postUser = async (newUser) => {
    const response = await fetch(API_USER_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newUser)
    });
    if (!response.ok) {
        throw new Error(`API error! Status: ${response.status}`);
    }
    return await response.json();
};

export const loginUser = async ({ email, password }) => {
    const response = await fetch(API_USER_URL);
    if (!response.ok) {
        throw new Error(`API error! Status: ${response.status}`);
    }
    const users = await response.json();

    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    return user;
};