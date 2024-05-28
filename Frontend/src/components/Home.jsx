import Login from "./Login"
import SignUp from "./SignUp"

const Home = () => {
    return (
        <div>
            Inside the Home Page
            <div>
                <SignUp />
                <Login />
            </div>
        </div>
    )
}

export default Home