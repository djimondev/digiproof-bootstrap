import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { useTheme } from "./hooks/useTheme";
import AppRoutes from "./routes";

function App() {
    const { theme } = useTheme();

    return (
        <div className={theme}>
            <BrowserRouter>
                <Layout>
                    <AppRoutes />
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
