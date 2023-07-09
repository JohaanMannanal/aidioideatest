import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeView from "../views/HomeView";
import ProfileView from "../views/ProfileView";
import FeedView from "../views/FeedView";
import AnnouncementsView from "../views/AnnouncementsView";
import CoursesView from "../views/CoursesView";
import AssignmentsView from "../views/AssignmentsView";
import AssignmentView from "../views/AssignmentView";
import AnnouncementView from "../views/AnnouncementView";
import CourseView from "../views/CourseView";
import CourseRosterView from "../views/CourseRosterView";
import AdminView from "../views/AdminView";
import AuthBannedView from "../views/AuthBannedView";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/profile" component={ProfileView} />
        <Route path="/feed" component={FeedView} />
        <Route path="/announcements" component={AnnouncementsView} />
        <Route path="/courses" component={CoursesView} />
        <Route path="/assignments" component={AssignmentsView} />
        <Route
          path="/assignment/:courseID/:assignmentID"
          component={AssignmentView}
        />
        <Route
          path="/announcement/:courseID/:announcementID"
          component={AnnouncementView}
        />
        <Route path="/course/:id" component={CourseView} />
        <Route path="/course/:id/roster" component={CourseRosterView} />
        <Route path="/admin" component={AdminView} />
        <Route path="/user/:id" component={UserManagerView} />
        <Route path="/auth/banned" component={AuthBannedView} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
