import axios from 'axios';

const kendUrl = "http://localhost:8080/api";

export const getEnrollments = async () => {
    const response = await axios.get(`${kendUrl}/enrollments`);
    return response.data;
}

export const getEnrollmentById = async (enrollmentId) => {
    const response = await axios.get(`${kendUrl}/enrollments/${enrollmentId}`);
    return response.data;
}

export const createEnrollment = async (newEnrollmentData) => {
    const response = await axios.post(`${kendUrl}/enrollments`, newEnrollmentData);
    return response.data;
}

export const updateEnrollment = async (enrollmentId, updatedData) => {
    const response = await axios.put(`${kendUrl}/enrollments/${enrollmentId}`, updatedData);
    return response.data;
}

export const deleteEnrollment = async (enrollmentId) => {
    const response = await axios.delete(`${kendUrl}/enrollments/${enrollmentId}`);
    return response.data;
}