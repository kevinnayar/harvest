import { useLocation } from 'react-router-dom';

function useRedirectPath() {
  const location = useLocation();
  const locationState: { from?: string } = location?.state ?? { from: '/home' };
  const redirectPath =
    locationState.from === undefined ||
    (locationState.from !== undefined && (locationState.from === '/auth' || locationState.from === '/'))
      ? '/app'
      : locationState.from;

  return redirectPath;
}

export default useRedirectPath;
