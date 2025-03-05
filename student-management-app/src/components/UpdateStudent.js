import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById, updateStudent, deleteMark } from '../api/studentApi';
import { Form, Button, Modal } from 'react-bootstrap';

const UpdateStudent = () => {
    const { id } = useParams(); 
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        standard: '',
        division: '',
        marks: [],
    });
    const [showModal, setShowModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            const data = await getStudentById(id);
            if (data) {
                setStudent(data);
            }
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleMarksChange = (index, field, value) => {
        const updatedMarks = [...student.marks];
        updatedMarks[index][field] = value;
        setStudent((prev) => ({ ...prev, marks: updatedMarks }));
    };

    const handleAddSubject = () => {
        setStudent((prev) => ({
            ...prev,
            marks: [...prev.marks, { subject: '', score: '' }],
        }));
    };

    const handleRemoveSubject = async (index, markId) => {
        if (markId) {
            await deleteMark(markId);
        }
        const updatedMarks = student.marks.filter((_, i) => i !== index);
        setStudent((prev) => ({ ...prev, marks: updatedMarks }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true); 
    };

    const handleConfirmUpdate = async () => {
        await updateStudent(id, student);
        setConfirmationMessage('Student data updated successfully');
        setShowModal(false);
        setTimeout(() => navigate('/view-students'), 2000);
    };

    const handleCancelUpdate = () => {
        setConfirmationMessage('Student data not updated');
        setShowModal(false);
        setTimeout(() => navigate('/view-students'), 2000);
    };

    return (
        <div className="container mt-4">
            <h2>Update Student</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={student.firstName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={student.lastName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="standard">
                    <Form.Label>Standard</Form.Label>
                    <Form.Control
                        type="text"
                        name="standard"
                        value={student.standard}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="division">
                    <Form.Label>Division</Form.Label>
                    <Form.Control
                        type="text"
                        name="division"
                        value={student.division}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <h4>Marks</h4>
                {student.marks.map((mark, index) => (
                    <div key={index} className="mb-3">
                        <Form.Group controlId={`subject-${index}`}>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                value={mark.subject}
                                onChange={(e) =>
                                    handleMarksChange(index, 'subject', e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId={`score-${index}`}>
                            <Form.Label>Score</Form.Label>
                            <Form.Control
                                type="number"
                                value={mark.score}
                                onChange={(e) =>
                                    handleMarksChange(index, 'score', e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        {student.marks.length > 1 && (
                            <Button
                                variant="danger"
                                onClick={() => handleRemoveSubject(index, mark.id)}
                                className="mt-2"
                            >
                                Remove Subject
                            </Button>
                        )}
                    </div>
                ))}

                <Button
                    variant="secondary"
                    onClick={handleAddSubject}
                    className="mt-3 mb-3"
                >
                    Add Subject
                </Button>

                <div className="d-flex justify-content-between">
                    <Button
                        variant="primary"
                        type="submit"
                        className="mt-3"
                    >
                        Update Student
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => navigate('/view-students')}
                        className="mt-3"
                    >
                        Back
                    </Button>
                </div>
            </Form>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to update the student data?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelUpdate}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUpdate}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            {confirmationMessage && (
                <div className="alert alert-info mt-3" role="alert">
                    {confirmationMessage}
                </div>
            )}
        </div>
    );
};

export default UpdateStudent;
