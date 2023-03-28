import React, { createContext, useState, useEffect } from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: null });

  const setAuthData = (data) => {
    setAuth({data: data});
    window.localStorage.setItem('authData', JSON.stringify(data));
  };

  function parseJwt (token) {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    let token = JSON.parse(window.localStorage.getItem('authData'));
    if(token && token.accessToken) {
        try {
            let decoded = parseJwt(token.accessToken);
            if(decoded.exp < new Date().getTime()/1000) {
                token = null;
            }
        } catch (ex) {
            token = null;
        }
    }
    setAuth({ loading: false, data: token });
  }, []);

  return (
    <authContext.Provider value={{ auth, setAuthData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;