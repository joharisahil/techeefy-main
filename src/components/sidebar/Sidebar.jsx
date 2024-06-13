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
  const [dashboard, setDashboard] = useState(false);
  const [announcement, setAnnouncement] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("selectedTab") || "Dashboard"
  );

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

  // Storing the selected state so that should not change on refresh of page
  useEffect(() => {
    const storedTab = localStorage.getItem("selectedTab");
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);

  // Store the selected tab in local storage whenever it changes
  const handleTabSelection = (tab) => {
    setSelectedTab(tab);
    localStorage.setItem("selectedTab", tab);
  };

  // Store the selectedTab for not closing the nested list if the user has refreshed the page
  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);

    // Open corresponding sublist if the selected tab is in a nested list
    if (
      [
        "Section",
        "Stream",
        "Subjects",
        "Class",
        "Assign Class Subjects",
        "Assign Class Teacher",
        "Assign Subject Teacher",
      ].includes(selectedTab)
    ) {
      setAcademicSubList(true);
    }
    if (
      ["Students Admission", "Student Details", "Add Bulk Data"].includes(
        selectedTab
      )
    ) {
      setStudentSubList(true);
    }
    if (["Add New Teacher", "Teacher Details"].includes(selectedTab)) {
      setTeacherSubList(true);
    }
    if (
      ["Create Timetable", "Class Timetable", "Teacher Timetable"].includes(
        selectedTab
      )
    ) {
      setTimeTableSubList(true);
    }
    if (
      [
        "Fees type",
        "Assign Fees Classes",
        "Fees Paid",
        "Fees Transaction Logs",
      ].includes(selectedTab)
    ) {
      setFeeSubList(true);
    }
    if (["Create Exam", "Create Exam Timetable"].includes(selectedTab)) {
      setExamSubList(true);
    }
  }, [selectedTab]);

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
              onClick={() => {
                handleTabSelection("Dashboard");
                handleSubListToggle(
                  dashboard,
                  setDashboard,
                  setAcademicSubList,
                  setStudentSubList,
                  setTeacherSubList,
                  setFeeSubList,
                  setExamSubList,
                  setTimeTableSubList
                );
              }}
            >
              <Link
                to="/"
                className={`menu-link ${
                  selectedTab === "Dashboard" && "active"
                }`}
              >
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li
              className="menu-item"
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
              <Link className="menu-link">
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
                <li
                  className="menu-item text-hide"
                  onClick={() => {
                    handleTabSelection("Section");
                  }}
                >
                  <Link
                    to="/sections"
                    className={`menu-link ${
                      selectedTab === "Section" && "active"
                    }`}
                  >
                    <span className="menu-link-text sub-list">Section</span>
                  </Link>
                </li>
                <li
                  className="menu-item text-hide"
                  onClick={() => {
                    handleTabSelection("Stream");
                  }}
                >
                  <Link
                    to="/streams"
                    className={`menu-link ${
                      selectedTab === "Stream" && "active"
                    }`}
                  >
                    <span className="menu-link-text sub-list">Stream</span>
                  </Link>
                </li>
                <li
                  className="menu-item text-hide"
                  onClick={() => {
                    handleTabSelection("Subjects");
                  }}
                >
                  <Link
                    to="/subjects"
                    className={`menu-link ${
                      selectedTab === "Subjects" && "active"
                    }`}
                  >
                    <span className="menu-link-text sub-list">Subjects</span>
                  </Link>
                </li>
                <li
                  className="menu-item text-hide"
                  onClick={() => {
                    handleTabSelection("Class");
                  }}
                >
                  <Link
                    to="/class"
                    className={`menu-link ${
                      selectedTab === "Class" && "active"
                    }`}
                  >
                    <span className="menu-link-text sub-list">Class</span>
                  </Link>
                </li>
                <li
                  className="menu-item text-hide"
                  onClick={() => {
                    handleTabSelection("Assign Class Subjects");
                  }}
                >
                  <Link
                    to="/assignclasssubjects"
                    className={`menu-link ${
                      selectedTab === "Assign Class Subjects" && "active"
                    }`}
                  >
                    <span className="menu-link-text sub-list">
                      Assign Class Subjects
                    </span>
                  </Link>
                </li>
                <li
                  className="menu-item text-hide"
                  onClick={() => {
                    handleTabSelection("Assign Class Teacher");
                  }}
                >
                  <Link
                    to="/assignclassteacher"
                    className={`menu-link ${
                      selectedTab === "Assign Class Teacher" && "active"
                    }`}
                  >
                    <span className="menu-link-text sub-list">
                      Assign Class Teacher
                    </span>
                  </Link>
                </li>
                <li
                  className="menu-item text-hide"
                  onClick={() => {
                    handleTabSelection("Assign Subject Teacher");
                  }}
                >
                  <Link
                    to="/assignsubjectteacher"
                    className={`menu-link ${
                      selectedTab === "Assign Subject Teacher" && "active"
                    }`}
                  >
                    <span className="menu-link-text sub-list">
                      Assign Subject Teacher
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li
              className="menu-item"
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
              onClick={() =>
                handleSubListToggle(
                  teacherSubList,
                  setTeacherSubList,
                  setAcademicSubList,
                  setStudentSubList,
                  setFeeSubList,
                  setExamSubList,
                  setTimeTableSubList
                )
              }
            >
              <Link to="/" className="menu-link">
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
