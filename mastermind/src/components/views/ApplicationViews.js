import { Outlet, Route, Routes } from "react-router-dom"
import { HomePage } from "../Home/Homepage"
import { CategoryList } from "../quiz/CategoryList"



export const ApplicationViews = () => {

	const localUser = localStorage.getItem("master_user")
    const MasterUserObject = JSON.parse(localUser)
	return <>
	
    <Routes>
        <Route
        path="/"
        element={
            <>

            <Outlet />
        </>
        }
        >
			<Route
            path="quiz"
            element={
            <>
            {/*These cannot communicate with one another until they are wrapped in a parent
                    
                    <RequestList /> 
                    They will now be returned in RequestContainer.js
                    */}
            <CategoryList />
            </>
            }
        />
        <Route path="Home" element={ < HomePage />} />  
        </Route>
    </Routes>
	
	</>
}

