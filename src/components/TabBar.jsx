import * as assets from '../assets/figmaAssets';

const TabBar = ({ className }) => {
  return (
    <div className={className} data-name="Type=Home" data-node-id="901:22322">
      <div className="backdrop-blur-[6.9px] backdrop-filter box-border flex gap-2 items-center p-2 rounded-full shrink-0">
        <div className="overflow-clip relative shrink-0 size-7" data-name="Notes">
          <div className="absolute inset-[28.71%_35.32%_8.34%_8.33%]">
            <img alt="" className="block max-w-none size-full" src={assets.img} />
          </div>
          <div className="absolute inset-[8.33%_10.07%_25.01%_29.17%]">
            <img alt="" className="block max-w-none size-full" src={assets.img1} />
          </div>
        </div>
      </div>
      <div className="backdrop-blur-[6.9px] backdrop-filter box-border flex gap-2 items-center p-2 rounded-full shrink-0">
        <div className="overflow-clip relative shrink-0 size-7" data-name="Chat Round Line">
          <div className="absolute inset-[5.208%]">
            <img alt="" className="block max-w-none size-full" src={assets.img2} />
          </div>
        </div>
      </div>
      <div className="backdrop-blur-[6.9px] backdrop-filter box-border flex gap-2 items-center p-2 rounded-full shrink-0">
        <div className="overflow-clip relative shrink-0 size-7" data-name="User">
          <div className="absolute inset-[5.21%_13.54%]">
            <img alt="" className="block max-w-none size-full" src={assets.img3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
