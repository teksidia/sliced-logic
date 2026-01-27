import { useAuthStore } from "../stores/useAuthStore";
import { useHello } from "../hooks/useHello";
import { Spinner } from "@/components/ui/spinner";

function DashboardPage() {
  const { user, logout } = useAuthStore();
  const { data, error, isLoading } = useHello();

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

          <div className="bg-card p-4 rounded mb-4">
            <h3 className="font-semibold mb-2">Message from API:</h3>
            {isLoading && <Spinner />}
            {error && <p className="text-red-600">Error: {error.message}</p>}
            {data && <p className="text-blue-300">{data.message}</p>}
          </div>

          <div className="p-4 rounded">
            <h3 className="font-semibold mb-2">User Information:</h3>
            <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
