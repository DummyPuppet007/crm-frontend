import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from './context/ThemeContext';
import ThemeWrapper from './components/common/ThemeWrapper';

function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <RouterProvider router={router} />
      </ThemeWrapper>
    </ThemeProvider>
  ) 
}

export default App