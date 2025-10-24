import { motion } from 'framer-motion';
import TabBar from './TabBar';
import * as assets from '../assets/figmaAssets';

const MobileFrame = ({ activeTab, onTabChange, children }) => {
  return (
    <div className="overflow-clip relative rounded-[48px] w-[393px] h-[852px] bg-[#10100F]" data-name="Mobile Frame">
      {/* Tab Bar */}
      <TabBar className="absolute bg-primary-neutral-950 bottom-0 box-border flex items-center justify-between left-0 pb-7 pt-2 px-11 shadow-[0px_-10px_40px_0px_rgba(0,0,0,0.1)] w-[393px]" />

      {/* Status Bar */}
      <div className="absolute h-[54px] left-0 top-0 w-[393px]" data-name="Status Bar">
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

      {/* Home Indicator */}
      <div className="absolute bottom-0 h-[21px] left-1/2 translate-x-[-50%] w-[393px]">
        <div className="absolute bottom-[8px] flex h-[5px] items-center justify-center left-1/2 translate-x-[-50%] w-[139px]">
          <div className="flex-none rotate-180 scale-y-[-100%]">
            <div className="bg-primary-neutral-50 h-[5px] rounded-full w-[139px]" />
          </div>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="absolute flex gap-5 items-center left-1/2 top-[66px] translate-x-[-50%] z-20">
        <div className="bg-[rgba(30,30,29,0.4)] border border-primary-neutral-900 h-10 relative rounded-[24px] shrink-0 w-64">
          <div className="box-border flex gap-6 h-10 items-center overflow-clip px-3 py-0 relative rounded-[inherit] w-64">
            <div className="flex flex-[1_0_0] h-full items-center min-h-px min-w-px relative rounded-[72px] shrink-0">
              {/* People Tab */}
              <button
                onClick={() => onTabChange('people')}
                className="box-border flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative shrink-0 hover:opacity-80 transition-opacity"
              >
                <motion.p
                  animate={{
                    fontWeight: activeTab === 'people' ? 600 : 400,
                    color: activeTab === 'people' ? 'rgb(250, 250, 250)' : 'rgb(212, 212, 210)'
                  }}
                  transition={{ duration: 0.15 }}
                  className="font-jakarta leading-[1.2] text-sm"
                >
                  People
                </motion.p>
                {activeTab === 'people' && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute box-border flex flex-col items-center justify-center left-0 px-0 py-px bottom-0 w-[116px]"
                    transition={{ type: 'spring', stiffness: 600, damping: 35, mass: 0.5 }}
                  >
                    <div className="bg-primary-yellow-50 h-px min-w-[24px] rounded-full shrink-0 w-full" />
                  </motion.div>
                )}
              </button>

              {/* Request Tab */}
              <button
                onClick={() => onTabChange('request')}
                className="box-border flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative shrink-0 hover:opacity-80 transition-opacity"
              >
                <motion.p
                  animate={{
                    fontWeight: activeTab === 'request' ? 600 : 400,
                    color: activeTab === 'request' ? 'rgb(250, 250, 250)' : 'rgb(212, 212, 210)'
                  }}
                  transition={{ duration: 0.15 }}
                  className="font-jakarta leading-[1.2] text-sm"
                >
                  Request
                </motion.p>
                {activeTab === 'request' && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute box-border flex flex-col items-center justify-center left-0 px-0 py-px bottom-0 w-[116px]"
                    transition={{ type: 'spring', stiffness: 600, damping: 35, mass: 0.5 }}
                  >
                    <div className="bg-primary-yellow-50 h-px min-w-[24px] rounded-full shrink-0 w-full" />
                  </motion.div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Settings Button */}
        <button className="bg-[rgba(30,30,29,0.4)] border border-primary-neutral-900 box-border flex gap-[10px] items-center justify-center p-[6px] relative rounded-full shrink-0 size-11 cursor-pointer hover:bg-[rgba(30,30,29,0.6)] transition-colors">
          <div className="overflow-clip relative rounded-[5px] shrink-0 size-[22px]">
            <div className="absolute inset-[13.54%_5.21%]">
              <img alt="" className="block max-w-none size-full" src={assets.img15} />
            </div>
          </div>
        </button>
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
};

export default MobileFrame;
