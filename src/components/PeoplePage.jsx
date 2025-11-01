import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as assets from '../assets/figmaAssets';

const PeoplePage = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile/chloe'); // Navigate to Chloe Anderson's profile
  };

  return (
    <motion.div
      initial={{ x: -15 }}
      animate={{ x: 0 }}
      exit={{ x: -15 }}
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

        {/* Premium Ping Button */}
        <button className="absolute bg-primary-blue-500 box-border flex gap-[10px] items-center justify-center left-1/2 p-[6px] rounded-full shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] size-14 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer hover:opacity-80 transition-opacity">
          <div className="overflow-clip relative shrink-0 size-7">
            <div className="absolute inset-[8.33%_8.33%_4.17%_4.17%]">
              <img alt="" className="block max-w-none size-full" src={assets.img9} />
            </div>
          </div>
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
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.0523359552025795)+(var(--transform-inner-height)*0.9986295104026794)))] items-center justify-center left-[calc(50%+0.31px)] top-[148px] translate-x-[-50%] w-[calc(1px*((var(--transform-inner-height)*0.0523359552025795)+(var(--transform-inner-width)*0.9986295104026794)))]">
        <div className="flex-none rotate-[3deg]">
          <div className="bg-base-card border border-[rgba(94,94,92,0.6)] h-[305px] relative rounded-[36px] w-[254px]">
            <div className="box-border flex flex-col gap-4 h-[305px] items-center overflow-clip p-5 relative rounded-[inherit] w-[254px]">
              <div className="absolute bg-[rgba(19,19,19,0.65)] h-[459px] left-[-19px] shadow-[0px_0px_20px_0px_#1e1e1d] top-[-18px] w-[391px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 (Middle) */}
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.06975647062063217)+(var(--transform-inner-height)*0.9975640773773193)))] items-center justify-center left-[43px] top-[175px] w-[calc(1px*((var(--transform-inner-height)*0.06975647062063217)+(var(--transform-inner-width)*0.9975640773773193)))]">
        <div className="flex-none rotate-[356deg]">
          <div className="bg-base-card border border-[rgba(94,94,92,0.8)] h-[360px] relative rounded-[36px] w-[300px]">
            <div className="box-border flex flex-col gap-4 h-[360px] items-center overflow-clip p-5 relative rounded-[inherit] w-[300px]">
              <div className="absolute blur-[50px] filter flex gap-[10px] items-center left-[calc(50%+-0.211px)] opacity-[0.12] size-[360px] top-[1.97px] translate-x-[-50%]">
                <div className="flex-[1_0_0] h-full min-h-px min-w-px relative shrink-0">
                  <img alt="" className="absolute h-[132.45%] left-[-0.18%] max-w-none top-[-16.23%] w-[100.04%]" src={assets.imgImage70} />
                </div>
              </div>
              <div className="absolute bg-[rgba(20,20,20,0.4)] h-[459px] left-[-19px] shadow-[0px_0px_20px_0px_#1e1e1d] top-[-18px] w-[391px]" />
              <div className="box-border flex gap-[10px] items-center overflow-clip relative rounded-full shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] shrink-0">
                <div className="relative shrink-0 size-[136px]">
                  <img alt="" className="absolute h-[132.45%] left-[-0.18%] max-w-none top-[-16.23%] w-[100.04%] rounded-full object-cover" src={assets.imgImage70} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 1 (Main Profile Card) */}
      <div
        onClick={handleProfileClick}
        className="absolute bg-base-card border border-primary-neutral-700 cursor-pointer h-[424px] left-1/2 rounded-[36px] top-[205px] translate-x-[-50%] w-[353px] hover:border-primary-neutral-300 transition-colors"
      >
        <div className="box-border flex flex-col gap-4 h-[424px] items-center overflow-clip p-5 relative rounded-[inherit] w-[353px]">
          <div className="absolute blur-[50px] filter flex gap-[10px] items-center left-[-36px] opacity-[0.12] size-[424px] top-0">
            <div className="absolute left-0 rounded-[20px] size-[424px] top-0">
              <img alt="" className="absolute h-[219.22%] left-[-29.76%] max-w-none top-[-19.12%] w-[146.34%]" src={assets.imgImage67} />
            </div>
          </div>

          {/* Profile Photo */}
          <div className="box-border flex gap-[10px] items-center overflow-clip relative rounded-full shadow-[0px_7px_29px_0px_rgba(255,255,255,0.2)] shrink-0 w-40">
            <div className="aspect-square flex-[1_0_0] min-h-px min-w-px relative rounded-[20px] shrink-0">
              <img alt="" className="absolute h-[219.22%] left-[-29.76%] max-w-none top-[-19.12%] w-[146.34%] rounded-full object-cover" src={assets.imgImage67} />
            </div>
          </div>

          {/* Description Lines */}
          <div className="flex flex-[1_0_0] flex-col gap-9 items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
            <div className="flex flex-col gap-9 items-center relative shrink-0 w-full">
              {/* Names */}
              <div className="flex flex-col gap-3 items-center relative shrink-0 w-full">
                <div className="flex flex-col items-center relative shrink-0 w-full">
                  <div className="flex items-center relative shrink-0">
                    <h1 className="font-dm-serif leading-[1.2] text-2xl text-white">
                      Chloe Anderson
                    </h1>
                    <div className="box-border flex gap-[10px] items-center justify-center p-[6px] relative rounded-full shrink-0 size-9">
                      <div className="overflow-clip relative shrink-0 size-[22px]">
                        <div className="absolute inset-[8.333%]">
                          <img alt="" className="block max-w-none size-full" src={assets.img11} />
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
              <div className="flex flex-wrap gap-2 items-start justify-center relative shrink-0 w-[308px]">
                {['Technology', '3 YOE', 'Human-Centered AI', 'UX Research', 'UI Design'].map((tag, index) => (
                  <div key={index} className="bg-base-tag border-[0.8px] border-primary-neutral-50 box-border flex gap-2 h-[30px] items-center justify-center px-3 py-[6px] relative rounded-full shrink-0">
                    <p className="font-jakarta font-normal leading-[1.5] text-xs text-primary-neutral-50">
                      {tag}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PeoplePage;
