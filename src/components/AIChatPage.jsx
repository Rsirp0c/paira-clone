import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SendIcon from '../assets/icons/Shape.svg';
import imgImage99 from '../assets/images/imgImage99.png';
import imgImage98 from '../assets/images/imgImage98.png';
import imgVerifiedCheck from '../assets/icons/Verified Check.svg';
import imgLike from '../assets/icons/Like.svg';
import imgMenuDots from '../assets/icons/Menu Dots.svg';
import imgAIIcon from '../assets/icons/AI Essentials Icon Set.svg';
import imgBackArrow from '../assets/icons/Menu Dots (1).svg';
import imgHeaderMenu from '../assets/icons/Button.svg';

const AIChatPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }
    // Placeholder submit handling until backend connection exists.
    setMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="app-purple-shell absolute inset-0 z-30"
    >
      {/* Header */}
      <div className="absolute left-0 top-[54px] z-10 box-border flex h-[48px] w-[393px] items-center justify-center border-b border-[rgba(218,196,255,0.08)] bg-[rgba(20,9,38,0.72)] px-5 backdrop-blur">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute flex gap-[10px] h-8 items-center justify-center left-5 rounded-full top-2 cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div className="overflow-clip relative size-6">
            <img alt="Back" className="block size-full" src={imgBackArrow} />
          </div>
        </button>

        <div className="flex gap-[9px] items-center">
          <p className="font-jakarta font-extrabold leading-[1.2] text-[16px] text-primary-neutral-50 tracking-[1.92px] uppercase">
            ASK AI
          </p>
          <div className="overflow-clip relative size-6">
            <div className="absolute">
              <img alt="AI Icon" className="block max-w-none size-full" src={imgAIIcon} />
            </div>
          </div>
        </div>

        {/* Menu Button */}
        <button className="absolute flex gap-[10px] h-8 items-center justify-center right-5 rounded-full top-2 cursor-pointer hover:opacity-70 transition-opacity">
          <div className="overflow-clip relative size-6">
            <img alt="Menu" className="block size-full" src={imgHeaderMenu} />
          </div>
        </button>
      </div>

      {/* Chat Content - Scrollable area */}
      <div className="absolute top-[102px] bottom-[80px] left-0 w-[393px] overflow-y-auto">
        <div className="flex flex-col gap-6 w-full">
          {/* Question to AI */}
          <div className="flex flex-col gap-4 items-center w-full">
            {/* Default Text */}
            <div className="px-5 py-[10px] w-full">
              <p className="font-jakarta font-medium leading-normal text-[14px] text-[#cecec9]">
                You can tell me what you're working on or who you'd like to connect with — I'll suggest people who might help.
              </p>
            </div>

            {/* User Message */}
            <div className="flex flex-col gap-[2px] items-end justify-end w-full px-6">
              <div className="bg-[#605cff] flex items-center px-4 py-2 rounded-bl-[16px] rounded-tl-[16px] rounded-tr-[16px] max-w-[301px]">
                <p className="font-jakarta font-medium leading-normal text-[#f7f7f1] text-[14px]">
                  I'm looking for a co-founder interested in building an AI health app.
                </p>
              </div>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex flex-col gap-2 items-start w-full">
            {/* Intro */}
            <div className="px-5 py-[10px] w-full">
              <p className="font-jakarta font-medium leading-normal text-[14px] text-[#f7f7f1]">
                Got it — here's someone and a request aligned with your idea!
              </p>
            </div>

            {/* Divider */}
            <div className="px-5 w-full">
              <div className="bg-[#3d3d3b] h-[0.5px] w-full" />
            </div>

            {/* Recommendation 1 - Dylan Johnson */}
            <div className="px-5 py-2 w-full">
              <div className="flex flex-col gap-1 w-full">
                    {/* Profile Card */}
                    <div
                      onClick={() => navigate('/profile/dylan')}
                      className="app-purple-card box-border flex w-full cursor-pointer items-center justify-center gap-4 rounded-[20px] border px-5 py-3 transition-colors hover:border-[rgba(236,223,255,0.3)]"
                    >
                      {/* Photo */}
                      <div className="flex gap-[10px] items-center overflow-clip rounded-full w-20 h-20 shrink-0">
                        <img
                          alt="Dylan Johnson"
                          className="w-full h-full object-cover"
                          src={imgImage99}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="flex flex-col gap-1 items-start w-full">
                          <div className="flex gap-1 items-center">
                            <p className="font-jakarta font-semibold leading-[1.2] text-[16px] text-[#f7f7f1]">
                              Dylan Johnson
                            </p>
                            <div className="overflow-clip relative size-[22px]">
                              <div className="absolute inset-[8.333%]">
                                <img alt="Verified" className="block max-w-none size-full" src={imgVerifiedCheck} />
                              </div>
                            </div>
                          </div>
                          <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-[#f7f7f1]">
                            AI Engineer @ DeepHealth
                          </p>
                        </div>
                        <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-[#a7a7a3]">
                          Palo Alto, CA
                        </p>
                      </div>
                    </div>

                {/* Reason */}
                <div className="py-1 w-full">
                  <p className="font-jakarta font-medium leading-normal text-[14px] text-[#cecec9]">
                    Dylan is experienced in medical AI startups and has 5 YOE in the healthcare industry.
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="px-5 w-full">
              <div className="bg-[#3d3d3b] h-[0.5px] w-full" />
            </div>

            {/* Recommendation 2 - Nora Patel Request */}
            <div className="px-5 py-1 w-full">
              <div className="flex flex-col gap-1 w-full">
                    {/* Request Card */}
                    <div
                      onClick={() => navigate('/request/nora')}
                      className="app-purple-card box-border flex w-full cursor-pointer items-center justify-center gap-4 rounded-[20px] border px-5 py-3 transition-colors hover:border-[rgba(236,223,255,0.3)]"
                    >
                      <div className="flex flex-col gap-4 items-start flex-1">
                        {/* Basic Info */}
                        <div className="flex flex-col gap-1 items-start w-full">
                          <p className="font-jakarta font-semibold leading-[1.2] text-[16px] text-[#f7f7f1] whitespace-pre-wrap">
                            Seeking technical co-founder for AI wellness app
                          </p>
                          <p className="font-jakarta font-normal leading-[1.2] text-[13px] text-[#a7a7a3]">
                            Networking Request
                          </p>
                        </div>

                        {/* Requester */}
                        <div className="bg-[rgba(92,61,148,0.36)] box-border flex w-full flex-col items-center justify-center gap-4 rounded-[36px] px-3 py-2">
                          <div className="flex gap-3 items-center w-full">
                            {/* Photo */}
                            <div className="flex gap-[10px] items-center overflow-clip rounded-full size-9">
                              <img
                                alt="Nora Patel"
                                className="w-full h-full object-cover"
                                src={imgImage98}
                              />
                            </div>

                            {/* Title */}
                            <div className="flex flex-col items-start flex-1">
                              <div className="flex gap-1 items-center w-full">
                                <p className="font-jakarta font-semibold leading-[1.2] text-[13px] text-white">
                                  Nora Patel
                                </p>
                                <div className="overflow-clip relative size-4">
                                  <div className="absolute inset-[8.333%]">
                                    <img alt="Verified" className="block max-w-none size-full" src={imgVerifiedCheck} />
                                  </div>
                                </div>
                              </div>
                              <p className="font-jakarta font-normal leading-[1.5] text-[12px] text-[#f7f7f1] w-full whitespace-pre-wrap">
                                Ex-PM @ Calm
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                {/* Reason */}
                <div className="py-1 w-full">
                  <p className="font-jakarta font-medium leading-normal text-[14px] text-[#cecec9]">
                    Nora is building similar concept, open to partner though the request.
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="px-5 w-full">
              <div className="bg-[#3d3d3b] h-[0.5px] w-full" />
            </div>

            {/* Closing */}
            <div className="px-5 py-[10px] w-full">
              <p className="font-jakarta font-medium leading-normal text-[14px] text-[#f7f7f1]">
                Want me to suggest a few more options?
              </p>
            </div>

            {/* Buttons */}
            <div className="px-5 pb-4 w-full">
              <div className="flex gap-[10px] items-start">
                <button className="bg-[rgba(50,22,92,0.78)] box-border flex gap-2 items-center px-2 py-1 rounded-lg hover:bg-[rgba(73,35,126,0.78)] transition-colors cursor-pointer">
                  <div className="overflow-clip relative rounded-[3px] size-4">
                    <div className="absolute inset-[5.21%_9.37%_5.21%_9.38%]">
                      <img alt="Like" className="block max-w-none size-full" src={imgLike} />
                    </div>
                  </div>
                </button>

                <button className="bg-[rgba(50,22,92,0.78)] box-border flex gap-2 items-center px-2 py-1 rounded-lg hover:bg-[rgba(73,35,126,0.78)] transition-colors cursor-pointer">
                  <div className="overflow-clip relative rounded-[3px] size-4">
                    <div className="absolute inset-[5.21%_9.37%_5.21%_9.38%] rotate-180">
                      <img alt="Dislike" className="block max-w-none size-full" src={imgLike} />
                    </div>
                  </div>
                </button>

                <button className="bg-[rgba(50,22,92,0.78)] box-border flex gap-2 items-center px-2 py-1 rounded-lg hover:bg-[rgba(73,35,126,0.78)] transition-colors cursor-pointer">
                  <div className="overflow-clip relative size-4">
                    <img alt="Menu" className="block size-full" src={imgMenuDots} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="absolute bottom-6 left-0 z-10 flex h-8 w-[393px] items-center justify-center bg-[rgba(20,9,38,0.8)] shadow-[0px_-1px_0px_0px_rgba(218,196,255,0.08)]">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center w-[353px]">
          {/* Input */}
          <div className="relative h-10 flex-1 overflow-hidden rounded-[20px] border border-[rgba(218,196,255,0.18)] bg-[rgba(29,16,56,0.94)]">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Message AI..."
              className="w-full h-full bg-transparent px-4 text-[#f7f7f1] font-jakarta text-sm focus:outline-none placeholder:text-[#6f6f6c]"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            aria-label="Send message"
            className="size-6 cursor-pointer hover:opacity-70 transition-opacity flex-shrink-0"
          >
            <img alt="Send" className="block w-full h-full" src={SendIcon} />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AIChatPage;
