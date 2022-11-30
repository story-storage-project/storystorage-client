import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { REQUEST_ERROR } from '../constants/errorMessage';

export default function useQuery() {
  const [result, setResult] = useState();
  const [cookies] = useCookies(['loggedIn']);

  const query = async (api, ...arg) => {
    if (!cookies.loggedIn) setResult({ result: 'noAuth' });
    try {
      const response = arg ? await api(...arg) : await api();

      const { data } = response;
      const queryResult = { data, result: 'success' };

      setResult(queryResult);

      return queryResult;
    } catch (error) {
      if (!error.response) {
        const res = {
          data: REQUEST_ERROR.TIME_OUT,
          result: 'fail',
        };
        setResult(res);

        return res;
      }

      const res = {
        data: REQUEST_ERROR.TIME_OUT,
        result: 'fail',
      };
      setResult(res);

      return res;
    }
  };

  return [result, query];
}
