import { Routes, Route } from "react-router-dom";
import DashLayout from "./components/dashLayout";
import Layout from "./components/layout";
import Public from "./components/public";
import Login from "./features/auth/login";
import PersistLogin from "./features/auth/persistLogin";
import Welcome from "./features/auth/welcome";
import RequireAuth from "./features/auth/requireAuth";
import Prefetch from "./features/auth/prefetch";
import UsersList from "./features/user/userList";
import EditUser from "./features/user/editUser";
import NewUserForm from "./features/user/newUserForm";
import NotesList from "./features/notes/noteList";
import EditNote from "./features/notes/editNote";
import NewNote from "./features/notes/newNote";
import { ROLES } from "./config/roles";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}
      </Route>
    </Routes>
  );
}
