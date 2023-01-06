
import './App.css';
import AddPostForm from './components/AddPostForm';
import PostsList from './components/PostsList';
// import Counter from './components/Counter';
import SinglePostPage from './pages/SinglePostPage';
import Layout from './components/Layout';
import { Route, Routes, Navigate } from 'react-router-dom';
import EditPostForm from './components/EditPostForm';
import UserPage from './pages/UserPage';
import UsersList from './components/UsersList';

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

        <Route path='user'>
          <Route index element={<UsersList />} />
          <Route path=':userId' element={<UserPage />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  )
}
//todo must wrap all children pages into Layout route => to render them in the <Outlet />
export default App
