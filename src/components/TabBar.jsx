import * as assets from '../assets/figmaAssets';

const TabBar = ({ className, onTabClick }) => {
  return (
    <div className={className} data-name="Type=Home" data-node-id="901:22322">
      <button
        onClick={() => onTabClick && onTabClick('people')}
        className="backdrop-blur-[6.9px] backdrop-filter box-border flex gap-2 items-center p-2 rounded-full shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="overflow-clip relative shrink-0 size-7" data-name="Notes">
          <div className="absolute inset-[28.71%_35.32%_8.34%_8.33%]">
            <img alt="" className="block max-w-none size-full" src={assets.img} />
          </div>
          <div className="absolute inset-[8.33%_10.07%_25.01%_29.17%]">
            <img alt="" className="block max-w-none size-full" src={assets.img1} />
          </div>
        </div>
      </button>
      <button
        onClick={() => onTabClick && onTabClick('ai')}
        className="backdrop-blur-[6.9px] backdrop-filter box-border flex gap-2 items-center p-2 rounded-full shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="overflow-clip relative shrink-0 size-7" data-name="Chat Round Line">
          <div className="absolute inset-[5.208%]">
            <img alt="" className="block max-w-none size-full" src={assets.img2} />
          </div>
        </div>
      </button>
      <button
        onClick={() => onTabClick && onTabClick('profile')}
        className="backdrop-blur-[6.9px] backdrop-filter box-border flex gap-2 items-center p-2 rounded-full shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="overflow-clip relative shrink-0 size-7" data-name="User">
          <div className="absolute inset-[5.21%_13.54%]">
            <img alt="" className="block max-w-none size-full" src={assets.img3} />
          </div>
        </div>
      </button>
    </div>
  );
};

export default TabBar;
