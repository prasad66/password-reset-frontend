import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Register from './components/Register';
import ForgotPassswordForm from './components/ForgotPassswordForm';
import ForgotPasswordRedirect from './components/ForgotPasswordRedirect';
import LinkError from './components/LinkError';
import ResetPassword from './components/ResetPassword';
import Loader from './components/LoaderPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/loader" element={<Loader />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/forgot-password" element={<ForgotPassswordForm />} />
          <Route path="/forgot-password-redirect/:token/:verifyString" element={<ForgotPasswordRedirect />} />
          <Route path="/link-error" element={<LinkError />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
