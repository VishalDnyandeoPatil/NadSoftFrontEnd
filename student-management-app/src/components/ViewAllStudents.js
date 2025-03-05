import React, { useEffect, useState, useCallback } from 'react';
import { getAllStudents, deleteStudent } from '../api/studentApi';
import { Button, Table, Pagination, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ViewAllStudents = () => {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10); 
    const navigate = useNavigate();

    const fetchStudents = useCallback(async (currentPage = 1, limit = pageSize) => {
        try {
            const data = await getAllStudents(currentPage, limit);
            if (Array.isArray(data?.getAllStudentData)) {
                setStudents(data.getAllStudentData);
                setTotalPages(data.pagination.totalPage);
                setPage(currentPage);
            } else {
                setStudents([]);
                console.error('Invalid data format from API:', data);
            }
        } catch (error) {
            console.error('Failed to fetch students:', error);
            setStudents([]);
        }
    }, [pageSize]);

    useEffect(() => {
        fetchStudents(page, pageSize);
    }, [fetchStudents, page, pageSize]);

    const handleDelete = async (id) => {
        await deleteStudent(id);
        fetchStudents(page, pageSize);
    };

    const handleView = (id) => {
        navigate(`/student/${id}`);
    };

    const handleCreate = () => {
        navigate('/student-creat');
    };

    const handleUpdate = (id) => {
        navigate(`/student/update/${id}`);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setPage(1); 
    };

    return (
        <div className="container mt-4">
            <h2>All Students</h2>
            <div className="mb-3 d-flex justify-content-between align-items-center">
    <Button
        variant="primary"
        onClick={handleCreate}
        className="ms-auto"
    >
        Create Student
    </Button>
</div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Full Name</th>
                        <th>Standard</th>
                        <th>Division</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{(page - 1) * pageSize + index + 1}</td>
                            <td>{`${student.firstName} ${student.lastName}`}</td>
                            <td>{student.standard}</td>
                            <td>{student.division}</td>
                            <td>
                                <Button
                                    variant="info"
                                    onClick={() => handleView(student.id)}
                                    className="me-2"
                                >
                                    View
                                </Button>
                                <Button
                                    variant="warning"
                                    onClick={() => handleUpdate(student.id)}
                                    className="me-2"
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(student.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-3">
    <Form.Select
        value={pageSize}
        onChange={handlePageSizeChange}
        style={{ width: '150px' }}
    >
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="20">20 per page</option>
        <option value="50">50 per page</option>
        <option value="100">100 per page</option>
    </Form.Select>

    <Pagination className="mb-0">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 1} />
        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
        {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
                key={index + 1}
                active={index + 1 === page}
                onClick={() => handlePageChange(index + 1)}
            >
                {index + 1}
            </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} />
    </Pagination>
</div>
        </div>
    );
};

export default ViewAllStudents;
