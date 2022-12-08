import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  if (!authUser) {
    return <Navigate to="/" />
  }

  // authorized so return child components
  return children;
}

export { PrivateRoute };