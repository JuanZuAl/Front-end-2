function SideBar() {
    return (
        <div className="sidebar">
            <h2>SideBar</h2>
            <ul>
                <li><a href="/dashboard" margin="0" color="black" center>Dashboard</a></li>
                <li><a href="/students" margin="0" color="red" center>Students</a></li>
                <li><a href="/courses" margin="0" color="blue" center>Courses</a></li>
                <li><a href="/enrollments" margin="0" color="black" center>Enrollments</a></li>
            </ul>
        </div>
    );
}
export default SideBar;