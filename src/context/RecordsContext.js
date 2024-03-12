import { createContext, useReducer } from 'react';

export const RecordsContext = createContext();

export const recordsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECORDS':
      return {
        records: action.payload,
      };
    case 'CREATE_RECORD':
      return {
        records: [action.payload, ...state.records],
      };
    case 'DELETE_RECORD':
      return {
        records: state.records.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const RecordsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recordsReducer, {
    records: null,
  });

  return (
    <RecordsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RecordsContext.Provider>
  );
};
