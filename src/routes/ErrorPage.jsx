import {
  isRouteErrorResponse,
  Link,
  useRouteError,
} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold">
          Page Not Found
        </h2>
        <p>
          {isRouteErrorResponse(error)
            ? error.message
            : "Sorry, it seems this page does not exist"}
        </p>
        <Link
          to="/"
          className="text-blue-500 underline mt-4"
        >
          Go to Home Page
        </Link>
      </div>
    </>
  );
}
