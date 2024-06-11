import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
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
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const [academicSubList, setAcademicSubList] = useState(false);
  const [studentSubList, setStudentSubList] = useState(false);
  const [teacherSubList, setTeacherSubList] = useState(false);
  const [timeTableSubList, setTimeTableSubList] = useState(false);
  const [feeSubList, setFeeSubList] = useState(false);
  const [examSubList, setExamSubList] = useState(false);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
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
            <li className="menu-item">
              <Link to="/" className="menu-link active">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li
              className="menu-item"
              onClick={() => {
                setAcademicSubList(!academicSubList);
                setStudentSubList(false);
                setTeacherSubList(false);
                setFeeSubList(false);
                setExamSubList(false);
                setTimeTableSubList(false);
              }}
            >
              <Link to="/" className="menu-link">
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
              </Link>
            </li>
            {academicSubList && (
              <>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">Section</span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">Stream</span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">Subjects</span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">Class</span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Assign Class Subjects
                    </span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Assign Class Teacher
                    </span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Assign Subject Teacher
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li
              className="menu-item"
              onClick={() => {
                setStudentSubList(!studentSubList);
                setAcademicSubList(false);
                setTeacherSubList(false);
                setFeeSubList(false);
                setExamSubList(false);
                setTimeTableSubList(false);
              }}
            >
              <Link to="/" className="menu-link">
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
              </Link>
            </li>
            {studentSubList && (
              <>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Students Admission
                    </span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Student Details
                    </span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Add Bulk Data
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li
              className="menu-item"
              onClick={() => {
                setTeacherSubList(!teacherSubList);
                setAcademicSubList(false);
                setStudentSubList(false);
                setFeeSubList(false);
                setExamSubList(false);
                setTimeTableSubList(false);
              }}
            >
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <PiChalkboardTeacher size={18} />
                </span>
                <span className="menu-link-text">Teacher</span>
                <span className="menu-link-chevron">
                  {teacherSubList ? (
                    <IoChevronDown size={20} />
                  ) : (
                    <IoChevronBackOutline size={20} />
                  )}
                </span>
              </Link>
            </li>
            {teacherSubList && (
              <>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Add New Teacher
                    </span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Teacher Details
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li
              className="menu-item"
              onClick={() => {
                setTimeTableSubList(!timeTableSubList);
                setAcademicSubList(false);
                setStudentSubList(false);
                setTeacherSubList(false);
                setFeeSubList(false);
                setExamSubList(false);
              }}
            >
              <Link to="/" className="menu-link">
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
              </Link>
            </li>
            {timeTableSubList && (
              <>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Create Timetable
                    </span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Class Timetable
                    </span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Teacher Timetable
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li
              className="menu-item"
              onClick={() => {
                setFeeSubList(!feeSubList);
                setStudentSubList(false);
                setTeacherSubList(false);
                setExamSubList(false);
                setTimeTableSubList(false);
                setAcademicSubList(false);
              }}
            >
              <Link to="/" className="menu-link">
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
              </Link>
            </li>
            {feeSubList && (
              <>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">Fees type</span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Assign Fees Classes
                    </span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">Fees Paid</span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Fees Transaction Logs
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li
              className="menu-item"
              onClick={() => {
                setExamSubList(!examSubList);
                setAcademicSubList(false);
                setStudentSubList(false);
                setTeacherSubList(false);
                setFeeSubList(false);
                setTimeTableSubList(false);
              }}
            >
              <Link to="/" className="menu-link">
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
              </Link>
            </li>
            {examSubList && (
              <>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">Create Exam</span>
                  </Link>
                </li>
                <li className="menu-item text-hide">
                  <Link to="/" className="menu-link">
                    <span className="menu-link-text sub-list">
                      Create Exam Timetable
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <TfiAnnouncement size={20} />
                </span>
                <span className="menu-link-text">Announcements</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
