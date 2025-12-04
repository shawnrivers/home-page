import type React from 'react';

export const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  text: string;
}> = ({ href, icon, text }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-gray-700 sm:justify-start dark:text-gray-300 hover:text-gray-400 transition motion-reduce:transition-none"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
};
