import React, { createContext, useState } from 'react';

export const TransferDataContext = createContext();

export const TransferDataProvider = ({ children }) => {
    const [labels, setLabels] = useState([]);
    const [datas, setDatas] = useState([]);
    const [title, setTitle] = useState([]);
    const [categordata, setcategorData] = useState([]);
    const [laa, setLaa] = useState([]);
    const [check, setCheck] = useState(false);

  return (
    <TransferDataContext.Provider value={{ labels, setLabels, 
            datas, setDatas, title, 
            setTitle, categordata, 
            setcategorData, laa, setLaa,
            check, setCheck }}>
      {children}
    </TransferDataContext.Provider>
  );
};
