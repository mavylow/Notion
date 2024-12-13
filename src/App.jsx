import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import SingUp from "./routes/auth/SingUp";
import LogIn from "./routes/auth/LogIn";
import HomePage from "./routes/homepage/HomePage";
import About from "./routes/homepage/About";
import Notes from "./routes/homepage/notes/Notes";
import {
  RequireAuth,
  AuthProvider,
} from "./isAuth/authComponent";
import ErrorPage from "./routes/ErrorPage";

import NoteDetail from "./routes/homepage/notes/NoteDetail";
import AddNewNote from "./routes/homepage/notes/AddNewNote";
import EditNote from "./routes/homepage/notes/EditNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),

    children: [
      { index: true, element: <About /> },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorPage />,
      },
      {
        path: "notes",
        element: <Notes />,
        errorElement: <ErrorPage />,
      },
      {
        path: "notes/:id",
        element: <NoteDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "notes/add",
        element: <AddNewNote />,
        errorElement: <ErrorPage />,
      },
      {
        path: "notes/edit/:id",
        element: <EditNote />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  { path: "login", element: <LogIn /> },
  { path: "signup", element: <SingUp /> },
  { path: "*", element: <ErrorPage /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
