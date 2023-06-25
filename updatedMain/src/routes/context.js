import React, { createContext, useState } from 'react';

export const TransferDataContext = createContext();

export const TransferDataProvider = ({ children }) => {
    const [lineData, setLineDataa] = useState(null);
    const [labels, setLabels] = useState(null);
    const [datas, setDatas] = useState(null);
    const [title, setTitle] = useState(null);

  return (
    <TransferDataContext.Provider value={{ lineData, setLineDataa, labels, setLabels, datas, setDatas, title, setTitle   }}>
      {children}
    </TransferDataContext.Provider>
  );
};