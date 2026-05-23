import svgPaths from "./svg-jzb8z51osz";

function Frame1() {
  return (
    <div className="absolute content-stretch flex items-start left-0 top-[4px]">
      <div className="bg-[#fafafa] content-stretch flex flex-col h-[8px] items-center justify-center relative shrink-0" data-name="Thumb">
        <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#fafafa] text-[4px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">........</p>
        </div>
      </div>
      <div className="bg-[#c1c1c1] content-stretch flex flex-col h-[8px] items-center justify-center relative rounded-[4px] shrink-0 w-[468px]" data-name="Thumb">
        <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#c1c1c1] text-[4px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">.. ....................</p>
        </div>
      </div>
    </div>
  );
}

function Scrollbar() {
  return (
    <div className="absolute h-[15px] left-[291px] top-[1268px] w-[1121px]" data-name="Scrollbar">
      <div aria-hidden="true" className="absolute bg-[#fafafa] inset-0 pointer-events-none" />
      <Frame1 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_#e8e8e8,inset_0px_-1px_0px_0px_#f0f0f0]" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#43afde] text-[16px] whitespace-nowrap">Learn more</p>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/information-circle">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p2745e280} id="Icon" stroke="var(--stroke-0, #43AFDE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] whitespace-nowrap">Complete quests to collect Gems and redeem exclusive prizes!</p>
      <Frame13 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[48px] top-[28px]">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#374151] text-[26px] whitespace-nowrap">Goose Games</p>
      <Frame12 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[#f3f4f6] border-[rgba(0,0,0,0.1)] border-b border-solid h-[121px] left-[271px] overflow-clip top-0 w-[1169px]">
      <div className="absolute h-[121px] left-0 top-0 w-[1172px]" data-name="bg" />
      <Frame5 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#43afde] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[20px] py-[10px] relative rounded-[inherit] size-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/document-add">
          <div className="absolute inset-[12.5%_20.83%]" data-name="Icon">
            <div className="absolute inset-[-5.56%_-7.14%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
                <path d={svgPaths.p553280} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">Create new quest</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2395c6] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#374151] text-[26px] whitespace-nowrap">Quests</p>
      <Button />
    </div>
  );
}

function Label() {
  return (
    <div className="bg-[#eadff9] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/qrcode">
        <div className="absolute inset-[16.67%_16.62%_16.67%_16.67%]" data-name="Icon">
          <div className="absolute inset-[-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.01 18">
              <path d={svgPaths.p180d3700} fill="var(--stroke-0, #9344ED)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">5 each</p>
    </div>
  );
}

function Chips() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label1 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Get meals</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text />
    </div>
  );
}

function Frame20() {
  return (
    <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1 w-full">
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <Frame20 />
      <p className="[word-break:break-word] col-1 font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] ml-0 mt-[14px] relative row-1 text-[#9ca3af] text-[12px] w-[37%]">Maximum 8 scans</p>
    </div>
  );
}

function Label2() {
  return (
    <div className="bg-[#eadff9] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/qrcode">
        <div className="absolute inset-[16.67%_16.62%_16.67%_16.67%]" data-name="Icon">
          <div className="absolute inset-[-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.01 18">
              <path d={svgPaths.p180d3700} fill="var(--stroke-0, #9344ED)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">5 each</p>
    </div>
  );
}

function Chips1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label2 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label3 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Participate in activities</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text1 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1 w-full">
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <Frame21 />
      <p className="[word-break:break-word] col-1 font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] ml-0 mt-[14px] relative row-1 text-[#9ca3af] text-[12px] w-[37%]">Maximum 10 scans</p>
    </div>
  );
}

function Label4() {
  return (
    <div className="bg-[#eadff9] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/qrcode">
        <div className="absolute inset-[16.67%_16.62%_16.67%_16.67%]" data-name="Icon">
          <div className="absolute inset-[-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.01 18">
              <path d={svgPaths.p180d3700} fill="var(--stroke-0, #9344ED)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label5() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">5 each</p>
    </div>
  );
}

function Chips2() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label4 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label5 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Attend workshops</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text2 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1 w-full">
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <Frame22 />
      <p className="[word-break:break-word] col-1 font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] ml-0 mt-[14px] relative row-1 text-[#9ca3af] text-[12px] w-[37%]">Maximum 10 scans</p>
    </div>
  );
}

