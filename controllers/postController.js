//Importamos mongoose y el modelo de Post
import mongoose from "mongoose";
import Post from "../models/post.js";

//Controlador para buscar posts por tag
export const getPostsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const posts = await Post.find({ tags: tag });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar posts por tag", error: error.message });
  }
};

//Controlador para buscar posts por autor
export const getPostsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const posts = await Post.find({ author: authorId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar posts por autor", error: error.message });
  }
};

//Controlador para añadir un comentario a un post
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, body } = req.body;
    const comment = {
      username,
      body,
      date: new Date()
    };
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error al añadir el comentario", error: error.message });
  }
};

//Controlador para crear un nuevo post
export const createPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const newPost = new Post({ title, content, author, tags });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post", error: error.message });
  }
};

//Controlador para obtener todos los posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts", error: error.message });
  }
};

//Controlador para obtener un post por su ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);
    const result = await Post.aggregate([
      { $match: { _id: objectId } },
      {
        $lookup: {
          from: "users", // nombre de la colección de usuarios
          localField: "author",
          foreignField: "_id",
          as: "detalles_autor"
        }
      },
      { $unwind: "$detalles_autor" }
    ]);
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el post", error: error.message });
  }
};

//Controlador para actualizar un post por su ID
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el post", error: error.message });
  }
};

//Controlador para eliminar un post por su ID
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el post", error: error.message });
  }
};