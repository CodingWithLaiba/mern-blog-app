const mongoose = require("mongoose");
const Blog = require("../model/blog");

//Fecth the lists of blogs
const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log(e);
  }
  if (!blogList) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.dtatus(200).json({ blogList });
};

//add a new blog
const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newlyCreatedBlog = new Blod({
    title,
    description,
    date: currentDate,
  });
  try {
    await newlyCreatedBlog.save();
  } catch (e) {
    console.log(e);
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreatedBlog.save(session);
    session.commitTransaction();
  } catch (e) {
    return res.send(500).json({ message: e });
  }
  return res.status(200).json({ newlyCreatedBlog });
};

//delet a blog
const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.statue(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (e) {
    console.log(e);
    return res.send(500).json({ message: "Unable to delete! plz try aganin" });
  }
};

// update blog
const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  let currentBlogToUpdate;
  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id);
  } catch (error) {
    console.log(e);
    return res
      .send(500)
      .json({
        message: "Something went wrong while updating ! please try again",
      });
  }

  if (!currentBlogToUpdate) {
    return res.statue(500).json({ message: "Unable to update" });
  }

  return res.send(200).json({ currentBlogToUpdate });
};

module.exports = { fetchListOfBlogs, addNewBlog, deleteBlog, updateBlog };
