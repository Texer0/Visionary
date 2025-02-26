import './App.css'
import './index.css' 
import { Route, Routes } from 'react-router-dom' 
import { Toaster } from 'sonner'
import { CookiesProvider } from 'react-cookie'

import Logo from './components/Logo/Logo' 
import Navbar from './components/NavBar/NavBar'
import Home from './components/pages/Home' 
import LogInForm from './components/Forms/LogInForm/LogInForm' 
import RegisterForm from './components/Forms/RegisterForm/RegisterForm' 
import Projects from './components/pages/Projects' 
import NotFound from './components/pages/NotFound' 
import Project from './components/pages/Project' 
import NewProject from './components/pages/NewProject' 
import AuthGuard from './components/AuthGuard/AuthGuard'
import Logout from './components/Logout/Logout'

function App() {
  return (
    <>
    <CookiesProvider>
    <Toaster>
    </Toaster>

        <Navbar/>
        <Logo/>
		<Logout></Logout>

        <Routes>
            <Route path='/'>

                <Route path='/home' element={<Home/>} />
                <Route path='/login' element={<LogInForm/>} />
                <Route path='/register' element={<RegisterForm/>} />

				<Route element={<AuthGuard/>} >
					<Route path='/projects' element={<Projects/>} />
					<Route path='/projects/project/:id' element={<Project/>} />
					<Route path='/new_project' element={<NewProject/>} />
					<Route path='/project' element={<Project/>} />
				</Route>

                <Route path='*' element={<NotFound/>} />
            </Route>
        </Routes>
    </CookiesProvider>
    </>
  )
}

export default App