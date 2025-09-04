import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  // Get Admin data
  const getAdmin = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getadmin`, {
        withCredentials: true // ✅ important for cookie
      });
      setAdminData(result.data);
      console.log(result.data);
    } catch (error) {
      setAdminData(null);
      console.log(error.response?.data || error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const value = {
    adminData,
    setAdminData,
    getAdmin
  };

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
