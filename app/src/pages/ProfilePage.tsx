import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-sm p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <div className="space-y-2">
          <p>
            <strong>ID:</strong>
          </p>
          <p>
            <strong>Name:</strong> {user?.clientPrincipal.userDetails}
          </p>
          <p>
            <strong>Email:</strong>
          </p>
          {/* {user?.roles && (
            <p>
              <strong>Roles:</strong> {user.roles.join(", ")}
            </p>
          )} */}
        </div>
      </div>
      <Link
        to="/dashboard"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-fit"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default ProfilePage;
