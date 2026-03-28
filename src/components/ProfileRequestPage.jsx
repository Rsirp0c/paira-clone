import { motion } from 'framer-motion';
import { useState } from 'react';
import * as assets from '../assets/figmaAssets';

const myRequests = [
  {
    id: 1,
    title: 'UCB  college application...',
    category: 'Grad School Advising',
    date: 'Yesterday',
    avatars: [assets.profileAvatar1],
  },
  {
    id: 2,
    title: 'SWE new grad resume review',
    category: 'Career Coaching',
    date: 'July 2, 2025',
    avatars: [assets.profileAvatarGroup, assets.profileAvatar2, assets.profileAvatar3],
    hasGroupAvatar: true,
  },
  {
    id: 3,
    title: 'PM @ Microsoft mock...',
    category: 'Mock Interview',
    date: 'June 12, 2025',
    avatars: [],
  },
];

const myResponds = [
  {
    id: 1,
    title: 'Looking for a mentor...',
    category: 'Career Coaching',
    date: 'Yesterday',
    avatars: [assets.profileAvatar4],
  },
  {
    id: 2,
    title: 'Connect with a co-founder...',
    category: 'Startup Advice',
    date: 'July 1, 2025',
    avatars: [assets.profileAvatar5],
  },
  {
    id: 3,
    title: 'Looking for mock interview...',
    category: 'Mock Interview',
    date: 'May 12, 2025',
    avatars: [assets.profileAvatar6],
  },
];

