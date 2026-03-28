import { useLocation, useNavigate } from 'react-router-dom';

const sections = [
  {
    label: 'Main Page',
    pages: [
      { label: 'People', path: '/app' },
      { label: 'Request', path: '/app/requests' },
      { label: 'People Detail', path: '/app/profile/chloe' },
      { label: 'Request Detail', path: '/app/request/chloe' },
    ],
  },
  {
    label: 'Chat Page',
    pages: [
      { label: 'AI Chat', path: '/app/ai' },
    ],
  },
  {
    label: 'Profile Page',
    pages: [
      { label: 'My Profile', path: '/app/my-profile' },
    ],
  },
];

function isActivePath(currentPath, itemPath) {
  if (itemPath === '/app') {
    return currentPath === '/app' || currentPath === '/app/';
  }
  return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
}

export default function OutlinePanel() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed left-5 top-16 z-[100] w-48 rounded-xl border border-white/15 bg-[rgba(30,30,28,0.92)] p-3 backdrop-blur-sm">
      <p className="mb-3 font-jakarta text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
        Outline
      </p>
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="mb-1.5 font-jakarta text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              {section.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.pages.map((page) => {
                const active = isActivePath(location.pathname, page.path);
                return (
                  <button
                    key={page.path}
                    onClick={() => navigate(page.path)}
                    className={[
                      'w-full rounded-md px-2.5 py-1.5 text-left font-jakarta text-xs transition-colors duration-100',
                      active
                        ? 'bg-white/15 text-white'
                        : 'text-white/60 hover:bg-white/8 hover:text-white/90',
                    ].join(' ')}
                  >
                    {page.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
