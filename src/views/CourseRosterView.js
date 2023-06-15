import React from "react";
import axios from "axios";
import UserCard from "../components/UserCard";

class CourseView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      course: {
        name: "Unknown Course",
      },
      data: [],
    };
  }

  async componentDidMount() {
    if (this.props.user.banned) {
      this.props.history.push("/auth/banned");
    }
    try {
      const response = await axios.get(
        `https://canvasapi.toddr.org/api/courses/${this.props.match.params.id}`,
        {
          auth: {
            username: this.props.user.email,
            password: this.props.user.password,
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.setState({ course: response.data.data });
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.get(
        `https://canvasapi.toddr.org/api/courses/${this.props.match.params.id}/users`,
        {
          auth: {
            username: this.props.user.email,
            password: this.props.user.password,
          },
        }
      );
      console.log("Response: ", response.data.data);
      const assignments = response.data.data;
      this.setState({ data: assignments });
    } catch (error) {
      console.error(error);
    }

    this.props.setBreadcrumbs([
      {
        text: "Courses",
        disabled: false,
        href: "/courses",
        exact: true,
      },
      {
        text: this.state.course.name,
        disabled: false,
        href: `/course/${this.props.match.params.id}`,
        exact: true,
      },
      {
        text: "Roster",
        disabled: false,
        href: `/course/${this.props.match.params.id}/roster`,
        exact: true,
      },
    ]);

    this.setState({ loading: false });
  }

  render() {
    return (
      <div className="courseViewContainer">
        {!this.state.loading && (
          <v-card dark>
            <v-toolbar>
              <v-toolbar-title>{this.state.course.name} Roster</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn flat to={`/course/${this.props.match.params.id}`}>
                <v-icon className="iconButtonPadding">mdi-arrow-right</v-icon>
                Back to Course
              </v-btn>
            </v-toolbar>
            <div className="assignmentContainer">
              {this.state.data.map((item) => (
                <div
                  key={JSON.stringify(item)}
                  className="assignmentCardContainer"
                >
                  <UserCard user={item} style={{ paddingBottom: "10px" }} />
                </div>
              ))}
            </div>
          </v-card>
        )}

        {this.state.loading && (
          <div className="loading">
            <v-progress-circular
              size={50}
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
        )}
      </div>
    );
  }
}

export default CourseView;
