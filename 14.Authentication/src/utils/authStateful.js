//this whole file is a diary to server
const sessionIdtoUserMap = new Map(); // this is a hash map
// this hash map is emptied when we restart the server so user shoudl reslogin is statefullor sessin based authentication

// Set a user
export const SetUser = (id, user) => sessionIdtoUserMap.set(id, user);

// Get a user
export const GetUser = (id) => sessionIdtoUserMap.get(id);
