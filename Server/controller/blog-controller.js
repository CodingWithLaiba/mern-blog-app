const mongoose = require("mongoose");
const Blog = require("../model/blog");

// Fetch the list of blogs
const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
  if (!blogList) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blogList });
};

// Add a new blog
const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newlyCreatedBlog = new Blog({   
    title,
    description,
    date: currentDate,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreatedBlog.save({ session });  
    await session.commitTransaction();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message }); 
  }

  return res.status(200).json({ newlyCreatedBlog });
};

// Delete a blog
const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({ message: "Blog not found" }); 
    }
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Unable to delete! plz try again" }); 
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  let currentBlogToUpdate;
  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(
      id,
      { title, description },  
      { new: true }
    );
  } catch (e) {                 
    console.log(e);
    return res.status(500).json({ message: "Something went wrong while updating!" }); 
  }

  if (!currentBlogToUpdate) {
    return res.status(404).json({ message: "Unable to update - blog not found" });
  }

  return res.status(200).json({ currentBlogToUpdate }); 
};

module.exports = { fetchListOfBlogs, addNewBlog, deleteBlog, updateBlog };