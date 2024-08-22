import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const Authcontext=createContext()

export default function AuthcontextProvider(props){
    const [logindata, Setlogindata] = useState(null);

  const savelogindata = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedData = jwtDecode(token);
      Setlogindata(decodedData);
      console.log(decodedData); // Log decoded data to verify correctness
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      savelogindata();
    }
  }, []); // Empty dependency array to run only on initial mount

  return(
    <Authcontext.Provider value={{logindata,savelogindata}}>
        {props.children}
    </Authcontext.Provider>
  )
}
