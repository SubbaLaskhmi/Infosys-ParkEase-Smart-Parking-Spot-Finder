import api from "./api";

export const createBooking = (payload) => api.post("/bookings", payload);
export const getMyTickets = () => api.get("/bookings/my");
export const getMyHistory = () => api.get("/bookings/my");
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);
export const extendBooking = (id, extraHours) => api.put(`/bookings/${id}/extend`, { extraHours });
