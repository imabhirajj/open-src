import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { GITHUB_REPO_URL, PROJECT_NAME } from '../config/site';

export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-white/10 bg-black/25 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold text-foreground">
              {PROJECT_NAME}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Helping beginners start open source contributions.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </Link>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub Repo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {PROJECT_NAME}. Developed by Codex.
          </p>
        </div>
      </div>
    </footer>
  );
}
