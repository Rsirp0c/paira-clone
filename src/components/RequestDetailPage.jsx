import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as assets from '../assets/figmaAssets';
import { requests } from '../data/mockProfiles';
import imgVerifiedCheck from '../assets/icons/Verified Check.svg';

const RequestDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const request = requests[id] || requests.chloe; // Fallback to chloe if id not found

  return (
    <motion.div
      initial={{ x: 20, scale: 0.98 }}
      animate={{ x: 0, scale: 1 }}
      exit={{ x: 20, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="app-purple-shell z-20 h-full w-full relative overflow-y-auto rounded-[48px]"
    >
      {/* Bottom Shade */}
      <div className="absolute bottom-0 h-[123px] left-0 w-[393px] pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute bg-primary-neutral-50 box-border flex gap-[10px] items-center justify-center left-5 p-[6px] rounded-full shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] size-9 top-[66px] z-20 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#1e1e1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Button Area - Bottom Actions */}
      <div className="absolute bottom-[100px] box-border flex items-center justify-between left-1/2 px-4 py-3 translate-x-[-50%] w-[353px] z-10">
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

        {/* Accept/Handshake Button */}
        <button className="bg-primary-yellow-50 box-border flex flex-col gap-[10px] items-center justify-center p-[6px] rounded-full shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] size-14 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="overflow-clip relative shrink-0 size-7">
            <div className="absolute inset-[5.21%_9.36%]">
              <img alt="" className="block max-w-none size-full" src={assets.img10} />
            </div>
          </div>
        </button>
      </div>


      {/* Home Indicator */}
      <div className="absolute bottom-0 h-[21px] left-1/2 translate-x-[-50%] w-[393px] z-10">
        <div className="absolute bottom-[8px] flex h-[5px] items-center justify-center left-1/2 translate-x-[-50%] w-[139px]">
          <div className="flex-none rotate-180 scale-y-[-100%]">
            <div className="bg-primary-neutral-50 h-[5px] rounded-full w-[139px]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-0 items-center left-1/2 overflow-y-auto px-5 pt-[122px] pb-[140px] translate-x-[-50%] w-[353px] absolute">
        {/* Request Card Content */}
        <div className="flex flex-col gap-0 items-center w-full">
          {/* Titles Section */}
          <div className="flex flex-col gap-2 items-start w-full mb-9">
            <h1 className="font-dm-serif leading-[1.2] text-xl text-primary-neutral-50 w-full">
              {request.title}
            </h1>
            <div className="flex gap-2 items-start w-full">
              <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-[#cecec9]">
                {request.type}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="flex gap-[10px] items-center justify-center w-full mb-9">
            <p className="flex-1 font-jakarta font-normal leading-[1.5] text-[13px] text-primary-neutral-50">
              {request.description}
            </p>
          </div>

          {/* Tags Section */}
          <div className="flex flex-col gap-2 items-start w-full mb-9">
            <div className="flex flex-wrap gap-2 items-start">
              {request.tags.map((tag, index) => (
                <div key={index} className="bg-[rgba(114,78,182,0.22)] border border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] rounded-full">
                  <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                    {tag.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Requester Card */}
          <div
            onClick={() => navigate(`/profile/${request.requester.id}`)}
            className="app-purple-card box-border flex w-full cursor-pointer items-center justify-center gap-4 rounded-[20px] border p-3 transition-colors hover:border-[rgba(236,223,255,0.3)]"
          >
            {/* Photo */}
            <div className="flex gap-[10px] items-center overflow-clip rounded-full shrink-0 w-20">
              <div className="relative w-20 h-20 rounded-full">
                <img alt={request.requester.name} className="w-full h-full rounded-full object-cover" src={request.requester.photo} />
              </div>
            </div>
            {/* Info */}
            <div className="flex flex-1 flex-col gap-2 items-start">
              {/* Basic Info */}
              <div className="flex flex-col gap-1 items-start w-full">
                <div className="flex gap-1 items-center">
                  <p className="font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50">
                    {request.requester.name}
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[22px]">
                    <img alt="Verified" className="block size-full" src={imgVerifiedCheck} />
                  </div>
                </div>
                <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-50 w-full">
                  {request.requester.title}
                </p>
              </div>
              <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-300">
                {request.requester.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RequestDetailPage;
