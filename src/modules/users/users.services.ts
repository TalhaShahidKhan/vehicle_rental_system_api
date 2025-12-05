import bcrypt from "bcrypt";
import { pool } from "../../config/db";

const dbUserCreate = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`,
    [name, email, hashedPassword, phone, role]
  );
  return result.rows[0];
};

const dbUserUpdate = async (
  id: string,
  name: string,
  email: string,
  phone: string,
  role?: string
) => {
  const result = await pool.query(
    `UPDATE users SET name = $1, email = $2, phone = $3, role = COALESCE($4, role), updated_at = NOW() WHERE id = $5 RETURNING id, name, email, phone, role`,
    [name, email, phone, role, id]
  );
  return result.rows[0];
};

const dbUserDelete = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING id`,
    [id]
  );
  return result.rows[0];
};

const dbUserGetAll = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users`
  );
  return result.rows;
};

const dbUserGetById = async (id: string) => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

export const usersServices = {
  dbUserCreate,
  dbUserUpdate,
  dbUserDelete,
  dbUserGetAll,
  dbUserGetById,
};
