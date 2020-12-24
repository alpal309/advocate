import React, {useState, useContext} from 'react';
import DashCard from "components/molecules/DashCard";
import FilterableTable from 'components/molecules/FilterableTable';
import {crudFetch, editDeleteIcons} from 'utils/functions/functions';
import Modal from 'components/molecules/Modal';
import ModalBody from 'components/molecules/ModalBody';
import TableAccordionGroup from 'components/molecules/TableAccordionGroup';
import {FaCheck as CheckIcon, FaPlus as PlusIcon} from "react-icons/fa";
import ClassroomForm from 'components/molecules/ClassroomForm';
import Button from 'components/atoms/Button';
import { BAD_REQUEST_STATUS, JSON_HEADER } from 'utils/constants';
import Section from 'components/atoms/Section';
import Box from 'components/atoms/Box';
import {TeacherContext} from "utils/hooks/hooks"

const Classroom = ({/* teacher, updateTeacher, */ logout, handleToaster}) => {
    const {teacher, setTeacher} = useContext(TeacherContext);

    const classrooms = teacher.classrooms;

    const [selectedClassroom, setSelectedClassroom] = useState({});
    const [modalBody, setModalBody] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const modalVisible = modalBody !== "";
    const modalSize = modalBody === "edit" || modalBody === "create";

    const closeModal = () => { 
        setModalBody("");
    };

    const handleCrudError = (body) => {
        setFormErrors(JSON.parse(body));
    };
    
    const renderDeleteClassroomModalBody = () => {


        return (
            <ModalBody
                header={`Delete ${selectedClassroom.className}?`}
                confirmCallback={executeClassroomDeletion}
                cancelCallback={closeModal}
            >
                <p>
                    This will delete all students and all goals, benchmarks, trials, and tracking associated with those students.
                    This action cannot be undone.
                </p>
            </ModalBody>
        )
    };

    const executeClassroomDeletion = (body) => {
        crudFetch(
            "deleteclassroom", 
            "DELETE",
            JSON.stringify({classroomId: selectedClassroom.id}), 
            (body) => crudOperationSuccessful(body, `Successfully deleted ${selectedClassroom.className}`), 
            handleCrudError, 
            logout, 
            JSON_HEADER
        )
    };

    const executeClassroomUpdate = (students, className, createClassroom, setFormErrors) => {
        crudFetch(
            "updateclassroom", 
            "PUT",
            JSON.stringify(selectedClassroom),
            (body) => crudOperationSuccessful(body, `Successfully updated ${selectedClassroom.className}`), 
            handleCrudError,
            logout,
            JSON_HEADER
            )
    };

    const crudOperationSuccessful = (body, message) => {
        handleToaster(<p>{<CheckIcon className="i-right"/>}{message}</p>);
        setTeacher(body);
    };

    const updateClassroomName = (name) => {
        setSelectedClassroom(previous => ({...previous, className: name}));
    };

    const updateClassroomStudents = (studentArray) => {
        setSelectedClassroom(previous => ({...previous, students: [...studentArray]}))
    };

    const renderEditClassroomModalBody = () => {
        
        return (
            <ModalBody
                header={`Edit ${selectedClassroom.className}`}
                hideButtons
            >
                <ClassroomForm
                    editingClassName={selectedClassroom.className}
                    updateEditingClassName={updateClassroomName}
                    editingStudents={selectedClassroom.students}
                    updateEditingStudents={updateClassroomStudents}
                    teacherId={teacher.id}
                    confirmCallback={executeClassroomUpdate}
                    cancelCallback={closeModal}
                    editingErrors={formErrors}
                />
            </ModalBody>
        )
    };

    const handleIconClick = (action, index) => {
        setSelectedClassroom(classrooms[index]);
        setModalBody(action);
    };

    const renderCreateClassroomModalBody = () => {
        return (
            <ModalBody
                header={"Create Classroom"}
                hideButtons
            >
                <ClassroomForm
                    teacherId={teacher.id}
                    logout={logout}
                    confirmCallback={confirmCreateClassroomCallback}
                    cancelCallback={closeModal}
                />
            </ModalBody>
        );
    };

    const confirmCreateClassroomCallback = async (students, className, createClassroom, setFormErrors) => {
        await createClassroom()
        .then(([ok, body, status]) => {
            if(ok) {
                crudOperationSuccessful(body, `Successfully created ${className}!`)
            } 
            else if(status === BAD_REQUEST_STATUS)
                setFormErrors(JSON.parse(body));
            else
                logout();
        });
    };

    const determineModalBody = () => { 
        switch(modalBody){
            case "create":
                return renderCreateClassroomModalBody();
            case "edit":
                return renderEditClassroomModalBody();
            case "delete":
                return renderDeleteClassroomModalBody();
            default: return <></>;
        }
    };

    const renderAccordion = () => {
        return (
            classrooms.length > 0
                ? <TableAccordionGroup
                    accordionHeaders={classrooms.map(cr => cr.className)}
                    accordionIcons={editDeleteIcons()}
                    accordionIconCallback={handleIconClick}
                  >
                    {
                        classrooms.map((cr, ind) => {
                                return (
                                    cr.students.length
                                    ? <FilterableTable
                                        key={`classroomtable${ind}`}
                                        headers={["Name", "Goal Focus"]}
                                        data={cr.students.map(stu => 
                                            ({
                                               name: stu.name,
                                               goalFocus: stu.goalFocus
                                           })
                                       )}
                                    />
                                    : <Box key={`noStudentsBox-${ind}`} text="No students, click the edit button to add students."/>
                                )
                            }
                        )
                    }
                  </TableAccordionGroup>
                : <></>
        )
    };

    return (
        <DashCard header={"Classrooms"}>
            <Section>
                <Button
                    text="Create new class"
                    icon={<PlusIcon className="i-right"/>}
                    onClick={() => setModalBody("create")}
                />
            </Section>
            <Modal closeModal={closeModal} displayed={modalVisible} large={modalSize}>
                {determineModalBody(modalBody)}
            </Modal>
            {renderAccordion()}
        </DashCard>
    )
}

export default Classroom;
