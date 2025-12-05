import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../config/db";
const dbUserLogin = async (email: string, password: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rows.length == 0) {
    return null;
  }
  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return false;
  }
  const token = jwt.sign(
    { name: user.name, email: user.email, id: user.id, role: user.role },
    config.jwtSecret as string,
    { expiresIn: "1h" }
  );
  return { token, user };
};

export const authService = {
  dbUserLogin,
};
