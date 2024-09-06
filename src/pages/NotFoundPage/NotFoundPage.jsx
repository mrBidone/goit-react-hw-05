import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <Link to="/">Go Homepage</Link>
      <p>Not found this page</p>
    </div>
  );
};

export default NotFoundPage;
