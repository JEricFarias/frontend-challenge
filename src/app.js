import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import UserUpdate from './pages/UserUpdate';
import { createTheme, ThemeProvider } from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: {
      main: '#424242'
    },
    secondary: {
      main: '#C4C4C4'
    }
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "Roboto",
    fontSize: 16
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<User />} />
          <Route path="/users/:userId" element={<UserUpdate />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;