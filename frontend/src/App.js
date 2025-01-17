import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useAuthContext} from "./hooks/useAuthContext";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const {user} = useAuthContext()

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <div className="pages">
                    <Routes>
                        <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
                        <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
                        <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
