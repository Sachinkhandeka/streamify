import Navbar from "./layouts/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuspenseWrapper from "./utils/SuspenseWrapper";
import React from "react";
import { Sidebar } from "./layouts/Sidebar";

// Lazy Loading Pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const TopArtist = React.lazy(()=> import("./pages/TopArtist"));
const Revenue = React.lazy(()=> import("./pages/Revenue"));
const Users = React.lazy(()=> import("./pages/Users"));
const Streams = React.lazy(()=> import("./pages/Streams"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <section className="h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Sidebar & Main Content */}
        <div className="flex flex-grow">
          <Sidebar /> {/* Sidebar will always be visible */}
          <main className="flex-grow p-4">
            <Routes>
              <Route
                path="/"
                element={
                  <SuspenseWrapper>
                    <Dashboard />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/top-artists"
                element={
                  <SuspenseWrapper>
                    <TopArtist />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/revenue"
                element={
                  <SuspenseWrapper>
                    <Revenue />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/users"
                element={
                  <SuspenseWrapper>
                    <Users />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/streams"
                element={
                  <SuspenseWrapper>
                    <Streams />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="*"
                element={
                  <SuspenseWrapper>
                    <NotFound />
                  </SuspenseWrapper>
                }
              />
            </Routes>
          </main>
        </div>
      </section>
    </BrowserRouter>
  );
}
