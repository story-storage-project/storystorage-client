import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { REQUEST_ERROR } from '../constants/errorMessage';

export default function useQuery({ api, reqData, isRequireLogin }) {
  const [apiData, setApiData] = useState();
  const [result, setResult] = useState('');
  const [cookies] = useCookies(['loggedIn']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!api || (isRequireLogin && !cookies.loggedIn)) {
      setApiData(null);
      return setResult('authError');
    }

    const query = async () => {
      try {
        const response = reqData ? await api(reqData) : await api();
        const { data } = response;

        setApiData(data);
        setResult('success');
      } catch (error) {
        if (!error.response) {
          return setResult(REQUEST_ERROR.TIME_OUT);
        }

        if (error.status === 404) {
          return navigate('/not-found');
        }
      }
    };

    query();
  }, [api, cookies.loggedIn]);

  return { data: apiData, result };
}
