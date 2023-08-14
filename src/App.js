import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Posts from './Components/Posts/Posts.jsx';
import Movies from './Components/Movies/Movies.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import Layout from './Components/Layout/Layout.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import { Provider } from 'react-redux';
import store from './Redux/Store.js';
import Profile from './Components/Profile/Profile.jsx';
import PostWithComments from './Components/Posts/PostWithComments.jsx';
import Users from './Components/Users/Users.jsx';
import { Toaster } from 'react-hot-toast';
import ProtectedRout from './Components/ProtectedRout/ProtectedRout.jsx';
import FirendRequest from './Components/Profile/FirendRequest.jsx';
import MyPosts from './Components/Profile/MyPosts.jsx';
import Friends from './Components/Profile/Friends.jsx';
import Verify from './Components/Verify/Verify.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      { index: true, element: <ProtectedRout><Posts /></ProtectedRout>, },
      { path: "SocialMedia", element: <ProtectedRout><Home /></ProtectedRout>, },
      { path: "posts", element: <ProtectedRout><Posts /></ProtectedRout>, },
      { path: "movies", element: <ProtectedRout><Movies /></ProtectedRout>, },
      { path: "login", element: <ProtectedRout><Login /></ProtectedRout>, },
      { path: "users", element: <ProtectedRout><Users /></ProtectedRout>, },
      { path: "./auth/verifyemail/:verifyToken", element: <Verify />, },
      { path: "signup", element: <ProtectedRout><Register /></ProtectedRout>, },
      {
        path: "users/search/:id", element: <ProtectedRout><Profile /></ProtectedRout>,
        children: [
          { index: true, element: <MyPosts /> },
          { path: "friendrequests", element: <FirendRequest /> },
          { path: "posts", element: <MyPosts /> },
          { path: "friends", element: <Friends /> },
        ]
      },
      { path: "posts/search/:id", element: <ProtectedRout><PostWithComments /></ProtectedRout>, },

      { path: "*", element: <NotFound />, },
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router}>
          <ProtectedRout>
            <Layout />
          </ProtectedRout>
        </RouterProvider>
      </Provider>

    </div>
  );
}

export default App;
