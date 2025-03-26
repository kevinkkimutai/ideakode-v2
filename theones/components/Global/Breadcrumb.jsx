'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);

  return (
    <nav className="text-sm text-gray-600 mt-4 ">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-green-700 hover:underline font-medium">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const formattedSegment = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Capitalize

          return (
            <li key={index} className="flex items-center">
              <FaChevronRight className="text-gray-400 mx-1" />
              {index === pathSegments.length - 1 ? (
                <span className="text-gray-500">{formattedSegment}</span>
              ) : (
                <Link href={path} className="text-green-700 hover:underline font-medium">
                  {formattedSegment}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
