import { useEffect } from "react";

const useModalScrollLock = (open) => {
  useEffect(() => {
    if (!open) return;

    // 현재 스크롤 위치
    const scrollY = window.scrollY;

    // 스크롤바 너비 계산
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // 스크롤 막기 (스크롤 이벤트 차단)
    const handleWheel = (e) => e.preventDefault();

    // body overflow 유지하면서 스크롤 이벤트 막기
    document.body.style.overflowY = "scroll";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleWheel, { passive: false });

    return () => {
      document.body.style.paddingRight = "";
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleWheel);
    };
  }, [open]);
};

export default useModalScrollLock;
