import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Table from './components/Table';
import Auth from './pages/Auth';

const App = () => {
  const tableData = {
    headers: ["Header 1", "Header 2", "Header 3", "Header 4", "Header 5", "Header 6"],
    rows: [
      ["1 Row 1", "1 Row 2", "1 Row 3333333333333333333", "1 Row 4", "1 Row 5", "1 Row 6"],
      ["2 Row 1", "2 Row 2", "2 Row 3", "2 Row 4", "2 Row 5", "2 Row 6"],
      ["3 Row 1", "3 Row 2", "3 Row 3", "3 Row 4", "3 Row 5", "3 Row 6"],
      ["4 Row 1", "4 Row 2", "4 Row 3", "4 Row 4", "4 Row 5", "4 Row 6"],
      ["5 Row 1", "5 Row 2", "5 Row 3", "5 Row 4", "5 Row 5", "5 Row 6"],
      ["6 Row 1", "6 Row 2", "6 Row 3", "6 Row 4", "6 Row 5", "6 Row 6"],
      ["6 Row 1", "6 Row 2", "6 Row 3", "6 Row 4", "6 Row 5", "6 Row 6"],
      ["6 Row 1", "6 Row 2", "6 Row 3", "6 Row 4", "6 Row 6"],
      ["6 Row 1", "6 Row 2", "6 Row 3", "6 Row 4", "6 Row 5", "6 Row 6"],
      ["6 Row 1", "6 Row 2", "6 Row 3", "6 Row 4", "6 Row 5", "6 Row 6"],
      ["6 Row 1", "6 Row 2", "6 Row 3", "6 Row 4", "6 Row 5", "6 Row 6"],
      ["6 Row 1", "6 Row 2", "6 Row 3", "6 Row 4", "6 Row 5", "6 Row 6"],
    ]
  }

  // const tableData = null;

  if (!document.cookie) {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Auth />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Profile" element={<Profile />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
