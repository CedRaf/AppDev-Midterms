const users = [
    {
        id: 1, 
        username: 'Jimmy',
        password: 'jimmy_password',
        email: 'jimmy@gmail.com'
    },
    {
        id: 2,
        username: 'Bob',
        password: 'bob_password',
        email: 'bob@gmail.com'
    },
    {
        id: 3,
        username: 'Jerome',
        password: 'jerome_password',
        email: 'jerome@gmail.com'
    }
]


const getAllUsers = () => {
    return users;
}

const getUserID = (id) =>{
    return users.find(user => user.id === id); 
}

const getUserUsername = (username) =>{
    return users.find(user => user.username === username);
}

const getUserEmail = (email) =>{
    return users.find(user => users.email === email); 
}

const createUser = (newUser) =>{
    const newID = users.length > 0 ? users[users.length-1].id + 1 : 1;
    const user = {newID, ...newUser}; 
    users.push(user);
    return user; 
}

module.exports =  {
    getAllUsers,
    getUserID,
    getUserUsername,
    getUserEmail,
    createUser,
};