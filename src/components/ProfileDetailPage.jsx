import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as assets from '../assets/figmaAssets';
import { profiles } from '../data/mockProfiles';
import imgVerifiedCheck from '../assets/icons/Verified Check.svg';

const ProfileDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const profile = profiles[id] || profiles.chloe; // Fallback to chloe if id not found

  return (
    <motion.div
      initial={{ x: 20, scale: 0.98 }}
      animate={{ x: 0, scale: 1 }}
      exit={{ x: 20, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-gradient-to-b z-20 from-[#1e1e1d] from-[5.826%] to-[#131313] to-[94.067%] h-full w-full relative overflow-y-auto rounded-[48px]"
    >

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
                <img alt={profile.name} className="w-full h-full object-cover" src={profile.photo} />
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="flex flex-col gap-6 items-center justify-center w-full">
            <div className="flex flex-col gap-3 items-center w-full">
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center">
                  <h1 className="font-dm-serif leading-[1.2] text-2xl text-white">
                    {profile.name}
                  </h1>
                  <div className="box-border flex gap-[10px] items-center justify-center p-[6px] rounded-full size-9">
                    <div className="overflow-clip relative shrink-0 size-[22px]">
                      <img alt="Verified" className="block size-full" src={imgVerifiedCheck} />
                    </div>
                  </div>
                </div>
                <p className="font-jakarta font-normal leading-[1.2] text-base text-primary-neutral-50">
                  {profile.title}
                </p>
              </div>
              <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-300">
                {profile.location}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 items-start justify-center w-[308px]">
              {profile.tags.map((tag, index) => (
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
            {profile.overview}
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
                {profile.socialPurpose.lookingFor.map((tag, index) => (
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
                {profile.socialPurpose.wantToDo.map((tag, index) => (
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
            {profile.experience.length > 1 && (
              <button className="box-border flex gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity">
                <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-100">
                  See all
                </p>
              </button>
            )}
          </div>

          {profile.experience.slice(0, 1).map((exp, index) => (
            <div key={index} className="flex gap-5 items-start w-full">
              <div className="relative rounded-[4px] shrink-0 size-12">
                <div className="absolute inset-0 pointer-events-none rounded-[4px]">
                  <div className="absolute bg-primary-neutral-200 inset-0 rounded-[4px]" />
                  {exp.logo && (
                    <img alt={exp.company} className="absolute max-w-none object-center object-cover rounded-[4px] size-full" src={exp.logo} />
                  )}
                </div>
              </div>

              <div className="flex flex-[1_0_0] flex-col gap-2 items-start min-h-px min-w-px">
                <div className="flex flex-col gap-1 items-start w-full">
                  <p className="font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50 w-full">
                    {exp.title}
                  </p>
                  <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-50 w-full">
                    {exp.company}
                  </p>
                  <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-100 w-full">
                    {exp.duration}
                  </p>
                  <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-100 w-full">
                    {exp.location}
                  </p>
                </div>

                <div className="flex gap-[10px] items-center justify-center w-full">
                  <p className="flex-[1_0_0] font-jakarta font-normal text-xs text-primary-neutral-100 leading-[1.5]">
                    {exp.description.substring(0, 120)}...
                  </p>
                </div>

                <button className="font-jakarta font-semibold text-xs text-primary-neutral-100 cursor-pointer hover:opacity-80 transition-opacity">
                  See more
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="bg-base-card border border-primary-neutral-900 box-border flex flex-col gap-4 items-center justify-center pb-[22px] pt-5 px-5 rounded-xl w-full">
          <div className="flex items-center justify-between w-full">
            <p className="flex-[1_0_0] font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50">
              Education
            </p>
            {profile.education.length > 1 && (
              <button className="box-border flex gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity">
                <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-100">
                  See all
                </p>
              </button>
            )}
          </div>

          {profile.education.slice(0, 1).map((edu, index) => (
            <div key={index} className="flex gap-5 items-start w-full">
              <div className="relative rounded-[4px] shrink-0 size-12">
                <div className="absolute inset-0 pointer-events-none rounded-[4px]">
                  <div className="absolute bg-primary-neutral-200 inset-0 rounded-[4px]" />
                  {edu.logo && (
                    <img alt={edu.school} className="absolute max-w-none object-center object-cover rounded-[4px] size-full" src={edu.logo} />
                  )}
                </div>
              </div>

              <div className="flex flex-[1_0_0] flex-col gap-2 items-start min-h-px min-w-px">
                <div className="flex flex-col gap-1 items-start leading-[1.2] w-full">
                  <p className="font-jakarta font-semibold text-base text-primary-neutral-50 w-full">
                    {edu.school}
                  </p>
                  <p className="font-jakarta font-normal text-[13px] text-primary-neutral-50 w-full">
                    {edu.degree}
                  </p>
                  <p className="font-jakarta font-normal text-[13px] text-primary-neutral-100 w-full">
                    {edu.duration}
                  </p>
                </div>

                <p className="font-jakarta font-normal text-xs text-primary-neutral-100 leading-[1.5] w-full">
                  {edu.description.substring(0, 100)}...
                </p>

                <button className="font-jakarta font-semibold text-xs text-primary-neutral-100 cursor-pointer hover:opacity-80 transition-opacity">
                  See more
                </button>
              </div>
            </div>
          ))}
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
              {profile.background.skills.map((tag, index) => (
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
              {profile.background.industries.map((tag, index) => (
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
              {profile.background.languages.map((tag, index) => (
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
        {profile.recommendations && profile.recommendations.length > 0 && (
          <div className="bg-base-card border border-primary-neutral-900 box-border flex flex-col gap-4 items-center justify-center pb-[22px] pt-5 px-5 rounded-xl w-full">
            <div className="flex items-center justify-between w-full">
              <p className="flex-[1_0_0] font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50">
                Recommendation
              </p>
              {profile.recommendations.length > 1 && (
                <button className="box-border flex gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity">
                  <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-100">
                    See all
                  </p>
                </button>
              )}
            </div>

            {profile.recommendations.slice(0, 1).map((rec, index) => (
              <div key={index} className="flex flex-col gap-2 items-start rounded-xl w-full">
                <div className="flex gap-3 items-start w-full">
                  <div className="flex items-start">
                    {rec.photo ? (
                      <img alt={rec.name} className="block size-9 rounded-full object-cover" src={rec.photo} />
                    ) : (
                      <div className="size-9 rounded-full bg-primary-neutral-200" />
                    )}
                  </div>

                  <div className="flex flex-[1_0_0] flex-col items-start min-h-px min-w-px text-primary-neutral-50">
                    <p className="font-jakarta font-semibold leading-[1.2] text-[13px] w-full">
                      {rec.name}
                    </p>
                    <p className="font-jakarta font-normal leading-[1.5] text-xs w-full">
                      {rec.title}
                    </p>
                  </div>
                </div>

                <div className="flex gap-[10px] items-center justify-center w-full">
                  <p className="flex-[1_0_0] font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-100">
                    {rec.text.substring(0, 120)}...
                  </p>
                </div>

                <button className="font-jakarta font-semibold text-xs text-primary-neutral-100 cursor-pointer hover:opacity-80 transition-opacity">
                  See more
                </button>
              </div>
            ))}
          </div>
        )}

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
    </motion.div>
  );
};

export default ProfileDetailPage;
