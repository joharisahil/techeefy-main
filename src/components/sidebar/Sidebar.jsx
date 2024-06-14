import {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { SidebarContext } from "../../context/SidebarContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import { PiStudent, PiChalkboardTeacher, PiExam } from "react-icons/pi";
import {
  IoChevronBackOutline,
  IoChevronDown,
  IoCalendarOutline,
} from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";
import "./Sidebar.scss";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const [dashboard, setDashboard] = useState(false);
  const [academicSubList, setAcademicSubList] = useState(false);
  const [studentSubList, setStudentSubList] = useState(false);
  const [teacherSubList, setTeacherSubList] = useState(false);
  const [timeTableSubList, setTimeTableSubList] = useState(false);
  const [feeSubList, setFeeSubList] = useState(false);
  const [examSubList, setExamSubList] = useState(false);
  const [announcement, setAnnouncement] = useState(false);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useLayoutEffect(() => {
    const path = location.pathname;

    if (
      path.startsWith("/sections") ||
      path.startsWith("/streams") ||
      path.startsWith("/subjects") ||
      path.startsWith("/class") ||
      path.startsWith("/assignclasssubjects") ||
      path.startsWith("/assignclassteacher") ||
      path.startsWith("/assignsubjectteacher")
    ) {
      setAcademicSubList(true);
    }
    if (
      path.startsWith("/studentsadmission") ||
      path.startsWith("/studentdetail") ||
      path.startsWith("/addbulkdata")
    ) {
      setStudentSubList(true);
    }
    if (
      path.startsWith("/addnewteacher") ||
      path.startsWith("/teacherdetails")
    ) {
      setTeacherSubList(true);
    }
    if (
      path.startsWith("/createtimetable") ||
      path.startsWith("/classtimetable") ||
      path.startsWith("/teachertimetable")
    ) {
      setTimeTableSubList(true);
    }
    if (
      path.startsWith("/feestype") ||
      path.startsWith("/assignfeesclasses") ||
      path.startsWith("/feespaid") ||
      path.startsWith("/feestransactionlogs")
    ) {
      setFeeSubList(true);
    }
    if (
      path.startsWith("/createexam") ||
      path.startsWith("/createexamtimetable")
    ) {
      setExamSubList(true);
    }
    if (path.startsWith("/announcements")) {
      setAnnouncement(true);
    }
  }, []);

  // closing other fields when clicked on a field
  const handleSubListToggle = (
    currentSubListState,
    setCurrentSubList,
    ...otherSetters
  ) => {
    setCurrentSubList(!currentSubListState);
    otherSetters.forEach((setter) => setter(false));
  };

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">techeefy.com</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li
              className="menu-item"
              onClick={() =>
                handleSubListToggle(
                  dashboard,
                  setDashboard,
                  setAcademicSubList,
                  setStudentSubList,
                  setTeacherSubList,
                  setFeeSubList,
                  setExamSubList,
                  setTimeTableSubList
                )
              }
            >
              <NavLink to="/" activeclassname="active" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <div
                className="menu-link"
                onClick={() =>
                  handleSubListToggle(
                    academicSubList,
                    setAcademicSubList,
                    setStudentSubList,
                    setTeacherSubList,
                    setFeeSubList,
                    setExamSubList,
                    setTimeTableSubList
                  )
                }
              >
                <span className="menu-link-icon">
                  <MdOutlineBarChart size={20} />
                </span>
                <span className="menu-link-text">Academics</span>
                <span className="menu-link-chevron">
                  {academicSubList ? (
                    <IoChevronDown size={20} />
                  ) : (
                    <IoChevronBackOutline size={20} />
                  )}
                </span>
              </div>
              {academicSubList && (
                <ul>
                  <li className="menu-item text-hide">
                    <NavLink
                      to="/sections"
                      activeclassname="active"
                      className="menu-link"
                    >
                      <span className="menu-link-text sub-list">Section</span>
                    </NavLink>
                  </li>
                  <li className="menu-item text-hide">
                    <NavLink
                      to="/streams"
                      activeclassname="active"
                      className="menu-link"
                    >
                      <span className="menu-link-text sub-list">Stream</span>
                    </NavLink>
                  </li>
                  <li className="menu-item text-hide">
                    <NavLink
                      to="/subjects"
                      activeclassname="active"
                      className="menu-link"
                    >
                      <span className="menu-link-text sub-list">Subjects</span>
                    </NavLink>
                  </li>
                  <li className="menu-item text-hide">
                    <NavLink
                      to="/class"
                      activeclassname="active"
                      className="menu-link"
                    >
                      <span className="menu-link-text sub-list">Class</span>
                    </NavLink>
                  </li>
                  <li className="menu-item text-hide">
                    <NavLink
                      to="/assignclasssubjects"
                      activeclassname="active"
                      className="menu-link"
                    >
                      <span className="menu-link-text sub-list">
                        Assign Class Subjects
                      </span>
                    </NavLink>
                  </li>
                  <li className="menu-item text-hide">
                    <NavLink
                      to="/assignclassteacher"
                      activeclassname="active"
                      className="menu-link"
                    >
                      <span className="menu-link-text sub-list">
                        Assign Class Teacher
                      </span>
                    </NavLink>
                  </li>
                  <li className="menu-item text-hide">
                    <NavLink
                      to="/assignsubjectteacher"
                      activeclassname="active"
                      className="menu-link"
                    >
                      <span className="menu-link-text sub-list">
                        Assign Subject Teacher
                      </span>
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="menu-item">
              <div
                className="menu-link"
                onClick={() =>
                  handleSubListToggle(
                    studentSubList,
                    setStudentSubList,
                    setAcademicSubList,
                    setTeacherSubList,
                    setFeeSubList,
                    setExamSubList,
                    setTimeTableSubList
                  )
                }
              >
                <span className="menu-link-icon">
                  <PiStudent size={20} />
                </span>
                <span className="menu-link-text">Students</span>
                <span className="menu-link-chevron">
                  {studentSubList ? (
                    <IoChevronDown size={20} />
                  ) : (
                    <IoChevronBackOutline size={20} />
                  )}
                </span>
              </div>
              {studentSubList && (
                <ul>
                  <li className="menu-item text-hide">
                    <NavLink
                      to="/studentsadmission"
                      activeclassname="active"
                      className="menu-link"
                    >
                      <span className="menu-link-text sub-list">
                        Students Admission
                      </span>
                    </NavLink>
                  </li>
                  <li className="menu-item text-hide">
                    <NavLink
                      to="/studentdetails"
                      activeclassname="active"
                      className="menu-link"
                    >
                      <span className="menu-link-text sub-list">
                        Student Details
                      </span>
                    </NavLink>
                  </li>
                  <li className="menu-item text-hide">
                    <NavLink
                      to="/addbulkdata"
                      activeclassname="active"
                      className="menu-link"
                    >
                      <span className="menu-link-text sub-list">
                        Add Bulk Data
                      </span>
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="menu-item">
              <div
                className="menu-link"
                onClick={() =>
                  handleSubListToggle(
                    teacherSubList,
                    setTeacherSubList,
                    setStudentSubList,
                    setAcademicSubList,
                    setFeeSubList,
                    setExamSubList,
                    setTimeTableSubList
                  )
                }
              >
                <span className="menu-link-icon">
                  <PiChalkboardTeacher size={18} />
                </span>
                <span className="menu-link-text">Teachers</span>
                <span className="menu-link-chevron">
                  {teacherSubList ? (
                    <IoChevronDown size={20} />
                  ) : (
                    <IoChevronBackOutline size={20} />
                  )}
                </span>
              </div>
            </li>
            {teacherSubList && (
              <ul>
                <li className="menu-item text-hide">
                  <NavLink
                    to="/addnewteacher"
                    activeclassname="active"
                    className="menu-link"
                  >
                    <span className="menu-link-text sub-list">
                      Add New Teacher
                    </span>
                  </NavLink>
                </li>
                <li className="menu-item text-hide">
                  <NavLink
                    to="/teacherdetail"
                    activeclassname="active"
                    className="menu-link"
                  >
                    <span className="menu-link-text sub-list">
                      Teacher Details
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}
            <li className="menu-item">
              <div
                className="menu-link"
                onClick={() =>
                  handleSubListToggle(
                    timeTableSubList,
                    setTimeTableSubList,
                    setAcademicSubList,
                    setStudentSubList,
                    setTeacherSubList,
                    setFeeSubList,
                    setExamSubList
                  )
                }
              >
                <span className="menu-link-icon">
                  <IoCalendarOutline size={20} />
                </span>
                <span className="menu-link-text">Time Table</span>
                <span className="menu-link-chevron">
                  {timeTableSubList ? (
                    <IoChevronDown size={20} />
                  ) : (
                    <IoChevronBackOutline size={20} />
                  )}
                </span>
              </div>
            </li>
            {timeTableSubList && (
              <ul>
                <li className="menu-item text-hide">
                  <NavLink
                    to="/createtimetable"
                    activeclassname="active"
                    className="menu-link"
                  >
                    <span className="menu-link-text sub-list">
                      Create Timetable
                    </span>
                  </NavLink>
                </li>
                <li className="menu-item text-hide">
                  <NavLink
                    to="/classtimetable"
                    activeclassname="active"
                    className="menu-link"
                  >
                    <span className="menu-link-text sub-list">
                      Class Timetable
                    </span>
                  </NavLink>
                </li>
                <li className="menu-item text-hide">
                  <NavLink
                    to="/teachertimetable"
                    activeclassname="active"
                    className="menu-link"
                  >
                    <span className="menu-link-text sub-list">
                      Teacher Timetable
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}
            <li className="menu-item">
              <div
                className="menu-link"
                onClick={() =>
                  handleSubListToggle(
                    feeSubList,
                    setFeeSubList,
                    setStudentSubList,
                    setTeacherSubList,
                    setExamSubList,
                    setTimeTableSubList,
                    setAcademicSubList
                  )
                }
              >
                <span className="menu-link-icon">
                  <MdOutlineCurrencyExchange size={20} />
                </span>
                <span className="menu-link-text">Fees</span>
                <span className="menu-link-chevron">
                  {feeSubList ? (
                    <IoChevronDown size={20} />
                  ) : (
                    <IoChevronBackOutline size={20} />
                  )}
                </span>
              </div>
            </li>
            {feeSubList && (
              <ul>
                <li className="menu-item text-hide">
                  <NavLink
                    to="/feestype"
                    activeclassname="active"
                    className="menu-link"
                  >
                    <span className="menu-link-text sub-list">Fees type</span>
                  </NavLink>
                </li>
                <li className="menu-item text-hide">
                  <NavLink
                    to="/assignfeesclasses"
                    activeclassname="active"
                    className="menu-link"
                  >
                    <span className="menu-link-text sub-list">
                      Assign Fees Classes
                    </span>
                  </NavLink>
                </li>
                <li className="menu-item text-hide">
                  <NavLink
                    to="/feespaid"
                    activeclassname="active"
                    className="menu-link"
                  >
                    <span className="menu-link-text sub-list">Fees Paid</span>
                  </NavLink>
                </li>
                <li className="menu-item text-hide">
                  <NavLink
                    to="/feestransactionlogs"
                    activeclassname="active"
                    className="menu-link"
                  >
                    <span className="menu-link-text sub-list">
                      Fees Transaction Logs
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}
            <li className="menu-item">
              <div
                className="menu-link"
                onClick={() =>
                  handleSubListToggle(
                    examSubList,
                    setExamSubList,
                    setAcademicSubList,
                    setStudentSubList,
                    setTeacherSubList,
                    setFeeSubList,
                    setTimeTableSubList
                  )
                }
              >
                <span className="menu-link-icon">
                  <PiExam size={18} />
                </span>
                <span className="menu-link-text">Exam</span>
                <span className="menu-link-chevron">
                  {examSubList ? (
                    <IoChevronDown size={20} />
                  ) : (
                    <IoChevronBackOutline size={20} />
                  )}
                </span>
              </div>
            </li>
            {examSubList && (
              <ul>
                <li className="menu-item text-hide">
                  <NavLink
                    to="/createexam"
                    activeclassname="active"
                    className="menu-link"
                  >
                    <span className="menu-link-text sub-list">Create Exam</span>
                  </NavLink>
                </li>
                <li className="menu-item text-hide">
                  <NavLink
                    to="/createexamtimetable"
                    activeclassname="active"
                    className="menu-link"
                  >
                    <span className="menu-link-text sub-list">
                      Create Exam Timetable
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}
            <li
              className="menu-item"
              onClick={() =>
                handleSubListToggle(
                  announcement,
                  setAnnouncement,
                  setAcademicSubList,
                  setStudentSubList,
                  setTeacherSubList,
                  setFeeSubList,
                  setExamSubList,
                  setTimeTableSubList
                )
              }
            >
              <NavLink
                to="/announcements"
                activeclassname="active"
                className="menu-link"
              >
                <span className="menu-link-icon">
                  <TfiAnnouncement size={20} />
                </span>
                <span className="menu-link-text">Announcements</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <NavLink
                to="/settings"
                activeclassname="active"
                className="menu-link"
              >
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/logout"
                activeclassname="active"
                className="menu-link"
              >
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
