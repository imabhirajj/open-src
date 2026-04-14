import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-full max-w-3xl mx-auto text-center py-20">
      <p className="text-sm font-semibold text-primary mb-3">404</p>
      <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
        Page not found
      </h1>
      <p className="text-muted-foreground mb-8">
        The page you are looking for does not exist or may have moved.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          Go to Home
        </Link>
        <Link
          to="/explore"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-white/5 text-foreground font-semibold hover:bg-white/10 transition-colors"
        >
          Explore Issues
        </Link>
      </div>
    </div>
  );
}
