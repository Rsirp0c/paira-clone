import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AIChatPage from './AIChatPage';
import MobileFrame from './MobileFrame';
import PeoplePage from './PeoplePage';
import ProfileDetailPage from './ProfileDetailPage';
import ProfileRequestPage from './ProfileRequestPage';
import RequestDetailPage from './RequestDetailPage';
import RequestPage from './RequestPage';

const FRAME_SCALE = 0.62;

const sections = [
  {
    label: 'Main Page',
    pages: [
      {
        label: 'People',
        activeTab: 'people',
        initialPath: '/',
        element: <Route index element={<PeoplePage />} />,
      },
      {
        label: 'Request',
        activeTab: 'request',
        initialPath: '/requests',
        element: <Route path="/requests" element={<RequestPage />} />,
      },
      {
        label: 'People Detail',
        activeTab: 'people',
        initialPath: '/profile/chloe',
        element: <Route path="/profile/:id" element={<ProfileDetailPage />} />,
      },
      {
        label: 'Request Detail',
        activeTab: 'request',
        initialPath: '/request/chloe',
        element: <Route path="/request/:id" element={<RequestDetailPage />} />,
      },
    ],
  },
  {
    label: 'Chat Page',
    pages: [
      {
        label: 'AI Chat',
        activeTab: 'ai',
        initialPath: '/ai',
        element: <Route path="/ai" element={<AIChatPage />} />,
      },
    ],
  },
  {
    label: 'Profile Page',
    pages: [
      {
        label: 'My Profile',
        activeTab: 'profile',
        initialPath: '/my-profile',
        element: <Route path="/my-profile" element={<ProfileRequestPage />} />,
      },
    ],
  },
];

function StaticFrame({ page }) {
  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0">
      <div
        className="origin-top overflow-hidden rounded-[calc(48px*var(--scale))]"
        style={{
          '--scale': FRAME_SCALE,
          width: `calc(393px * ${FRAME_SCALE})`,
          height: `calc(852px * ${FRAME_SCALE})`,
        }}
      >
        <div
          className="origin-top-left pointer-events-none"
          style={{ transform: `scale(${FRAME_SCALE})`, width: 393, height: 852 }}
        >
          <MemoryRouter initialEntries={[page.initialPath]}>
            <MobileFrame activeTab={page.activeTab} onTabChange={() => {}}>
              <Routes>
                {page.element}
              </Routes>
            </MobileFrame>
          </MemoryRouter>
        </div>
      </div>
      <p className="font-jakarta text-xs text-white/50">{page.label}</p>
    </div>
  );
}

export default function FigmaView() {
  return (
    <div className="min-h-screen w-full overflow-auto bg-[#080807] px-16 py-20">
      <div className="flex flex-col gap-16">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="mb-5 flex items-center gap-3">
              <p className="font-jakarta text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
                {section.label}
              </p>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="flex flex-row gap-8">
              {section.pages.map((page) => (
                <StaticFrame key={page.label} page={page} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
