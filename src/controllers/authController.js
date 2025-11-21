import { signUp } from "../services/authService.js";

export async function signUpHandler(req, res) {
  const { email, password } = req.body;
  const newUser = await signUp(email, password);
  res
    .status(201)
    .json({ message: `New user created with id of ${newUser.id}` });
}
