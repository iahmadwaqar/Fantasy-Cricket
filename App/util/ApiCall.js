import {useQuery} from '@apollo/client';

function useGrapthQLApiCall(graphAPI) {
  const {loading, error, data} = useQuery(graphAPI);
  return {loading, error, data};
}
export default useGrapthQLApiCall;
