const LiveIndicator = () => (
  <div className="flex items-center gap-1.5 rounded-[14px] bg-brand-light px-3.5 py-2">
    <span className="inline-block h-2 w-2 rounded-full bg-brand animate-blink" />
    <span className="text-[13px] font-bold text-brand">실시간 업데이트 중</span>
  </div>
);

export default LiveIndicator;
