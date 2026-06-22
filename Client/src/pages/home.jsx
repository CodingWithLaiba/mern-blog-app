import { useContext, useEffect, } from "react";
import { GlobalContext } from "../context/index";
import axios from "axios";

export default function Home() {
  const {pending, setPending, blogList, setBlogList} =
    useContext(GlobalContext);
  async function fetchListOfBlogs() {
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;

    console.log(result)
  }


  useEffect(() => {
    fetchListOfBlogs();
  }, []);
  return (
    <div>
      <h1>Blog List</h1>
    </div>
  );
}
