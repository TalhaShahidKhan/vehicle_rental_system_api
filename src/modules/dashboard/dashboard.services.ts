import { pool } from "../../config/db";

const dbGetDashboardStats = async () => {
  const result = await pool.query(`
    SELECT 
      (SELECT COUNT(*) FROM users) as total_users,
      (SELECT COUNT(*) FROM vehicles WHERE availability_status = 'available') as active_vehicles,
      (SELECT COUNT(*) FROM bookings) as total_bookings,
      (SELECT COALESCE(SUM(total_price), 0) FROM bookings WHERE status != 'cancelled') as total_revenue,
      (
        SELECT json_agg(activity) FROM (
          SELECT 'New booking' as type, b.created_at, u.name as customer_name, v.vehicle_name
          FROM bookings b
          JOIN users u ON b.customer_id = u.id
          JOIN vehicles v ON b.vehicle_id = v.id
          ORDER BY b.created_at DESC
          LIMIT 5
        ) activity
      ) as recent_activities
  `);

  return result.rows[0];
};

export const dashboardServices = {
  dbGetDashboardStats,
};
