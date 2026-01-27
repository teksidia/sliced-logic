import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p className="text-gray-600 mb-8">This is another public page</p>
      <Link
        to="/"
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default AboutPage;
