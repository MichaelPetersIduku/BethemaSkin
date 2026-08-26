import recommendationBadge from "../assets/images/recommendation-badge.svg";

function openBethemaChat() {
  window.dispatchEvent(new Event("open-bethema-chat"));
}

export function RecommendationFab() {
  return (
    <button onClick={openBethemaChat} className="fixed bottom-28 right-4 z-40 w-[100px] h-[85px]" aria-label="Need recommendations? Tap here to ask Bethema">
      <img src={recommendationBadge} alt="" className="absolute inset-0 w-full h-full" />
      <span className="relative z-10 flex h-full items-center justify-center text-center font-['Syne',_sans-serif] font-medium text-xs text-[#2b2724] px-3 leading-tight">
        Need recommen­dations? Tap here!
      </span>
    </button>
  );
}
