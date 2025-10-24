import { useNavigate } from 'react-router-dom';
import * as assets from '../assets/figmaAssets';

const ProfileDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#1e1e1d] from-[5.826%] to-[#131313] to-[94.067%] h-full w-full relative overflow-y-auto rounded-[48px]">
      {/* Status Bar */}
      <div className="absolute h-[54px] left-0 top-0 w-[393px] z-30" data-name="Status Bar">
        <div className="absolute h-[54px] left-0 right-[64.25%] top-1/2 translate-y-[-50%]">
          <p className="absolute font-sf-pro font-semibold inset-[33.96%_36.71%_25.3%_36.96%] leading-[22px] text-[17px] text-primary-neutral-50 text-center">
            9:41
          </p>
        </div>
        <div className="absolute h-[54px] left-[64.25%] right-0 top-1/2 translate-y-[-50%] flex items-center justify-end gap-[5px] pr-[15px]">
          {/* Cellular Signal */}
          <div className="relative w-[17px] h-[12px]">
            <img alt="" className="block max-w-none size-full" src={assets.img6} />
          </div>
          {/* WiFi */}
          <div className="relative w-[15.5px] h-[12px]">
            <img alt="" className="block max-w-none size-full" src={assets.img5} />
          </div>
          {/* Battery */}
          <div className="relative flex items-center h-[12px]">
            <div className="relative w-[22px] h-[11.5px] border border-white/40 rounded-[3px]">
              <div className="absolute bg-white inset-[1.5px] rounded-[2px]" />
            </div>
            <div className="relative w-[1.5px] h-[4px] ml-[1px]">
              <img alt="" className="block max-w-none size-full" src={assets.img4} />
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute bg-primary-neutral-50 box-border flex gap-[10px] items-center justify-center left-5 p-[6px] rounded-full shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] size-9 top-[66px] z-20 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#1e1e1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex flex-col gap-9 items-center left-1/2 overflow-y-auto px-5 pt-[122px] pb-[140px] translate-x-[-50%] w-[353px] absolute">
        {/* Profile Header */}
        <div className="flex flex-col gap-4 items-center w-full">
          {/* Profile Photo */}
          <div className="flex gap-[10px] items-center overflow-clip rounded-full shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] w-60">
            <div className="aspect-square flex-[1_0_0] min-h-px min-w-px relative rounded-[20px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]">
                <img alt="Chloe Anderson" className="absolute h-[219.22%] left-[-29.76%] max-w-none top-[-19.12%] w-[146.34%]" src={assets.imgImage67} />
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="flex flex-col gap-6 items-center justify-center w-full">
            <div className="flex flex-col gap-3 items-center w-full">
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center">
                  <h1 className="font-dm-serif leading-[1.2] text-2xl text-white">
                    Chloe Anderson
                  </h1>
                  <div className="box-border flex gap-[10px] items-center justify-center p-[6px] rounded-full size-9">
                    <div className="overflow-clip relative shrink-0 size-[22px]">
                      <div className="absolute inset-[8.333%]">
                        <img alt="Verified" className="block max-w-none size-full" src={assets.img11} />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-jakarta font-normal leading-[1.2] text-base text-primary-neutral-50">
                  Product Design Intern at Meta
                </p>
              </div>
              <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-300">
                San Francisco Bay Area
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 items-start justify-center w-[308px]">
              {['Technology', '3 YOE', 'Human-Centered AI', 'UX Research', 'UI Design'].map((tag, index) => (
                <div key={index} className="bg-base-tag border-[0.8px] border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] rounded-full">
                  <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-base-card border border-primary-neutral-900 box-border flex flex-col gap-3 items-center justify-center pb-[22px] pt-5 px-5 rounded-xl w-full">
          <p className="font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50 w-full">
            Overview
          </p>
          <p className="font-jakarta font-normal leading-[1.5] text-[13px] text-primary-neutral-50 w-full">
            Currently designing at Meta with a psychology twist from Cornell. Big fan of blending research and creativity to make products people love. Always up for mock interviews, mentorship chats, or just grabbing coffee to talk design and life.
          </p>
        </div>

        {/* Social Purpose Section */}
        <div className="bg-base-card border border-primary-neutral-900 rounded-xl w-full">
          <div className="box-border flex flex-col gap-6 items-start overflow-clip pb-[22px] pt-5 px-5 rounded-inherit w-full">
            {/* People I'm looking for */}
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <p className="font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50 w-full">
                People I'm looking for
              </p>
              <div className="flex flex-wrap gap-2 items-start w-full">
                {['Mentor', 'Mentee', 'Peer', 'Investor'].map((tag, index) => (
                  <div key={index} className="bg-base-tag border-[0.8px] border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] rounded-full">
                    <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                      {tag}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Things I want to do */}
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <p className="font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50 w-full">
                Things I want to do
              </p>
              <div className="flex flex-wrap gap-2 items-start w-full">
                {['Mock Interview', 'Networking', 'Coffee Chat'].map((tag, index) => (
                  <div key={index} className="bg-base-tag border-[0.8px] border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] rounded-full">
                    <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                      {tag}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-base-card border border-primary-neutral-900 box-border flex flex-col gap-4 items-start justify-center pb-[22px] pt-5 px-5 rounded-xl w-full">
          <div className="flex items-center justify-between w-full">
            <p className="flex-[1_0_0] font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50">
              Experience
            </p>
            <button className="box-border flex gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity">
              <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-100">
                See all
              </p>
            </button>
          </div>

          <div className="flex gap-5 items-start w-full">
            <div className="relative rounded-[4px] shrink-0 size-12">
              <div className="absolute inset-0 pointer-events-none rounded-[4px]">
                <div className="absolute bg-primary-neutral-50 inset-0 rounded-[4px]" />
                <img alt="Meta" className="absolute max-w-none object-center object-cover rounded-[4px] size-full" src={assets.imgImage30} />
              </div>
            </div>

            <div className="flex flex-[1_0_0] flex-col gap-2 items-start min-h-px min-w-px">
              <div className="flex flex-col gap-1 items-start w-full">
                <p className="font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50 w-full">
                  Product Design Intern
                </p>
                <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-50 w-full">
                  Meta
                </p>
                <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-100 w-full">
                  May 2025 - Until Now, 3 months
                </p>
                <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-100 w-full">
                  Mountain View, CA
                </p>
              </div>

              <div className="flex gap-[10px] items-center justify-center w-full">
                <ul className="block flex-[1_0_0] font-jakarta font-normal text-xs text-primary-neutral-100">
                  <li className="ms-[18px] whitespace-pre-wrap leading-[1.5]">
                    Drive product vision and strategy for cross-functional teams, defining clear roadmaps and success...
                  </li>
                </ul>
              </div>

              <button className="font-jakarta font-semibold text-xs text-primary-neutral-100 cursor-pointer hover:opacity-80 transition-opacity">
                See more
              </button>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-base-card border border-primary-neutral-900 box-border flex flex-col gap-4 items-center justify-center pb-[22px] pt-5 px-5 rounded-xl w-full">
          <div className="flex items-center justify-between w-full">
            <p className="flex-[1_0_0] font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50">
              Education
            </p>
            <button className="box-border flex gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity">
              <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-100">
                See all
              </p>
            </button>
          </div>

          <div className="flex gap-5 items-start w-full">
            <div className="relative rounded-[4px] shrink-0 size-12">
              <div className="absolute inset-0 pointer-events-none rounded-[4px]">
                <div className="absolute bg-primary-neutral-50 inset-0 rounded-[4px]" />
                <img alt="Cornell" className="absolute max-w-none object-center object-cover rounded-[4px] size-full" src={assets.imgImage31} />
              </div>
            </div>

            <div className="flex flex-[1_0_0] flex-col gap-2 items-start min-h-px min-w-px">
              <div className="flex flex-col gap-1 items-start leading-[1.2] w-full">
                <p className="font-jakarta font-semibold text-base text-primary-neutral-50 w-full">
                  Cornell University
                </p>
                <p className="font-jakarta font-normal text-[13px] text-primary-neutral-50 w-full">
                  Bachelor of Science, Psychology
                </p>
                <p className="font-jakarta font-normal text-[13px] text-primary-neutral-100 w-full">
                  Aug 2023 - Now
                </p>
              </div>

              <ul className="block font-jakarta font-normal text-xs text-primary-neutral-100 min-w-full w-[min-content]">
                <li className="ms-[18px] whitespace-pre-wrap leading-[1.5]">
                  Conducted independent research on human behavior and decision-making, designing and running...
                </li>
              </ul>

              <button className="font-jakarta font-semibold text-xs text-primary-neutral-100 cursor-pointer hover:opacity-80 transition-opacity">
                See more
              </button>
            </div>
          </div>
        </div>

        {/* Background Section */}
        <div className="bg-base-card border border-primary-neutral-900 box-border flex flex-col gap-5 items-center justify-center pb-[22px] pt-5 px-5 rounded-xl w-full">
          <p className="font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50 w-full">
            Background
          </p>

          {/* Skills */}
          <div className="flex flex-col gap-3 items-center w-full">
            <p className="font-jakarta font-semibold leading-[1.2] text-[13px] text-primary-neutral-50 w-full">
              Skills
            </p>
            <div className="flex flex-wrap gap-2 items-start w-full">
              {['UI Design', 'UX Research', 'Usability Testing', 'Prototyping', 'Team Collaboration'].map((tag, index) => (
                <div key={index} className="bg-base-tag border-[0.8px] border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] rounded-full">
                  <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="flex flex-col gap-3 items-center w-full">
            <p className="font-jakarta font-semibold leading-[1.2] text-[13px] text-primary-neutral-50 w-full">
              Industries
            </p>
            <div className="flex flex-wrap gap-2 items-start w-full">
              {['Technology', 'Cybersecurity', 'Finance'].map((tag, index) => (
                <div key={index} className="bg-base-tag border-[0.8px] border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] rounded-full">
                  <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-col gap-3 items-center w-full">
            <p className="font-jakarta font-semibold leading-[1.2] text-[13px] text-primary-neutral-50 w-full">
              Languages
            </p>
            <div className="flex flex-wrap gap-2 items-start w-full">
              {['English', 'Spanish'].map((tag, index) => (
                <div key={index} className="bg-base-tag border-[0.8px] border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] rounded-full">
                  <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation Section */}
        <div className="bg-base-card border border-primary-neutral-900 box-border flex flex-col gap-4 items-center justify-center pb-[22px] pt-5 px-5 rounded-xl w-full">
          <div className="flex items-center justify-between w-full">
            <p className="flex-[1_0_0] font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50">
              Recommendation
            </p>
            <button className="box-border flex gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity">
              <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-100">
                See all
              </p>
            </button>
          </div>

          <div className="flex flex-col gap-2 items-start rounded-xl w-full">
            <div className="flex gap-3 items-start w-full">
              <div className="flex items-start">
                <img alt="Camila Perez" className="block size-9 rounded-full" src={assets.img9Avatar} />
              </div>

              <div className="flex flex-[1_0_0] flex-col items-start min-h-px min-w-px text-primary-neutral-50">
                <p className="font-jakarta font-semibold leading-[1.2] text-[13px] w-full">
                  Camila Perez
                </p>
                <p className="font-jakarta font-normal leading-[1.5] text-xs w-full">
                  UX Design Intern @Microsoft
                </p>
              </div>
            </div>

            <div className="flex gap-[10px] items-center justify-center w-full">
              <p className="flex-[1_0_0] font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-100">
                Chloe was an incredible mentor during my interview process. She generously shared her time and insights, helping me build confidence and refine...
              </p>
            </div>

            <button className="font-jakarta font-semibold text-xs text-primary-neutral-100 cursor-pointer hover:opacity-80 transition-opacity">
              See more
            </button>
          </div>
        </div>

        {/* Bottom Button Area */}
        <div className="flex items-center justify-between w-full py-4">
          {/* Close Button */}
          <button className="bg-primary-neutral-50 border-[1.5px] border-primary-neutral-50 box-border flex gap-[10px] items-center justify-center p-[6px] rounded-full size-14 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="relative shrink-0 size-7">
              <div className="absolute flex inset-[32.322%] items-center justify-center">
                <div className="flex-none h-px rotate-45 w-3">
                  <img alt="" className="block max-w-none size-full" src={assets.img7} />
                </div>
              </div>
              <div className="absolute flex inset-[32.322%] items-center justify-center">
                <div className="flex-none h-3 rotate-45 w-px">
                  <img alt="" className="block max-w-none size-full" src={assets.img8} />
                </div>
              </div>
            </div>
          </button>

          {/* Premium Ping Button */}
          <button className="bg-primary-blue-500 box-border flex gap-[10px] items-center justify-center p-[6px] rounded-full shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] size-14 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="overflow-clip relative shrink-0 size-7">
              <div className="absolute inset-[8.33%_8.33%_4.17%_4.17%]">
                <img alt="" className="block max-w-none size-full" src={assets.img9} />
              </div>
            </div>
          </button>

          {/* Handshake Button */}
          <button className="bg-primary-yellow-50 box-border flex flex-col gap-[10px] items-center justify-center p-[6px] rounded-full shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] size-14 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="overflow-clip relative shrink-0 size-7">
              <div className="absolute inset-[5.21%_9.36%]">
                <img alt="" className="block max-w-none size-full" src={assets.img10} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;
