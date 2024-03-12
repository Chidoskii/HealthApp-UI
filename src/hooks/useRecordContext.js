import { RecordsContext } from '../context/RecordsContext';
import { useContext } from 'react';

export const useRecordsContext = () => {
  const context = useContext(RecordsContext);

  if (!context) {
    throw Error(
      'useRecordsContext must be used inside a RecordsContextProvider'
    );
  }

  return context;
};
