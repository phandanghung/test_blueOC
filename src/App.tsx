import { Routes, Route } from "react-router-dom";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import MainLayout from "./layout/MainLayout";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <MainLayout>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </Provider>
    </MainLayout>
  );
}

export default App;