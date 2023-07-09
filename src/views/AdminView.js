import React, { useEffect, useState } from 'react'; import axios from 'axios';
import md5 from 'md5'; import UserCard from '../components/UserCard'; const
AdminView = ({ user }) => { const [tab, setTab] = useState('tab-Users'); const
[users, setUsers] = useState([]); const [errors, setErrors] = useState([]);
useEffect(() => { const fetchData = async () => { try { const userResponse =
await axios.get('https://canvasapi.toddr.org/internal/users', { auth: {
username: user.email, password: user.password, }, });
setUsers(userResponse.data.users); const errorResponse = await
axios.get('https://canvasapi.toddr.org/internal/errors', { auth: { username:
user.email, password: user.password, }, }); setErrors(errorResponse.data.users);
} catch (error) { console.error(error); } }; fetchData(); }, [user]); if
(user.banned) { return
<v-alert
  dark
  type="error"
>You do not have authorization to view this panel.</v-alert>
; } return (
<div className="admin-panel">
      <v-toolbar dark dense>
        <v-tabs v-model="tab" fixed-tabs dark>
          {tabs.map((i) => (
            <v-tab key={i} href={`#tab-${i}`} onClick={() => setTab(`tab-${i}`)}>
              {i}
            </v-tab>
          ))}
        </v-tabs>
      </v-toolbar>

      <v-tabs-items v-model="tab" dark>
        <v-tab-item dark value="tab-Users">
          <v-card dark>
            <v-list>
              {users.map((aUser) => (
                <UserCard key={aUser.id} user={aUser} admin={true} />
              ))}
            </v-list>
          </v-card>
        </v-tab-item>
        <v-tab-item dark value="tab-System">
          <v-card dark>
            <v-card-text dark>THIS IS SOME TEXT</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item dark value="tab-Errors">
          <v-card dark>
            <v-list three-line style={{ padding: '1rem' }}>
              {errors.map((error) => (
                <v-list-item-content key={error.id}>
                  <v-list-item-title dark>
                    Error ID: {error.id} | User ID: {error.userID}
                  </v-list-item-title>
                  <v-list-item-subtitle dark>{JSON.stringify(error.error)}</v-list-item-subtitle>
                </v-list-item-content>
              ))}
            </v-list>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
); }; export default AdminView;
