import React from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

class CoursesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      loading: true,
    };
  }

  async componentDidMount() {
    if (this.props.user.banned) {
      this.props.history.push("/auth/banned");
    }

    this.props.setBreadcrumbs([
      {
        text: "Courses",
        disabled: false,
        href: "courses",
      },
    ]);

    try {
      const response = await axios.get(
        "https://canvasapi.toddr.org/api/courses",
        {
          auth: {
            username: this.props.user.email,
            password: this.props.user.password,
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.setState({
        courses: response.data.data,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="courses">
        {!this.state.loading ? (
          <div>
            <h1>All Courses</h1>
            <div className="courseContainer">
              {this.state.courses.map((item) => (
                <CourseCard key={item.id} course={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="loading">
            <v-progress-circular
              size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
        )}
      </div>
    );
  }
}

export default CoursesView;
