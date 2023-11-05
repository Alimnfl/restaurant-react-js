import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Page/Home';
import MainLayout from './Page/Layout';
import Detail from './Page/Detail';

function App() {
  return (
    <>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/restaurant/:id" element={<Detail />}></Route>
          </Routes>
        </MainLayout>
      </Router>
    </>
  );
}

export default App;
