import { Route, Routes } from "react-router"
import Home from "./components/Pages/Home"
import VideoDetails from "./components/Pages/VideoDetails"
import Layout from "./components/layout/Layout"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"
import Auth from "./components/Pages/Auth"
import AuthProtection from "./components/authProtection/AuthProtection"
import Wishlist from "./components/Pages/Wishlist"

function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthProtection/>}>

        <Route path="/auth" element={<Auth />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/details/:id" element={<VideoDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
