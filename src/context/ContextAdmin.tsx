import { createContext, useContext, useReducer } from "react";
import adminReducer, { initialValues } from "./adminReducer";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  return (
    <AdminContext.Provider value={useReducer(adminReducer
  , initialValues)}>
      {children}
    </AdminContext.Provider>
  );
};

const useAdmin = () => {
  console.log("contexto", useContext(AdminContext));
  return useContext(AdminContext)[0];
};
const useDispatch = () => useContext(AdminContext)[1];

export { AdminContext, useAdmin, useDispatch };
export default AdminProvider;