function Label6() {
  return (
    <div className="bg-[#fae4ff] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/globe">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p3d8a44f0} id="Icon" stroke="var(--stroke-0, #DA3EC3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label7() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">5 each</p>
    </div>
  );
}

function Chips3() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label6 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label7 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Network with sponsors</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text3 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1 w-full">
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <Frame24 />
      <p className="[word-break:break-word] col-1 font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] ml-0 mt-[14px] relative row-1 text-[#9ca3af] text-[12px] w-[37%]">Maximum 10 scans</p>
    </div>
  );
}

function Label8() {
  return (
    <div className="bg-[#fae4ff] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/globe">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p3d8a44f0} id="Icon" stroke="var(--stroke-0, #DA3EC3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label9() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">2 each</p>
    </div>
  );
}

function Chips4() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label8 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label9 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Network with hackers</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text4 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1 w-full">
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
      <div className="bg-[#e5e7eb] flex-[1_0_0] h-[10px] min-w-px relative rounded-[999px]" />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <Frame26 />
      <p className="[word-break:break-word] col-1 font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] ml-0 mt-[14px] relative row-1 text-[#9ca3af] text-[12px] w-[37%]">Maximum 10 scans</p>
    </div>
  );
}

function Label10() {
  return (
    <div className="bg-[#eadff9] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/qrcode">
        <div className="absolute inset-[16.67%_16.62%_16.67%_16.67%]" data-name="Icon">
          <div className="absolute inset-[-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.01 18">
              <path d={svgPaths.p180d3700} fill="var(--stroke-0, #9344ED)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label11() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">20</p>
    </div>
  );
}

function Chips5() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label10 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label11 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Registration</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text5 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">Welcome to Hack the North! Check in at our registration desk.</p>
    </div>
  );
}

function Label12() {
  return (
    <div className="bg-[#eadff9] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/qrcode">
        <div className="absolute inset-[16.67%_16.62%_16.67%_16.67%]" data-name="Icon">
          <div className="absolute inset-[-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.01 18">
              <path d={svgPaths.p180d3700} fill="var(--stroke-0, #9344ED)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label13() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">20</p>
    </div>
  );
}

function Chips6() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label12 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label13 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Attend opening ceremonies</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text6 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">Get ready for the coolest presentation of the event! Join us at Laz Hall for opening.</p>
    </div>
  );
}

function Label14() {
  return (
    <div className="bg-[#eadff9] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/qrcode">
        <div className="absolute inset-[16.67%_16.62%_16.67%_16.67%]" data-name="Icon">
          <div className="absolute inset-[-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.01 18">
              <path d={svgPaths.p180d3700} fill="var(--stroke-0, #9344ED)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label15() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">30</p>
    </div>
  );
}

function Chips7() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label14 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label15 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Present your project</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text7 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">You’ve grinded out your project the entire weekend. Show the judges!</p>
    </div>
  );
}

function Label16() {
  return (
    <div className="bg-[#fffbeb] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/chat-alt-2">
        <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.pc618c00} id="Icon" stroke="var(--stroke-0, #F99828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label17() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">5</p>
    </div>
  );
}

function Chips8() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label16 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label17 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">How old is Hack the North?</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text8 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">We’ve been at it for a while. But how long exactly? Answer is a number in years.</p>
    </div>
  );
}

function Label18() {
  return (
    <div className="bg-[#fffbeb] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/chat-alt-2">
        <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.pc618c00} id="Icon" stroke="var(--stroke-0, #F99828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label19() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">10</p>
    </div>
  );
}

function Chips9() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label18 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label19 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">How many hackers are attendin</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[82px] items-start overflow-clip relative shrink-0 w-full">
      <Text9 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium h-[44px] leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">Answer is a number within 10.</p>
    </div>
  );
}

function Label20() {
  return (
    <div className="bg-[#fffbeb] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/chat-alt-2">
        <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.pc618c00} id="Icon" stroke="var(--stroke-0, #F99828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label21() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">10</p>
    </div>
  );
}

function Chips10() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label20 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label21 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Name every organizer</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text10 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">List all organizers in alphabetical order. Hint: Follow the digital cave carts</p>
    </div>
  );
}

function Label22() {
  return (
    <div className="bg-[#fffbeb] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/chat-alt-2">
        <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.pc618c00} id="Icon" stroke="var(--stroke-0, #F99828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label23() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">15</p>
    </div>
  );
}

