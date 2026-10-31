import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    let robots = document.head.querySelector('meta[name="robots"]');
    const existed = Boolean(robots);
    const previous = robots?.getAttribute("content");
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex");
    const tag = robots;
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    return () => {
      if (!existed) tag.remove();
      else if (previous === null || previous === undefined) tag.removeAttribute("content");
      else tag.setAttribute("content", previous);
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
