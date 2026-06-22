import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/index";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { pending, setPending, blogList, setBlogList } =
    useContext(GlobalContext);
  const navigate = useNavigate();
    function handleEditBlog(getCurrentBlogItem) {
    [
      console.log(getCurrentBlogItem),
      navigate("/add-blog", { state: { getCurrentBlogItem } }),
    ];
  }
  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }
  async function handleDeleteBlog(getCurrentId) {
    console.log(getCurrentId);
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${getCurrentId}`,
    );
    const result = await response.data;
    if (result?.message) {
      fetchListOfBlogs();
      // navigate(0);
    }
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);
  return (
    <div className="p-7">
      <h1 className="font-bold text-5xl mb-4">Blog List</h1>
      {pending ? (
        <h1>Loading Blogs ! Please Wait</h1>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id} className="p-2.5 border border-black">
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>
                <div className="flex justify-end gap-1">
                  <FaEdit onClick={() => handleEditBlog(blogItem)} size={30} />
                  <FaTrash
                    onClick={() => handleDeleteBlog(blogItem._id)}
                    size={30}
                  />
                </div>
              </div>
            ))
          ) : (
            <h3 className="text-2xl font-semibold">No blogs add</h3>
          )}
        </div>
      )}
    </div>
  );
}
