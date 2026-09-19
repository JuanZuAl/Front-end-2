import axios from 'axios';

const kendUrl = "http://localhost:8080/api";


export const getStudents = async () => {
    const response = await axios.get(`${kendUrl}/students`); 
    return response.data;
};

export const getStudentById = async (studentId) => {
    const response = await axios.get(`${kendUrl}/students/${studentId}`);
    return response.data;
}
export const createStudent = async (newStudentData) => {
    const response = await axios.post(`${kendUrl}/students`, newStudentData);
    return response.data;
}

export const updateStudent = async (studentId, updatedData) => {
    const response = await axios.put(`${kendUrl}/students/${studentId}`, updatedData);
    return response.data;
}

export const deleteStudent = async (studentId) => {
    const response = await axios.delete(`${kendUrl}/students/${studentId}`);
    return response.data;
}
