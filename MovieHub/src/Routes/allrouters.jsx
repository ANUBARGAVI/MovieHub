import { Route, Routes } from "react-router-dom";
import Movielist from "../pages/Movielist";

const AllRouters=()=>{
    return (
    <>
    <Routes>
        <Route path="/" element={<Movielist title=""/>} />
        <Route path="movies/now" element={<Movielist title="currently playing"/>} />
        <Route path="movies/popular" element={<Movielist title="popular movies"/>} />
        <Route path="movies/top" element={<Movielist title="Top Rated movies"/>} />
        <Route path="movies/upcoming" element={<Movielist title="Upcoming movies"/>} />
    </Routes>
    </>
    );
};

export default AllRouters;