import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { hStopwatchTimeState, mStopwatchTimeState, sStopwatchTimeState } from '@/recoil/stopwatch/atom';

//스톱워치 플로팅 버튼 구현
export default function StopwatchFloating() {
  const [isStopwatch, setIsStopwatch] = useState(false); //true: 플로팅 버튼의 종료, 일시정지를 보이게 함
  const [isOpen, setIsOpen] = useState(true); //false: 플로팅 버튼 자체가 안보이게 설정할 수 있음
  const [hStopwatchTime, setHStopwatchTime] = useRecoilState(hStopwatchTimeState); //시
  const [mStopwatchTime, setMStopwatchTime] = useRecoilState(mStopwatchTimeState); //분
  const [sStopwatchTime, setSStopwatchTime] = useRecoilState(sStopwatchTimeState); //초
  return (
    <>
      {/* 시분초가 하나라도 0이상이면 플로팅 버튼이 보임 */}
      {hStopwatchTime > 0 || mStopwatchTime > 0 || sStopwatchTime > 0 ? (
        <div className="fixed flex-col inline-flex justify-center items-center bottom-[110px] right-10 gap-2 text-white">
          {isStopwatch ? (
            <div className="flex-col inline-flex gap-2">
              <div
                className="flex-col inline-flex justify-center items-center gap-1 w-[72px] h-[72px] bg-[#D9D9D9] rounded-[999px] text-black"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none" viewBox="0 0 18 19">
                  <path fill="#000" d="M0 .557h18v18H0z" />
                </svg>

                <div className="text-h6">종료</div>
              </div>

              <div className="flex-col inline-flex justify-center items-center gap-1 w-[72px] h-[72px] bg-[#D9D9D9] rounded-[999px] text-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" fill="none" viewBox="0 0 16 22">
                  <path fill="#000" d="M16 10.81.812.121v21.375L16 10.809Z" />
                </svg>

                <div className="text-h6">일시정지</div>
              </div>
            </div>
          ) : null}
          <div
            className="flex-col inline-flex justify-center items-center w-[72px] h-[72px] bg-point rounded-[999px] text-white"
            onClick={() => {
              setIsStopwatch(!isStopwatch);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" fill="none" viewBox="0 0 32 33">
              <mask id="a" width="32" height="33" x="0" y="0" maskUnits="userSpaceOnUse">
                <path fill="#fff" d="M0 .5h32v32H0z" />
              </mask>
              <g mask="url(#a)">
                <path
                  fill="#fff"
                  d="M12.257 4.167v-2h7.487v2h-7.487ZM15 18.91h2v-7.487h-2v7.487Zm1 10.257c-1.559 0-3.026-.298-4.4-.893a11.512 11.512 0 0 1-3.605-2.436 11.512 11.512 0 0 1-2.436-3.605 10.956 10.956 0 0 1-.892-4.4c0-1.559.297-3.025.892-4.4a11.512 11.512 0 0 1 2.436-3.605A11.512 11.512 0 0 1 11.6 7.392 10.956 10.956 0 0 1 16 6.5c1.335 0 2.621.227 3.858.68a12.275 12.275 0 0 1 3.445 1.946l1.661-1.662L26.37 8.87l-1.661 1.662a12.277 12.277 0 0 1 1.946 3.445 11.13 11.13 0 0 1 .68 3.857c0 1.56-.298 3.026-.893 4.4a11.51 11.51 0 0 1-2.436 3.605 11.51 11.51 0 0 1-3.605 2.436 10.956 10.956 0 0 1-4.4.893Zm0-2c2.578 0 4.778-.912 6.6-2.734s2.733-4.022 2.733-6.6c0-2.577-.91-4.777-2.733-6.6C20.778 9.411 18.578 8.5 16 8.5c-2.578 0-4.778.911-6.6 2.733s-2.733 4.022-2.733 6.6c0 2.578.91 4.778 2.733 6.6 1.822 1.823 4.022 2.734 6.6 2.734Z"
                />
              </g>
            </svg>
            {hStopwatchTime < 1 ? ( //1시간 이하일 때는 분, 초가 보이도록 설정 / 1시간 이상일 때는 시, 분이 보이도록 설정
              <div>
                {mStopwatchTime.toString().padStart(2, '0')} : {sStopwatchTime.toString().padStart(2, '0')}
              </div>
            ) : (
              <div>
                {hStopwatchTime.toString().padStart(2, '0')} : {mStopwatchTime.toString().padStart(2, '0')}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
