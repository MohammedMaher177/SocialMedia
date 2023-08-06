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




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      { path: "team", element: <Navbar />, },
      { index: true, element: <Posts />, },
      { path: "SocialMedia", element: <Home />, },
      { path: "posts", element: <Posts />, },
      { path: "movies", element: <Movies />, },
      { path: "login", element: <Login />, },
      { path: "users", element: <Users />, },
      { path: "signup", element: <Register />, },
      { path: "users/search/:id", element: <Profile />, },
      { path: "posts/search/:id", element: <PostWithComments />, },
      { path: "*", element: <NotFound />, },
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Toaster  position="top-right" reverseOrder={false}/>
        <RouterProvider router={router}>
          <Layout />
        </RouterProvider>
      </Provider>

    </div>
  );
}

export default App;