function RequestCard({ title, category, date, avatars, hasGroupAvatar }) {
  return (
    <div className="bg-[#222124] border border-primary-neutral-700 flex flex-col gap-5 items-start p-4 rounded-2xl shadow-[0px_0px_16px_0px_#1e1e1d] shrink-0 w-64">
      <div className="flex flex-col items-start w-full">
        <p className="font-jakarta font-semibold leading-[1.3] text-[15px] text-primary-neutral-50 w-full">
          {title}
        </p>
        <p className="font-jakarta font-normal leading-[1.4] text-[13px] text-primary-neutral-100 w-full">
          {category}
        </p>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="font-jakarta font-normal leading-[1.4] text-[13px] text-primary-neutral-100 whitespace-nowrap">
          {date}
        </p>
        <div className="flex gap-1 items-center">
          {avatars.length > 0 && (
            <div className="flex items-center pr-2">
              {hasGroupAvatar ? (
                <>
                  <div className="flex items-start mr-[-8px] w-6 overflow-clip">
                    <div className="relative size-6 overflow-clip rounded-full">
                      <img alt="" className="absolute block max-w-none size-full" src={avatars[0]} />
                      <div className="absolute inset-[41.67%_12.5%]">
                        <img alt="" className="absolute block max-w-none size-full" src={assets.profileIconMenuDots} />
                      </div>
                    </div>
                  </div>
                  {avatars.slice(1).map((av, i) => (
                    <div key={i} className="flex items-start mr-[-8px] w-6">
                      <img alt="" className="size-6 rounded-full object-cover" src={av} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex items-start w-6">
                  <img alt="" className="size-6 rounded-full object-cover" src={avatars[0]} />
                </div>
              )}
            </div>
          )}
          <div className="overflow-clip size-6 flex items-center justify-center">
            <img alt="" className="block max-w-none size-full" src={assets.profileIconChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileRequestPage = () => {
  const [activeTab, setActiveTab] = useState('requests');

  return (
    <motion.div
      initial={{ x: 15 }}
      animate={{ x: 0 }}
      exit={{ x: 15 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute inset-0 bg-[#131313] z-30 overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-[54px] left-0 w-full flex items-center justify-between px-[22px] py-2 h-12">
        {/* Settings button */}
        <button className="flex items-center justify-center p-2 rounded-full size-10 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="overflow-clip rounded-[5px] size-6">
            <img alt="settings" className="block size-full" src={assets.profileIconSettings} />
          </div>
        </button>

        {/* Free Points button */}
        <button className="bg-primary-yellow-50 flex gap-2 items-center justify-center pl-4 pr-5 py-2 rounded-full h-10 hover:opacity-90 transition-opacity cursor-pointer">
          <div className="relative size-6">
            <div className="absolute inset-[8.33%_37.5%_37.5%_8.33%]">
              <img alt="" className="absolute block max-w-none size-full" src={assets.profileIconStars1} />
            </div>
            <div className="absolute inset-[54.17%_8.33%_8.33%_54.17%]">
              <img alt="" className="absolute block max-w-none size-full" src={assets.profileIconStars2} />
            </div>
          </div>
          <p className="font-jakarta font-bold text-[14px] leading-[1.3] tracking-[0.28px] text-[#1f2000] whitespace-nowrap">
            Free Points!
          </p>
        </button>
      </div>

      {/* Personal Info */}
      <div className="absolute top-[106px] left-0 w-full flex flex-col gap-[6px] items-center justify-center h-[150px]">
        {/* Avatar */}
        <div className="relative size-24 flex items-center justify-center">
          <div className="overflow-clip rounded-full size-20">
            <img alt="Sofia Morales" className="block size-full object-cover" src={assets.profileSofia} />
          </div>
          <div className="absolute inset-0">
            <img alt="" className="block size-full" src={assets.profileAvatarCircle} />
          </div>
          {/* Edit button */}
          <button className="absolute top-1 right-0 bg-white flex items-center p-1 rounded-full size-6 hover:opacity-90 transition-opacity cursor-pointer">
            <div className="overflow-clip size-4">
              <img alt="edit" className="block size-full" src={assets.profileIconEdit} />
            </div>
          </button>
        </div>

        {/* Name & title */}
        <div className="flex flex-col items-center justify-center w-full">
          <p className="font-jakarta font-semibold leading-[1.3] text-[22px] text-primary-neutral-50 text-center max-w-[280px] w-full">
            Sofia Morales
          </p>
          <p className="font-jakarta font-semibold leading-[1.3] text-[15px] text-primary-neutral-50 text-center w-[280px]">
            Product Manager @Meta
          </p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="absolute top-[256px] left-0 w-full flex items-center">
        {['Get More', 'Requests', 'Recs'].map((tab) => {
          const key = tab.toLowerCase().replace(' ', '-');
          const isActive = activeTab === key || (key === 'requests' && activeTab === 'requests') || (key === 'get-more' && activeTab === 'get-more') || (key === 'recs' && activeTab === 'recs');
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(key)}
              className="flex flex-1 flex-col gap-3 items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <p className={`font-jakarta font-semibold leading-[1.3] text-[15px] whitespace-nowrap ${isActive ? 'text-primary-neutral-50' : 'text-primary-neutral-300'}`}>
                {tab}
              </p>
              <div className="border-b border-primary-neutral-900 flex flex-col items-center justify-center py-px w-full">
                {isActive && (
                  <div className="bg-primary-neutral-50 h-px rounded-full w-full" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Scrollable Content */}
      <div className="absolute top-[306px] left-0 right-0 bottom-[80px] overflow-y-auto flex flex-col gap-5 pb-16">
        {/* My Requests */}
        <div className="flex flex-col gap-2 px-5">
          <div className="flex items-center justify-between h-8 w-[353px]">
            <p className="font-jakarta font-semibold leading-[1.3] text-[15px] text-white">
              My Requests
            </p>
            <button className="flex gap-[10px] items-center justify-center h-8 rounded-full hover:opacity-80 transition-opacity cursor-pointer">
              <p className="font-jakarta font-normal leading-[1.4] text-[13px] text-primary-neutral-50">
                View All
              </p>
              <img alt="" className="block size-6 shrink-0" src={assets.profileIconArrowRight} />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1 hide-scrollbar">
            {myRequests.map((req) => (
              <RequestCard key={req.id} {...req} />
            ))}
          </div>
        </div>

        {/* My Responds */}
        <div className="flex flex-col gap-2 px-5">
          <div className="flex items-center justify-between h-8 w-[353px]">
            <p className="font-jakarta font-semibold leading-[1.3] text-[15px] text-white">
              My Responds
            </p>
            <button className="flex gap-[10px] items-center justify-center h-8 rounded-full hover:opacity-80 transition-opacity cursor-pointer">
              <p className="font-jakarta font-normal leading-[1.4] text-[13px] text-primary-neutral-50">
                View All
              </p>
              <img alt="" className="block size-6 shrink-0" src={assets.profileIconArrowRight} />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1 hide-scrollbar">
            {myResponds.map((req) => (
              <RequestCard key={req.id} {...req} />
            ))}
          </div>
        </div>
      </div>

      {/* Post Request button */}
      <div className="absolute bottom-[92px] right-5 flex justify-end">
        <button className="bg-primary-blue-500 flex gap-2 items-center justify-center pl-4 pr-5 py-2 rounded-full h-12 shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] hover:opacity-90 transition-opacity cursor-pointer">
          <div className="relative size-[26px]">
            <div className="absolute inset-[46.88%_21.88%]">
              <img alt="" className="absolute block max-w-none size-full" src={assets.profileIconPlusH} />
            </div>
            <div className="absolute inset-[21.88%_46.88%]">
              <img alt="" className="absolute block max-w-none size-full" src={assets.profileIconPlusV} />
            </div>
          </div>
          <p className="font-jakarta font-extrabold leading-[1.2] text-[16px] text-primary-neutral-50 tracking-[0.16px] whitespace-nowrap">
            Post Request
          </p>
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileRequestPage;
