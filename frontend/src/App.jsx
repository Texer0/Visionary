import './App.css'
import './index.css' 
import { Route, Routes } from 'react-router-dom' 
import { Toaster } from 'sonner'
import { CookiesProvider } from 'react-cookie'

import Logo from './components/Logo/Logo' 
import Navbar from './components/NavBar/NavBar'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound' 
import Project from './components/pages/Project' 
import NewProject from './components/pages/NewProject' 
import AuthGuard from './components/AuthGuard/AuthGuard'
import Logout from './components/Logout/Logout'
import Welcome from './components/pages/Welcome/Welcome'
import Projects from './components/pages/Projects/Projects'
import LogIn from './components/pages/LogIn'
import Register from './components/pages/Register'
import FAQ from './components/pages/FAQ'

function App() {
  return (
    <CookiesProvider>
    <Toaster/>

        <Routes>
            <Route path='/'>

                <Route path='/' element={<Welcome/>} />
                <Route path='/login' element={<LogIn/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/FAQ' element={<FAQ/>} />

				<Route element={<AuthGuard/>} >
                    <Route path='/home' element={<Home/>} />
					<Route path='/projects' element={<Projects/>} />
					<Route path='/project/:id' element={<Project/>} />
				</Route>

                <Route path='*' element={<NotFound/>} />
            </Route>
        </Routes>
    </CookiesProvider>
  )
}

export default App