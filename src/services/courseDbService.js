import axios from 'axios';

const kendUrl = "http://localhost:8080/api";

export const getCourses = async () => {
    const response = await axios.get(`${kendUrl}/courses`);
    return response.data;
}

export const getCourseById = async (courseId) => {
    const response = await axios.get(`${kendUrl}/courses/${courseId}`);
    return response.data;
}

export const createCourse = async (newCourseData) => {
    const response = await axios.post(`${kendUrl}/courses`, newCourseData);
    return response.data;
}

export const updateCourse = async (courseId, updatedData) => {
    const response = await axios.put(`${kendUrl}/courses/${courseId}`, updatedData);
    return response.data;
}

export const deleteCourse = async (courseId) => {
    const response = await axios.delete(`${kendUrl}/courses/${courseId}`);
    return response.data;
}