function Chips11() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label22 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label23 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Secret word</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text11 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">Sponsors have been given secret words, find all 4 and reorder the sentence!</p>
    </div>
  );
}

function Label24() {
  return (
    <div className="bg-[#fffbeb] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/chat-alt-2">
        <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.pc618c00} id="Icon" stroke="var(--stroke-0, #F99828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label25() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">15</p>
    </div>
  );
}

function Chips12() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label24 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label25 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Goose Whisperer</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text12 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">Secret letters are hidden around signs, marked by a goose. Find all # letters and</p>
    </div>
  );
}

function Label26() {
  return (
    <div className="bg-[#fffbeb] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/chat-alt-2">
        <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.pc618c00} id="Icon" stroke="var(--stroke-0, #F99828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label27() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">5</p>
    </div>
  );
}

function Chips13() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label26 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label27 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Record Breaker</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text13 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">{`If you participated in the Guiness World Record at Opening Ceremonies, enter the `}</p>
    </div>
  );
}

function Label28() {
  return (
    <div className="bg-[#dff9f4] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/cog">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="Icon">
                <path d={svgPaths.p3a5c80} stroke="var(--stroke-0, #1AB3B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p2bf13170} stroke="var(--stroke-0, #1AB3B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label29() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">5</p>
    </div>
  );
}

function Chips14() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label28 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label29 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Do the griddy for Ivan</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text14 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">Find an organizer named Ivan and do the griddy for him.</p>
    </div>
  );
}

function Label30() {
  return (
    <div className="bg-[#dff9f4] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/cog">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="Icon">
                <path d={svgPaths.p3a5c80} stroke="var(--stroke-0, #1AB3B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p2bf13170} stroke="var(--stroke-0, #1AB3B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label31() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">15</p>
    </div>
  );
}

function Chips15() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label30 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label31 />
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Post a picture</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text15 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">Post a picture about HTN on any social media and tag us @hackthenorth.</p>
    </div>
  );
}

function Label32() {
  return (
    <div className="bg-[#dff9f4] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/cog">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="Icon">
                <path d={svgPaths.p3a5c80} stroke="var(--stroke-0, #1AB3B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p2bf13170} stroke="var(--stroke-0, #1AB3B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label33() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">25</p>
    </div>
  );
}

function Chips16() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label32 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label33 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Post a video</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text16 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">{`Post a video about what you are building at HTN on any social media and tag us `}</p>
    </div>
  );
}

function Label34() {
  return (
    <div className="bg-[#dff9f4] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/cog">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="Icon">
                <path d={svgPaths.p3a5c80} stroke="var(--stroke-0, #1AB3B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p2bf13170} stroke="var(--stroke-0, #1AB3B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label35() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">25</p>
    </div>
  );
}

function Chips17() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label34 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label35 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Find the golden geese</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text17 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">{`We've hid golden geese around E7. Find one and bring it to The Nest to claim this`}</p>
    </div>
  );
}

