import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Loader from "./components/UI/Loader";
import ScrollToTop from "./components/UI/ScrollToTop";

const Home = React.lazy(() => import("./pages/Home"));
const Movies = React.lazy(() => import("./pages/Movies"));
const TvShows = React.lazy(() => import("./pages/TV"));
const Search = React.lazy(() => import("./pages/Search"));
const Detail = React.lazy(() => import("./pages/Detail"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="centered">
          <Loader />
        </div>
      }
    >
      <Layout>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />

            <Route path="/movies" element={<Movies />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/tvs" element={<TvShows />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </ScrollToTop>
      </Layout>
    </Suspense>
  );
};

export default App;
