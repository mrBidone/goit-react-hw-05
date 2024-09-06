import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <p>Not found this page</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
};

export default NotFoundPage;
