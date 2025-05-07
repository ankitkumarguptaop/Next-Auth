import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import theme from "@/theme/theme";

export default function ThemeProviderWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
  );
}