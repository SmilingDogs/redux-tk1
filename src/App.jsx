
import './App.css';
import AddPostForm from './components/AddPostForm';
import PostsList from './components/PostsList';
// import Counter from './components/Counter';
import SinglePostPage from './pages/SinglePostPage';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import EditPostForm from './components/EditPostForm';

function App() {
 
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePostPage />} />
          <Route path='edit/:postId' element={<EditPostForm />} />

        </Route>
      </Route>
    </Routes>
  )
}
//todo must wrap all children pages into Layout route => to render them in the <Outlet />
export default App
