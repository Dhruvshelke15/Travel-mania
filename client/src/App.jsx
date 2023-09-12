import './App.css';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import Login from './pages/Login';
import Layout from './Layout';
import Register from './pages/Register';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import Account from './pages/Account';
import Places from './pages/Places';
import PlacesForm from './pages/PlacesForm';
import PlacePage from './pages/PlacePage';
import Bookings from './pages/Bookings';
import Book from './pages/Book';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/bookings/:id" element={<Book />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
