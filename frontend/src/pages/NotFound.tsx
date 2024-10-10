import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <p>It appears the page you are looking for could not be found. </p>
      <p>This error may occur if you are offline. </p>
      <Link to="/">Navigate back to the homepage</Link>
    </div>
  );
};

export default NotFound;
