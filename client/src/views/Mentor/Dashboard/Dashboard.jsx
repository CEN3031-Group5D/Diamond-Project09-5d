import React, { useEffect, useState } from 'react';
import { getMentor, getClassrooms } from '../../../Utils/requests';
import { message } from 'antd';
import './Dashboard.less';
import '../../AdminSchoolView/AdminSchoolDashboard.less'
import DashboardDisplayCodeModal from './DashboardDisplayCodeModal';
import MentorSubHeader from '../../../components/MentorSubHeader/MentorSubHeader';
import NavBar from '../../../components/NavBar/NavBar';
import EditClassroomModal from '../../AdminSchoolView/EditClassroomModal';
import CreateClassroomModal from '../../AdminSchoolView/CreateClassroomModal';
import { useGlobalState } from '../../../Utils/userState';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const [value] = useGlobalState('currUser');
  const [deleteFlag, setDeleteFlag] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    let classroomIds = [];
    getMentor().then((res) => {
      if (res.data) {
        res.data.classrooms.forEach((classroom) => {
          classroomIds.push(classroom.id);
        });
        getClassrooms(classroomIds).then((classrooms) => {
          setClassrooms(classrooms);
        });
      } else {
        message.error(res.err);
        navigate('/teacherlogin');
      }
    });
  }, [deleteFlag]);

  const handleViewClassroom = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
  };

  if (value.name == 'Classroom Manager') {
    return (
      <div className='container nav-padding'>
      <NavBar />
      <div id='main-header'>Welcome {value.name}</div>
      <MentorSubHeader title={'Your Classrooms'}></MentorSubHeader>
      <div id='classrooms-container'>
        { /* Put create classroom modal here */}
        <CreateClassroomModal/>
        <div id='dashboard-card-container'>
          {classrooms.map((classroom) => (
            <div key={classroom.id} id='dashboard-class-card'>
              <div id='card-left-content-container'>
                <h1 id='card-title'>{classroom.name}</h1>
                <div id='admin-card-button-container' className='flex flex-row'>
                  <button onClick={() => handleViewClassroom(classroom.id)}>
                    View
                  </button>
                </div>
                <div id='admin-card-button-container' className ='flex flex-row'>
                  <EditClassroomModal
                    classroomId={classroom.id}
                    classroomName={classroom.name}
                    classroomCode={classroom.code}
                    deleteFlag={deleteFlag}
                    setDeleteFlag={setDeleteFlag}

                  />
              </div>
              </div>
              <div id='card-right-content-container'>
                <DashboardDisplayCodeModal code={classroom.code} />
                <div id='divider' />
                <div id='student-number-container'>
                  <h1 id='number'>{classroom.students.length}</h1>
                  <p id='label'>Students</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
    
  }


  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='main-header'>Welcome {value.name}</div>
      <MentorSubHeader title={'Your Classrooms'}></MentorSubHeader>
      <div id='classrooms-container'>
        <div id='dashboard-card-container'>
          {classrooms.map((classroom) => (
            <div key={classroom.id} id='dashboard-class-card'>
              <div id='card-left-content-container'>
                <h1 id='card-title'>{classroom.name}</h1>
                <div id='card-button-container' className='flex flex-row'>
                  <button onClick={() => handleViewClassroom(classroom.id)}>
                    View
                  </button>
                </div>
              </div>
              <div id='card-right-content-container'>
                <DashboardDisplayCodeModal code={classroom.code} />
                <div id='divider' />
                <div id='student-number-container'>
                  <h1 id='number'>{classroom.students.length}</h1>
                  <p id='label'>Students</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
