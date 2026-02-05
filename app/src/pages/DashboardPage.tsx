import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { userQueries, useCreateUserMutation } from "../services/userService";
import { type Pokemon } from "../types";

function DashboardPage() {
  const { user, logout } = useAuthStore();

  // Use the query (similar to useGetUsersQuery)
  const { data: users } = useQuery(userQueries.list());

  // Use the mutation (similar to useCreateUserMutation)
  const { mutate: createUser } = useCreateUserMutation();

  return (
    <div className="flex flex-col min-h-screen p-4">
      <nav className="p-4 mb-8 rounded bg-card">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.clientPrincipal.userDetails}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-secondary text-foreground rounded hover:bg-secondary-dark"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-1">
        <div className="bg-card shadow-sm p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Protected Content</h2>
          <p className="mb-4">
            This page is only accessible to authenticated users.
          </p>

          <div className="p-4 rounded">
            <h3 className="font-semibold mb-2">User Information:</h3>
            <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
          </div>

          <div>
            {users?.map((user: Pokemon) => (
              <div key={user.name}>{user.name}</div>
            ))}
            <button onClick={() => createUser({ name: "New Pokemon" })}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
