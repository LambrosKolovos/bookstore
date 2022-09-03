import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddBookPage from "./pages/AddBookPage";
import BookPreviewPage from "./pages/BookPreviewPage";
import BookSearchPage from "./pages/BookSearchPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Set initial route to /search */}
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="search" element={<BookSearchPage />}></Route>
          <Route path="view/:id" element={<BookPreviewPage />}></Route>
          <Route path="add" element={<AddBookPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
