import Blog from "../models/blog.model.js";

export const showAddBlogPage = (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
};

export const createNewBlog = async (req, res) => {
  const { title, content } = req.body;

  const coverImgUrl = req.file
    ? `/uploads/temp/${req.user._id}/${req.file.filename}`
    : undefined;

  const blog = await Blog.create({
    title,
    content,
    createdBy: req.user._id,
    coverImgUrl,
  });

  console.log(req.body);
  console.log(req.file);
  return res.redirect(`/blogs/${blog._id}`);
};

export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find({}).sort("createdAt", -1);
};


export const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  return res.render('blogSingle', {
    user: req.user,
    blog
  })
}
