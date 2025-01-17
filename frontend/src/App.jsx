import {Navigate, BrowserRouter, Route, Routes} from 'react-router-dom';
import {Signup} from './pages/Signup.jsx';
import {Signin} from './pages/Signin.jsx';
import {Dashboard} from './pages/Dashboard.jsx';
import {SendMoney} from './pages/SendMoney.jsx';
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={authUser ? <Dashboard /> : <Navigate to={"/signin"} />} />
				<Route path='/signin' element={authUser ? <Navigate to='/' /> : <Signin />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />
        <Route path='/dashboard' element={authUser ? <Dashboard /> : <Navigate to='/signin' />} />
        <Route path='/send' element={authUser ? <SendMoney /> : <Navigate to='/signin' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;