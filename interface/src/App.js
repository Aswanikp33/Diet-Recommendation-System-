import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/navbar";
import { AuthProvider } from "./context/";
import { useRoutes } from "react-router-dom";
import Home from "./pages/home";
import CookFood from "./pages/cook_food";
import Diet from "./pages/diet";
import DietPlan from "./pages/diet_plan";
import DietCalculator from "./pages/home";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <DietCalculator />,
    },
    {
      path: "/dietplan",
      element: <DietPlan />,
    },
    {
      path: "/cookfood",
      element: <CookFood />,
    },

  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div>{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
