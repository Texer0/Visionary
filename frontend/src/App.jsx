import './App.css'
import './index.css' 
import { Route } from 'react-router-dom' 
import { Toaster } from 'sonner'
import { CookiesProvider } from 'react-cookie'

import Welcome from './components/pages/Welcome/Welcome'
import Home from './components/pages/Home'
import LogIn from './components/pages/LogIn'
import Register from './components/pages/Register'
import FAQ from './components/pages/FAQ'
import NotFound from './components/pages/NotFound' 
import Project from './components/pages/Project' 
import AuthGuard from './components/AuthGuard/AuthGuard'
import Projects from './components/pages/Projects/Projects'
import RoutesWithNotDound from './utils/RoutesWithNotFound'
import Navbar from './components/NavBar/NavBar'
import Logout from './components/Logout/Logout'
import Logo from './components/Logo/Logo'

function App() {
  return (
    <CookiesProvider>
    <Toaster/>

        <RoutesWithNotDound>
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
        </RoutesWithNotDound>
    </CookiesProvider>
  )
}

export default App