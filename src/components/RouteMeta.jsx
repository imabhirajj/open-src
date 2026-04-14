import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PROJECT_NAME } from '../config/site';

const getPageTitle = (pathname) => {
  if (pathname === '/') return `Home | ${PROJECT_NAME}`;
  if (pathname === '/explore') return `Explore Issues | ${PROJECT_NAME}`;
  if (pathname === '/git-guide') return `Git Guide | ${PROJECT_NAME}`;
  if (pathname.startsWith('/issue/')) return `Issue Details | ${PROJECT_NAME}`;
  return `Page Not Found | ${PROJECT_NAME}`;
};

export default function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = getPageTitle(pathname);
  }, [pathname]);

  return null;
}
