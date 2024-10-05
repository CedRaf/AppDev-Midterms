const users = [
    {
        id: 1, 
        username: 'Jimmy',
        password: '$2b$10$IBpK6V5V5xmpD7mslReIBOEonKDcbXbl4HH75zTumVUK5lgSh/8Zi', //plain text password is "jeromePassword"
        email: 'jimmy@gmail.com'
    },
    {
        id: 2,
        username: 'Bob',
        password: '$2b$10$ydMpCqnGazTu.wnhLIdRqea7pkHqUcO/H932MWZL57xPZIa0/o492', //plain text password is "bobPassword"
        email: 'bob@gmail.com'
    },
    {
        id: 3,
        username: 'Jerome',
        password: '$2b$10$s1DWLGDWc/fMtI/gj1rBH.MuhcPT.g/LNtA6FmBEWX.NJbbSDtzR6', //plain text password is "jeromePassword"
        email: 'jerome@gmail.com'
    }
]

/* IMPORTANT NOTES
    - The reason why the password is hashed above is because of bcrypts comparison logic. In the login function found on userController,
      we use bcrypt.compare(inputtedPlainTextPassword, user.password), this function hashes the inputted password and compares it to what we set above.
      So, if we set it to plain text as well, the passwords will never match.
*/


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
    return users.find(user => user.email === email); 
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