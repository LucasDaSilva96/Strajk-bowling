import { Link, useRouteError } from 'react-router-dom';
import { catchError } from '../services/catchError';

export default function ErrorElement() {
  const error = useRouteError();
  return (
    <div>
      <h1>Error: Ops... Something went wrong😟</h1>
      <p>{catchError(error)}</p>
      <Link to='/'>Go back to the homepage</Link>
    </div>
  );
}
