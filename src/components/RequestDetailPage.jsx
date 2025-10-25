import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as assets from '../assets/figmaAssets';

const RequestDetailPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: 20, scale: 0.98 }}
      animate={{ x: 0, scale: 1 }}
      exit={{ x: 20, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-gradient-to-b z-20 from-[#1e1e1d] from-[5.826%] to-[#131313] to-[94.067%] h-full w-full relative overflow-y-auto rounded-[48px]"
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
              Seeking Feedback on Behavioral Questions for Meta PD
            </h1>
            <div className="flex gap-2 items-start w-full">
              <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-[#cecec9]">
                Mock Interview
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="flex gap-[10px] items-center justify-center w-full mb-9">
            <p className="flex-1 font-jakarta font-normal leading-[1.5] text-[13px] text-primary-neutral-50">
              I've got a Meta Product Designer interview coming up, and the next round is all about behavior questions with a senior PM hiring manager. I'd love to practice with someone—peer or mentor—who can throw real interview-style prompts my way and give me honest feedback. Think STAR stories, communication tips, and tightening up answers. Totally happy to compensate you for your time ✨
            </p>
          </div>

          {/* Tags Section */}
          <div className="flex flex-col gap-2 items-start w-full mb-9">
            {/* First Line */}
            <div className="flex gap-2 items-start">
              <div className="bg-[rgba(42,41,62,0.3)] border border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] rounded-full">
                <div className="overflow-clip relative shrink-0 size-5">
                  <div className="absolute inset-[5.21%]">
                    <img alt="" className="block max-w-none size-full" src={assets.img11Request} />
                  </div>
                </div>
                <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                  Technology
                </p>
              </div>
              <div className="bg-[rgba(42,41,62,0.3)] border border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] rounded-full">
                <div className="overflow-clip relative shrink-0 size-5">
                  <div className="absolute inset-[5.208%]">
                    <img alt="" className="block max-w-none size-full" src={assets.img12Request} />
                  </div>
                </div>
                <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                  Mentor
                </p>
              </div>
            </div>
            {/* Second Line */}
            <div className="flex gap-2 items-start">
              <div className="bg-[rgba(42,41,62,0.3)] border border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] rounded-full">
                <div className="overflow-clip relative shrink-0 size-5">
                  <div className="absolute inset-[5.208%]">
                    <img alt="" className="block max-w-none size-full" src={assets.img13} />
                  </div>
                </div>
                <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                  Remote
                </p>
              </div>
              <div className="bg-[rgba(42,41,62,0.3)] border border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] rounded-full">
                <div className="overflow-clip relative shrink-0 size-5">
                  <div className="absolute inset-[5.208%]">
                    <img alt="" className="block max-w-none size-full" src={assets.img14} />
                  </div>
                </div>
                <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                  $50
                </p>
              </div>
            </div>
          </div>

          {/* Requester Card */}
          <div className="bg-[#1e1e1d] border border-primary-neutral-900 box-border flex gap-4 items-center justify-center p-3 rounded-[20px] w-full cursor-pointer hover:border-primary-neutral-700 transition-colors">
            {/* Photo */}
            <div className="flex gap-[10px] items-center overflow-clip rounded-full shrink-0 w-20">
              <div className="relative w-20 h-20 rounded-full">
                <img alt="Chloe Anderson" className="absolute h-[219.22%] left-[-29.76%] max-w-none top-[-19.12%] w-[146.34%] rounded-full object-cover" src={assets.imgImage67Request} />
              </div>
            </div>
            {/* Info */}
            <div className="flex flex-1 flex-col gap-2 items-start">
              {/* Basic Info */}
              <div className="flex flex-col gap-1 items-start w-full">
                <div className="flex gap-1 items-center">
                  <p className="font-jakarta font-semibold leading-[1.2] text-base text-primary-neutral-50">
                    Chloe Anderson
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[22px]">
                    <div className="absolute inset-[8.333%]">
                      <img alt="Verified" className="block max-w-none size-full" src={assets.img10Request} />
                    </div>
                  </div>
                </div>
                <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-50 w-full">
                  Product Design Intern at Meta
                </p>
              </div>
              <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-primary-neutral-300">
                San Francisco Bay Area
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RequestDetailPage;