function Label36() {
  return (
    <div className="bg-[#dff9f4] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/cog">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="Icon">
                <path d={svgPaths.p3a5c80} stroke="var(--stroke-0, #1AB3B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p2bf13170} stroke="var(--stroke-0, #1AB3B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label37() {
  return (
    <div className="bg-[#43afde] content-stretch flex gap-[4px] items-center px-[9.189px] py-[4px] relative rounded-[27.568px] shrink-0" data-name="Label">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
        <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
              <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">25</p>
    </div>
  );
}

function Chips18() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Chips">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label36 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Chip">
        <Label37 />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Castledown:Heavy',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f2937] text-[20px] w-full">Take a picture with Jasmine</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Text18 />
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">Find an organizer named Jasmine and ask her for a picture.</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-start flex flex-wrap gap-[24px] items-start relative shrink-0 w-[1074px]">
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] h-[170px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips />
        <Frame17 />
        <Group />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] h-[170px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips1 />
        <Frame18 />
        <Group1 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] h-[170px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips2 />
        <Frame19 />
        <Group2 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] h-[170px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips3 />
        <Frame23 />
        <Group3 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] h-[170px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips4 />
        <Frame25 />
        <Group4 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[341px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips5 />
        <Frame15 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[341px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips6 />
        <Frame16 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips7 />
        <Frame27 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[341px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips8 />
        <Frame28 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] h-[170px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips9 />
        <Frame29 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips10 />
        <Frame30 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips11 />
        <Frame31 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips12 />
        <Frame32 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips13 />
        <Frame33 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips14 />
        <Frame34 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[341px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips15 />
        <Frame35 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips16 />
        <Frame36 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[342px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips17 />
        <Frame37 />
      </div>
      <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shrink-0 w-[341px]" data-name="Quest card">
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Chips18 />
        <Frame38 />
      </div>
    </div>
  );
}

function Questions() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[24px] items-start left-[271px] pb-[48px] pt-[36px] px-[48px] top-[121px] w-[1169px]" data-name="Questions">
      <Frame14 />
      <Frame11 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[20px] top-[129px]">
      <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#6b7280] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Goose games</p>
      <div className="bg-[#e5e7eb] content-stretch flex gap-[8px] items-center px-[24px] py-[8px] relative rounded-[8px] shrink-0 w-[228px]" data-name="Page">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/template">
          <div className="absolute inset-[16.67%]" data-name="Icon">
            <div className="absolute inset-[-6.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                <g id="Icon">
                  <path d={svgPaths.p110c4700} stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p13a0b800} stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p133f7580} stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] whitespace-nowrap">Quests</p>
      </div>
      <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[8px] relative rounded-[8px] shrink-0 w-[228px]" data-name="Page">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/gem">
          <div className="absolute inset-[16.67%_12.5%_15.91%_8.33%]" data-name="Icon">
            <div className="absolute inset-[-5.89%_-5.26%_-6.18%_-5.26%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18.1351">
                <path d={svgPaths.p2f556000} id="Icon" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] whitespace-nowrap">Store</p>
      </div>
      <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[8px] relative rounded-[8px] shrink-0 w-[228px]" data-name="Page">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/users">
          <div className="absolute inset-[12.5%]" data-name="Icon">
            <div className="absolute inset-[-5.56%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path d={svgPaths.p26d24980} id="Icon" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] whitespace-nowrap">Hackers</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[53px] top-[34px]">
      <div className="h-[29.926px] relative shrink-0 w-[31.532px]" data-name="logo">
        <div className="absolute inset-[0.1%_0.03%_-0.1%_-0.03%]" data-name="Combined Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.532 29.9264">
            <path clipRule="evenodd" d={svgPaths.p3ef6e00} fill="var(--fill-0, #6B7280)" fillRule="evenodd" id="Combined Shape" />
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] font-['Satoshi_Variable:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[#6b7280] text-[16px] whitespace-nowrap">
        <p className="leading-[normal] mb-0">Organizer</p>
        <p className="leading-[normal]">Dashboard</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Satoshi_Variable:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#6b7280] text-[16px] whitespace-nowrap">
        <p className="leading-[1.6]">Jessica Zhang</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p1383d900} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[30px] px-[8px] py-[4px] rounded-[4px] top-[19px] w-[223px]">
      <Frame10 />
      <Frame />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t bottom-0 h-[67px] left-0 overflow-clip w-[271px]">
      <Frame6 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#f6f8fa] border-[#d1d5db] border-r border-solid h-[1024px] left-0 overflow-clip top-0 w-[271px]" data-name="Sidebar">
      <Frame8 />
      <Frame7 />
      <Frame3 />
      <div className="absolute bg-white left-[30px] rounded-[6px] top-[863px] w-[224px]" data-name="Dropdown">
        <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[3px] items-start py-[8px] relative shrink-0" data-name="Dropdown/Menu section">
            <div className="content-stretch flex items-center px-[16px] py-[8px] relative shrink-0 w-[224px]" data-name="Dropdown/Menu item">
              <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#1f2937] text-[16px] whitespace-nowrap">Settings</p>
            </div>
            <div className="content-stretch flex items-center px-[16px] py-[8px] relative shrink-0 w-[224px]" data-name="Dropdown/Menu item">
              <p className="[word-break:break-word] font-['Satoshi_Variable:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#1f2937] text-[16px] whitespace-nowrap">Sign out</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)]" />
      </div>
    </div>
  );
}

export default function OrganizerViewQuests() {
  return (
    <div className="bg-white relative size-full" data-name="Organizer View - Quests">
      <Scrollbar />
      <Frame4 />
      <Questions />
      <Sidebar />
    </div>
  );
}