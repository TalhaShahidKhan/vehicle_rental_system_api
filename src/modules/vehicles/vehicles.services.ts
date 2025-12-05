import { pool } from "../../config/db";

const dbCreateVehicle = async (payload: any) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) 
     VALUES($1, $2, $3, $4, $5) 
     RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result.rows[0];
};

const dbGetAllVehicles = async () => {
  const result = await pool.query(
    `SELECT id, vehicle_name, type, registration_number, daily_rent_price, availability_status FROM vehicles`
  );
  return result.rows;
};

const dbGetVehicleById = async (id: string) => {
  const result = await pool.query(
    `SELECT id, vehicle_name, type, registration_number, daily_rent_price, availability_status FROM vehicles WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

const dbUpdateVehicle = async (id: string, payload: any) => {
  // Dynamic update query
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (payload.vehicle_name) {
    fields.push(`vehicle_name = $${idx++}`);
    values.push(payload.vehicle_name);
  }
  if (payload.type) {
    fields.push(`type = $${idx++}`);
    values.push(payload.type);
  }
  if (payload.registration_number) {
    fields.push(`registration_number = $${idx++}`);
    values.push(payload.registration_number);
  }
  if (payload.daily_rent_price) {
    fields.push(`daily_rent_price = $${idx++}`);
    values.push(payload.daily_rent_price);
  }
  if (payload.availability_status) {
    fields.push(`availability_status = $${idx++}`);
    values.push(payload.availability_status);
  }

  if (fields.length === 0) return null; // Or fetch and return existing

  fields.push(`updated_at = NOW()`);

  values.push(id);
  const query = `UPDATE vehicles SET ${fields.join(
    ", "
  )} WHERE id = $${idx} RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status`;

  const result = await pool.query(query, values);
  return result.rows[0];
};

const dbDeleteVehicle = async (id: string) => {
  // Check for active bookings first
  const activeBookings = await pool.query(
    `SELECT * FROM bookings WHERE vehicle_id = $1 AND status = 'active'`,
    [id]
  );

  if (activeBookings.rows.length > 0) {
    throw new Error("Cannot delete vehicle with active bookings");
  }

  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
  return result;
};

export const vehiclesServices = {
  dbCreateVehicle,
  dbGetAllVehicles,
  dbGetVehicleById,
  dbUpdateVehicle,
  dbDeleteVehicle,
};
