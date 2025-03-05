import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../api/studentApi';

const CreateStudentForm = () => {
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        age: '',
        standard: '',
        division: '',
        marks: [{ subject: '', score: '' }]
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleMarksChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMarks = [...student.marks];
        updatedMarks[index][name] = value;
        setStudent({ ...student, marks: updatedMarks });
    };

    const addMarkField = () => {
        setStudent({ ...student, marks: [...student.marks, { subject: '', score: '' }] });
    };

    const removeMarkField = (index) => {
        const updatedMarks = student.marks.filter((_, i) => i !== index);
        setStudent({ ...student, marks: updatedMarks });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await createStudent(student);
            navigate('/view-students');
        } catch (err) {
            setError(err.message || 'An error occurred while creating the student.');
            setTimeout(() => {
                navigate('/view-students');
            }, 3000);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <Card className="p-4" style={{ maxWidth: '800px', width: '100%' }}>
                <Card.Body>
                    <h2 className="mb-4 text-center">Create Student</h2>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col xs={4} className="d-flex align-items-center">
                                <Form.Label className="mb-0">First Name</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={student.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={4} className="d-flex align-items-center">
                                <Form.Label className="mb-0">Last Name</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={student.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={4} className="d-flex align-items-center">
                                <Form.Label className="mb-0">Age</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Form.Control
                                    type="number"
                                    name="age"
                                    value={student.age}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={4} className="d-flex align-items-center">
                                <Form.Label className="mb-0">Standard</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Form.Control
                                    type="text"
                                    name="standard"
                                    value={student.standard}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={4} className="d-flex align-items-center">
                                <Form.Label className="mb-0">Division</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Form.Control
                                    type="text"
                                    name="division"
                                    value={student.division}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <h4 className="mt-4">Marks</h4>
                        {student.marks.map((mark, index) => (
                            <Row key={index} className="align-items-center mb-3">
                                <Col xs={4} className="d-flex align-items-center">
                                    <Form.Label className="mb-0">Subject </Form.Label>
                                </Col>
                                <Col xs={4}>
                                    <Form.Control
                                        type="text"
                                        name="subject"
                                        value={mark.subject}
                                        onChange={(e) => handleMarksChange(index, e)}
                                        required
                                    />
                                </Col>
                                <Col xs={3}>
                                    <Form.Control
                                        type="number"
                                        name="score"
                                        value={mark.score}
                                        onChange={(e) => handleMarksChange(index, e)}
                                        required
                                        placeholder="Score"
                                    />
                                </Col>
                                <Col xs={1}>
                                    {index > 0 && (
                                        <Button
                                            variant="danger"
                                            onClick={() => removeMarkField(index)}
                                            size="sm"
                                        >
                                            X
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        ))}

                        <Button
                            variant="secondary"
                            type="button"
                            onClick={addMarkField}
                            className="mb-3"
                        >
                            Add Subject
                        </Button>

                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CreateStudentForm;
