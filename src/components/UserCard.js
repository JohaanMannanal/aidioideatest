import React from 'react'; const UserCard = ({ user, admin }) => { return (
<div className="UserCard">
      <v-card dark>
        <v-card-title className="text-h6">
          <v-icon className="iconButtonPadding"> mdi-account </v-icon>
          {user.name}
        </v-card-title>

        <v-card-subtitle
          className="userContent"
          dangerouslySetInnerHTML={{ __html: user.email }}
        ></v-card-subtitle>

        {admin && (
          <v-card-actions>
            <v-btn to={`/user/${user.id}`}>Edit</v-btn>
            {user.banned && <v-btn color="red">Banned</v-btn>}
          </v-card-actions>
        )}
      </v-card>
    </div>
); }; export default UserCard;
