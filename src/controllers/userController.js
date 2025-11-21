import {
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/userService.js";

export async function getAllUsersHandler(req, res, next) {
  try {
    const user = await getAllUsers();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function getUserByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUserHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const user = await updateUser(id, req.body.email, req.body.password);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
