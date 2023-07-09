import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  // Customize the theme here
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Your application content */}
    </ThemeProvider>
  );
};

export default App;
