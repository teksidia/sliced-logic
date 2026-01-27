import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <section>
      <div className="text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white text-balance">
          🥜 Let's Go Nuts
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto text-pretty">
          Explore our awesome application built with React and TypeScript.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link to="/dashboard">
            <Button variant="default" size="lg">
              Dashboard
            </Button>
          </Link>

          <Link to="/about">
            <Button variant="secondary" size="lg">
              About
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
