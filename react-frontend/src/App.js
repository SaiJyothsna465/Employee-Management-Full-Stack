import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes,Route} from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';


// function ProfilePage() {
//   // Get the userId param from the URL.
//   let { userId } = useParams();
//   // ...
// }

function App() {
  return (
      <div>
        <Router>
                <HeaderComponent />
                <div className="container"> 
                    <Routes>
                      <Route path="/" element={<ListEmployeeComponent/>}></Route>
                      <Route path="/getEmployees" element={<ListEmployeeComponent/>}></Route>
                      <Route path="/add-employee/:id" element={<CreateEmployeeComponent/>}></Route>
                      <Route path="/view-employee/:id" element={<ViewEmployeeComponent/>}></Route>
                    </Routes>
                                  
                </div>

                <FooterComponent />

            
        </Router>
      
      </div>
  );
}

export default App;
