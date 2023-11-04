import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Home/Home';
import MainLayout from './layout';

function App() {
  return (
    <>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </MainLayout>
      </Router>
    </>
  );
}

export default App;
