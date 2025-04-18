import { jwtDecode } from "jwt-decode";

function setToken(token){
  localStorage.setItem('access_token', token);
}

export function getToken(){
    return localStorage.getItem('access_token');
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated(){
  const token = readToken();  
  return (token) ? true : false;
}

export function removeToken(){
  localStorage.removeItem('access_token');
}

export async function authenticateUser(email, password) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      "content-type": "application/json"
    }
  });

  const data = await res.json();

  if(res.status === 200){
    setToken(data.token);
    return true;
  }else{
    throw new Error(data.message);
  } 
}

export async function newUser(email, password, password2, fullName) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ email: email, password: password, password2:password2,fullName:fullName  }),
    headers: {
      "content-type": "application/json"
    }
  });

  const data = await res.json();

  if(res.status === 200){
    return true;
  }else{
    throw new Error(data.message);
  } 
}
