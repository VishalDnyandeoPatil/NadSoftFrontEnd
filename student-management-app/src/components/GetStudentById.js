import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentById } from '../api/studentApi';
import { Form, Card, Row, Col, Button } from 'react-bootstrap';

const GetStudentById = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await getStudentById(id);
                setStudent(data);
            } catch (error) {
                console.error('Failed to fetch student data:', error);
            }
        };

        if (id) fetchStudent();
    }, [id]);

    if (!student) {
        return <p>Loading...</p>;
    }

    const fullName = `${student.firstName} ${student.lastName}`;

    return (
        <div className="container mt-4">
            <h2>Student Details</h2>
            <Card className="p-4">
                <Form>
                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Label>First Name:</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control type="text" value={student.firstName} readOnly />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Label>Last Name:</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control type="text" value={student.lastName} readOnly />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Label>Full Name:</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control type="text" value={fullName} readOnly />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Label>Age:</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control type="number" value={student.age} readOnly />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Label>Standard:</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control type="text" value={student.standard} readOnly />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Label>Division:</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control type="text" value={student.division} readOnly />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Label>Marks:</Form.Label>
                        </Col>
                        <Col md={9}>
                            {student.marks && student.marks.length > 0 ? (
                                student.marks.map((mark) => (
                                    <Row key={mark.id} className="mb-2">
                                        <Col md={6}>
                                            <Form.Label>Subject: {mark.subject}</Form.Label>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Control
                                                type="text"
                                                value={`Score: ${mark.score}`}
                                                readOnly
                                            />
                                        </Col>
                                    </Row>
                                ))
                            ) : (
                                <p>No Marks Available</p>
                            )}
                        </Col>
                    </Row>
                </Form>

                <div className="d-flex justify-content-end mt-4">
                    <Button variant="secondary" onClick={() => navigate('/view-students')}>
                        Back
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default GetStudentById;
