import React from "react";
import axios from "axios";
import AssignmentCard from "../components/AssignmentCard";
import AnnouncementCard from "../components/AnnouncementCard";

class CourseView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      course: {
        name: "Unknown Course",
      },
      filter: {
        assignments: true,
        announcements: true,
      },
      data: [],
      assignments: [],
      announcements: [],
    };
  }

  async componentDidMount() {
    if (this.props.user.banned) {
      this.props.history.push("/auth/banned");
    }

    try {
      const courseResponse = await axios.get(
        `https://canvasapi.toddr.org/api/courses/${this.props.match.params.id}`,
        {
          auth: {
            username: this.props.user.email,
            password: this.props.user.password,
          },
        }
      );
      console.log("Response: ", courseResponse.data.data);
      this.setState({
        course: courseResponse.data.data,
      });
    } catch (error) {
      console.error(error);
    }

    try {
      const assignmentsResponse = await axios.get(
        `https://canvasapi.toddr.org/api/courses/${this.props.match.params.id}/assignments`,
        {
          auth: {
            username: this.props.user.email,
            password: this.props.user.password,
          },
        }
      );
      console.log("Response: ", assignmentsResponse.data.data);
      this.setState({
        assignments: assignmentsResponse.data.data,
        data: [...this.state.data, ...assignmentsResponse.data.data],
      });
    } catch (error) {
      console.error(error);
    }

    try {
      const announcementsResponse = await axios.get(
        `https://canvasapi.toddr.org/api/courses/${this.props.match.params.id}/announcements`,
        {
          auth: {
            username: this.props.user.email,
            password: this.props.user.password,
          },
        }
      );
      console.log("Response: ", announcementsResponse.data.data);
      this.setState({
        announcements: announcementsResponse.data.data,
        data: [...this.state.data, ...announcementsResponse.data.data],
      });
    } catch (error) {
      console.error(error);
    }

    this.setState({
      data: this.state.data.sort((a, b) =>
        new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
      ),
      loading: false,
    });

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
    ]);
  }

  assignmentClick() {
    const newData = [];
    const { assignments, filter, data } = this.state;

    filter.assignments = !filter.assignments;
    if (filter.assignments) {
      this.setState({ data: [...data, ...assignments] });
    } else {
      for (let item of data) {
        if (item.discussion_type) {
          newData.push(item);
        }
      }
      this.setState({ data: newData });
    }

    this.setState({
      data: this.state.data.sort((a, b) =>
        new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
      ),
    });
  }

  announcementClick() {
    const newData = [];
    const { announcements, filter, data } = this.state;

    filter.announcements = !filter.announcements;
    if (filter.announcements) {
      this.setState({ data: [...data, ...announcements] });
    } else {
      for (let item of data) {
        if (!item.discussion_type) {
          newData.push(item);
        }
      }
      this.setState({ data: newData });
    }

    this.setState({
      data: this.state.data.sort((a, b) =>
        new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
      ),
    });
  }

  render() {
    const { loading, course, filter, data } = this.state;

    return (
      <div className="courseViewContainer">
        {!loading ? (
          <v-card dark>
            <v-toolbar>
              <v-toolbar-title>{course.name}</v-toolbar-title>

              <v-spacer></v-spacer>
              <v-btn
                color={filter.announcements ? "teal" : "gray"}
                className="buttonPadding"
                flat
                onClick={() => this.announcementClick()}
              >
                <v-icon className="iconButtonPadding">
                  mdi-message-reply-text-outline
                </v-icon>
                Announcements
              </v-btn>
              <v-btn
                color={filter.assignments ? "teal" : "gray"}
                className="buttonPadding"
                flat
                onClick={() => this.assignmentClick()}
              >
                <v-icon className="iconButtonPadding">
                  mdi-note-edit-outline
                </v-icon>
                Assignments
              </v-btn>
              <v-btn
                to={`/course/${this.props.match.params.id}/calendar`}
                className="buttonPadding"
                flat
              >
                <v-icon>mdi-calendar</v-icon>
              </v-btn>
              <v-btn
                to={`/course/${this.props.match.params.id}/roster`}
                className="buttonPadding"
                flat
              >
                <v-icon>mdi-account-group</v-icon>
              </v-btn>

              <v-btn
                flat
                href={`${this.props.user.canvasURL}/courses/${parseInt(
                  course.id
                )}`}
              >
                <v-icon className="iconButtonPadding">mdi-share</v-icon>
                Open Canvas
              </v-btn>
            </v-toolbar>
            <div className="assignmentContainer">
              {data.map((item) =>
                item.discussion_type === undefined ? (
                  <AssignmentCard
                    key={JSON.stringify(item)}
                    assignment={item}
                    style="padding-bottom: 10px"
                  />
                ) : (
                  <AnnouncementCard
                    key={JSON.stringify(item)}
                    announcement={item}
                    style="padding-bottom: 10px"
                  />
                )
              )}
            </div>
          </v-card>
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

export default CourseView;
