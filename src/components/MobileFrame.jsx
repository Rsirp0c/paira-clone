import { motion } from 'framer-motion';
import TabBar from './TabBar';
import * as assets from '../assets/figmaAssets';

const MobileFrame = ({ activeTab, onTabChange, children }) => {
  return (
    <div
      className="overflow-clip relative rounded-[48px] w-[393px] h-[852px] bg-[radial-gradient(circle_at_top,_rgba(251,255,92,0.16),_rgba(16,16,15,0.96)_34%,_#10100F_72%)] border border-[rgba(251,255,92,0.45)] shadow-[0_0_0_1px_rgba(251,255,92,0.12),0_22px_70px_rgba(251,255,92,0.14)]"
      data-name="Mobile Frame"
    >
      {/* Tab Bar */}
      {activeTab !== 'ai' && (
        <TabBar
          className="absolute bottom-0 left-0 z-40 box-border flex w-[393px] items-center justify-between border-t border-[rgba(251,255,92,0.18)] bg-[linear-gradient(180deg,rgba(30,30,29,0.94),rgba(41,40,15,0.98))] pb-7 pt-2 px-11 shadow-[0px_-10px_40px_0px_rgba(0,0,0,0.18)]"
          onTabClick={onTabChange}
        />
      )}

      {/* Status Bar */}
      <div className="absolute z-50 top-0 left-0 w-[393px] h-[54px] flex items-center justify-between px-10" data-name="Status Bar">
        {/* Left side (time) */}
        <p className="font-sf-pro font-semibold text-[17px] leading-[22px] text-primary-neutral-50">
          9:41
        </p>

        {/* Right side (icons) */}
        <div className="flex items-center gap-[5px]">
          {/* Cellular Signal */}
          <img alt="signal" className="w-[17px] h-[12px]" src={assets.img6} />

          {/* WiFi */}
          <img alt="wifi" className="w-[15.5px] h-[12px]" src={assets.img5} />

          {/* Battery */}
          <div className="flex items-center h-[12px]">
            <div className="relative w-[22px] h-[11.5px] border border-white/40 rounded-[3px]">
              <div className="absolute inset-[1.5px] bg-white rounded-[2px]" />
            </div>
            <img alt="battery-cap" className="w-[1.5px] h-[4px] ml-[1px]" src={assets.img4} />
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
        <div className="bg-[rgba(57,56,20,0.58)] border border-[rgba(251,255,92,0.28)] h-10 relative rounded-[24px] shrink-0 w-64 shadow-[0_0_24px_rgba(251,255,92,0.08)]">
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
                    color: activeTab === 'people' ? 'rgb(251, 255, 92)' : 'rgb(212, 212, 210)'
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
                    color: activeTab === 'request' ? 'rgb(251, 255, 92)' : 'rgb(212, 212, 210)'
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
        <button className="bg-[rgba(57,56,20,0.58)] border border-[rgba(251,255,92,0.28)] box-border flex gap-[10px] items-center justify-center p-[6px] relative rounded-full shrink-0 size-11 cursor-pointer shadow-[0_0_18px_rgba(251,255,92,0.08)] transition-colors hover:bg-[rgba(70,68,22,0.72)]">
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
