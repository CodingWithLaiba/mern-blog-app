const mongoose = require("mongoose");
const blogRouter = express.Router();

const {
  fetchListOfBlogs,
  addNewBlog,
  deleteBlog,
  updateBlog,
} = require("../controller/blog-controller");

blogRouter.get("/", fetchListOfBlogs);
blogRouter.post("/add", addNewBlog);
blogRouter.put("/update/:id", deleteBlog);
blogRouter.delete("/delete/:id", updateBlog);

module.exports = blogRouter;
