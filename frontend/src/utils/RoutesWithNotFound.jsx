import { Route, Routes } from "react-router-dom"
import NotFound from "../components/pages/NotFound"

function RoutesWithNotDound({ children }) {
    return (
        <Routes>
            {children}
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

export default RoutesWithNotDound