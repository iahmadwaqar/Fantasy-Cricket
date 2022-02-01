import {useQuery} from '@apollo/client';

function useApiCall(graphAPI) {
  const {loading, error, data} = useQuery(graphAPI);
  return {loading, error, data};
}
export default useApiCall;
