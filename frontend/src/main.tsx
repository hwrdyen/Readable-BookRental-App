import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // queries won't automatically retry if they fail
      retry: 0,
    },
  },
});

/*
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  => Sets up a context provider (QueryClientProvider) with the queryClient
  instance and wraps the root component (<App />) of the application within
  it
  => allowing any child components of <App /> to access the queryClient
  instance through context 
  => used for managing state and data fetching using the react-query library
*/

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
