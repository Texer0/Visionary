import './App.css'
import './index.css';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import Logo from './components/Logo/Logo';
import Navbar from './components/NavBar/NavBar'
import Home from './components/pages/Home';
import LogInForm from './components/Forms/LogInForm/LogInForm';
import RegisterForm from './components/Forms/RegisterForm/RegisterForm';
import Projects from './components/pages/Projects';
import NotFound from './components/pages/NotFound';
import Project from './components/pages/Project';
import NewProject from './components/pages/NewProject';

function App() {
  return (
    <>
    <Toaster>
    </Toaster>

        <Navbar/>
        <Logo/>

        

        <Routes>
            <Route path='/'>
                <Route path='/home' element={<Home/>} />
                <Route path='/login' element={<LogInForm/>} />
                <Route path='/register' element={<RegisterForm/>} />
                <Route path='/projects' element={<Projects/>} />
                <Route path='/projects/project/:id' element={<Project/>} />
                <Route path='/new_project' element={<NewProject/>} />
                <Route path='/project' element={<Project/>} />

                <Route path='*' element={<NotFound/>} />
            </Route>
        </Routes>
    </>
  )
}

export default App