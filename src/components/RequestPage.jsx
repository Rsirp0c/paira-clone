import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as assets from '../assets/figmaAssets';

const RequestPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: 15 }}
      animate={{ x: 0 }}
      exit={{ x: 15 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute inset-0"
    >
      {/* Button Area */}
      <div className="absolute box-border flex items-center justify-between left-5 px-4 py-3 top-[680px] w-[353px]">
        {/* Close Button */}
        <button className="absolute bg-primary-neutral-50 border-[1.5px] border-primary-neutral-50 box-border flex gap-[10px] items-center justify-center left-[calc(50%+-132.5px)] p-[6px] rounded-full size-14 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer hover:opacity-80 transition-opacity">
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

        {/* POST MINE Button */}
        <button className="absolute bg-primary-blue-500 box-border flex gap-[10px] h-9 items-center justify-center left-1/2 pb-2 pt-2 px-8 rounded-full shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer hover:opacity-90 transition-opacity">
          <p className="font-jakarta font-extrabold leading-[1.2] text-sm text-primary-neutral-50 tracking-[1.4px] uppercase">
            Post Mine
          </p>
        </button>

        {/* Handshake Button */}
        <button className="absolute bg-primary-yellow-50 box-border flex flex-col gap-[10px] items-center justify-center left-[calc(50%+132.5px)] p-[6px] rounded-full shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] size-14 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer hover:opacity-80 transition-opacity">
          <div className="overflow-clip relative shrink-0 size-7">
            <div className="absolute inset-[5.21%_9.36%]">
              <img alt="" className="block max-w-none size-full" src={assets.img10} />
            </div>
          </div>
        </button>
      </div>

      {/* Card 3 (Background) */}
      <div className="absolute flex h-[318px] items-center justify-center left-[calc(50%+0.31px)] top-[148px] translate-x-[-50%] w-[270px]">
        <div className="flex-none rotate-[3deg]">
          <div className="app-purple-card h-[305px] relative w-[254px] rounded-[36px] border">
            <div className="box-border flex flex-col gap-3 h-[305px] items-center overflow-clip pb-5 pt-6 px-6 relative rounded-[inherit] w-[254px]">
              <div className="absolute flex h-[380px] items-center justify-center left-[-20.5px] top-[-23px] w-[325px]">
                <div className="flex-none rotate-[356deg]">
                  <div className="h-[459px] w-[391px] bg-[rgba(18,8,36,0.56)] shadow-[0px_0px_20px_0px_rgba(60,25,112,0.35)]" />
                </div>
              </div>
              <div className="absolute blur-[50px] filter flex gap-[10px] items-center left-[-36px] opacity-[0.12] size-[424px] top-0">
                <div className="aspect-square h-full relative shrink-0">
                  <img alt="" className="absolute h-[150%] left-[-0.94%] max-w-none top-[-8.75%] w-full" src={assets.imgImage71Request} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 (Middle) */}
      <div className="absolute flex h-[380px] items-center justify-center left-[43px] top-[175px] w-[325px]">
        <div className="flex-none rotate-[356deg]">
          <div className="app-purple-card h-[360px] relative w-[300px] rounded-[36px] border">
            <div className="box-border flex flex-col gap-3 h-[360px] items-center overflow-clip pb-5 pt-6 px-6 relative rounded-[inherit] w-[300px]">
              <div className="absolute flex h-[380px] items-center justify-center left-[-20.5px] top-[-23px] w-[325px]">
                <div className="flex-none rotate-[356deg]">
                  <div className="h-[459px] w-[391px] bg-[rgba(24,11,44,0.38)] shadow-[0px_0px_20px_0px_rgba(60,25,112,0.35)]" />
                </div>
              </div>
              <div className="absolute blur-[50px] filter flex gap-[10px] items-center left-[-36px] opacity-[0.12] size-[424px] top-0">
                <div className="flex-[1_0_0] h-full min-h-px min-w-px relative shrink-0">
                  <img alt="" className="absolute h-[132.45%] left-[-0.18%] max-w-none top-[-16.23%] w-[100.04%]" src={assets.imgImage70Request} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 1 (Main Request Card) */}
      <div
        onClick={() => navigate('/request/chloe')}
        className="app-purple-card absolute left-1/2 top-[205px] h-[424px] w-[353px] translate-x-[-50%] cursor-pointer rounded-[36px] border border-[rgba(218,196,255,0.16)] transition-colors hover:border-[rgba(236,223,255,0.38)]"
      >
        <div className="box-border flex flex-col gap-3 h-[424px] items-center overflow-clip pb-5 pt-6 px-6 relative rounded-[inherit] w-[353px]">
          {/* Requester Profile Section */}
          <div className="bg-[rgba(195,185,185,0.1)] box-border flex flex-col gap-4 items-center justify-center px-3 py-2 relative rounded-[36px] shrink-0 w-full">
            <div className="flex gap-3 items-center relative shrink-0 w-full">
              <div className="flex gap-[10px] items-center overflow-clip relative rounded-full shrink-0">
                <div className="relative rounded-full shrink-0 size-9">
                  <img alt="" className="absolute h-[219.22%] left-[-29.76%] max-w-none top-[-19.12%] w-[146.34%] rounded-full object-cover" src={assets.imgImage67Request} />
                </div>
              </div>
              <div className="flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative shrink-0">
                <div className="flex gap-1 items-center relative shrink-0 w-full">
                  <p className="font-jakarta font-semibold leading-[1.2] text-[13px] text-primary-neutral-50">
                    Chloe Anderson
                  </p>
                  <div className="overflow-clip relative shrink-0 size-4">
                    <div className="absolute inset-[8.333%]">
                      <img alt="" className="block max-w-none size-full" src={assets.img10Request} />
                    </div>
                  </div>
                </div>
                <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50 w-full">
                  Product Design Intern at Meta
                </p>
              </div>
            </div>
          </div>

          {/* Request Content */}
          <div className="box-border flex flex-[1_0_0] flex-col gap-8 items-center justify-center min-h-px min-w-px pb-0 pt-1 px-0 relative shrink-0 w-full">
            <div className="flex flex-col gap-5 items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-1 items-start relative shrink-0 w-full">
                <h2 className="font-dm-serif leading-[1.2] text-xl text-primary-neutral-50 w-full">
                  Seeking Feedback on Behavioral Questions for Meta PD
                </h2>
                <div className="flex gap-2 items-start relative shrink-0 w-full">
                  <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-[#cecec9]">
                    Mock Interview
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 items-start relative shrink-0 w-full">
                {/* Technology Tag */}
                <div className="bg-[rgba(114,78,182,0.22)] border border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] relative rounded-full shrink-0">
                  <div className="overflow-clip relative shrink-0 size-5">
                    <div className="absolute inset-[5.21%]">
                      <img alt="" className="block max-w-none size-full" src={assets.img11Request} />
                    </div>
                  </div>
                  <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                    Technology
                  </p>
                </div>

                {/* Mentor Tag */}
                <div className="bg-[rgba(114,78,182,0.22)] border border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] relative rounded-full shrink-0">
                  <div className="overflow-clip relative shrink-0 size-5">
                    <div className="absolute inset-[5.208%]">
                      <img alt="" className="block max-w-none size-full" src={assets.img12Request} />
                    </div>
                  </div>
                  <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                    Mentor
                  </p>
                </div>

                {/* Online Tag */}
                <div className="bg-[rgba(114,78,182,0.22)] border border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] relative rounded-full shrink-0">
                  <div className="overflow-clip relative shrink-0 size-5">
                    <div className="absolute inset-[5.208%]">
                      <img alt="" className="block max-w-none size-full" src={assets.img13} />
                    </div>
                  </div>
                  <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                    Online
                  </p>
                </div>

                {/* $50 Tag */}
                <div className="bg-[rgba(114,78,182,0.22)] border border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] relative rounded-full shrink-0">
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

            {/* Description */}
            <div className="flex flex-col gap-8 items-start relative shrink-0 w-full">
              <p className="font-jakarta font-normal leading-[1.5] text-[13px] text-primary-neutral-50 w-full">
                I've got a Meta Product Design interview coming up, and the next round is all about behavior questions with a senior PM hiring manager. I'd love to practice with someone—peer or mentor—...
              </p>
            </div>
          </div>

          {/* Background blur */}
          <div className="absolute blur-[50px] filter flex gap-[10px] items-center left-[-36px] opacity-[0.12] size-[424px] top-0">
            <div className="absolute left-0 rounded-[20px] size-[424px] top-0">
              <img alt="" className="absolute h-[219.22%] left-[-29.76%] max-w-none top-[-19.12%] w-[146.34%]" src={assets.imgImage67Request} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RequestPage;
