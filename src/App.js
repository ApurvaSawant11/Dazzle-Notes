import "./App.css";
import { useState } from "react";
import { Routes, Route} from "react-router-dom";
import { Header,} from "./components";
import { Landing, Home, Login, Signup, Archive, Trash } from "./pages";
import { WithSidebar, WithoutSidebar, ProtectedRoute } from "./routes";
import { useTheme } from "./context";


const App = () => {
  const [barCollapse, setBarCollapse] = useState({collapse: false, showSidebar: true });
  const { theme } = useTheme();

  return (
    <div className="App" data-theme={theme}>
      <Header barCollapse={barCollapse} setBarCollapse={setBarCollapse}/>
        <Routes>
          
          <Route element={ <WithoutSidebar />}>
            <Route path="/landingpage" element={ <Landing /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <Signup /> } />
          </Route>
          
          <Route element={<WithSidebar barCollapse={barCollapse} />}>
            <Route element={ <ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/archive" element={ <Archive /> } />
              <Route path="/trash" element={ <Trash /> } />
            </Route>
          </Route>

       
       </Routes>
      
    </div>
  );
}

export default App;
