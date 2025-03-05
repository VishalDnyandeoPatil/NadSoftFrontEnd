import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:5000/studentManagement';

export const createStudent = async (studentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/createStudent`, studentData);
        Swal.fire('Success!', 'Student created successfully!', 'success');
        return response.data;
    } catch (error) {
        Swal.fire('Error!', 'Failed to create student.', 'error');
    }
};

export const getAllStudents = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}/getAllStudents?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching students', error);
    }
};

export const getStudentById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/getStudentById/${id}`);
        return response.data;
    } catch (error) {
        Swal.fire('Error!', 'Student not found.', 'error');
    }
};

export const updateStudent = async (id, studentData) => {
    try {
        const response = await axios.patch(`${BASE_URL}/updateStudent/${id}`, studentData);
        Swal.fire('Success!', 'Student updated successfully!', 'success');
        return response.data;
    } catch (error) {
        Swal.fire('Error!', 'Failed to update student.', 'error');
    }
};

export const deleteStudent = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/removeStudent/${id}`);
        Swal.fire('Deleted!', 'Student deleted successfully!', 'success');
    } catch (error) {
        Swal.fire('Error!', 'Failed to delete student.', 'error');
    }
};

export const deleteMark = async (markId) => {
    try {
        await axios.delete(`${BASE_URL}/removeMark/${markId}`);
        Swal.fire('Deleted!', 'Mark deleted successfully!', 'success');
    } catch (error) {
        Swal.fire('Error!', 'Failed to delete mark.', 'error');
    }
};
