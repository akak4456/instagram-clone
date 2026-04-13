export const ACTIVE_CARD_HEIGHT = "90vh";
export const ACTIVE_CARD_WIDTH = "calc(90vh * 9 / 16)";
export const CARD_RATIO = "9 / 16";
export const CARD_SPACING = "48px";

export const NAV_GAP = "8px";
export const NAV_SIZE = "24px";

export const getScale = (offset) => {
  if (offset === 0) return 1;
  return 0.5;
};

export const getTranslateX = (offset) => {
  if (offset === 0) return "0px";

  const centerScale = getScale(0);
  const sideScale = getScale(1);

  const level1 = `calc((${ACTIVE_CARD_WIDTH} * ${centerScale}) / 2 + ${CARD_SPACING} + (${ACTIVE_CARD_WIDTH} * ${sideScale}) / 2)`;
  const level2 = `calc((${ACTIVE_CARD_WIDTH} * ${sideScale}) / 2 + ${CARD_SPACING} + (${ACTIVE_CARD_WIDTH} * ${sideScale}) / 2)`;

  if (offset === 1) return level1;
  if (offset === -1) return `calc(-1 * ${level1})`;

  if (offset === 2) return `calc(${level1} + ${level2})`;
  if (offset === -2) return `calc(-1 * (${level1} + ${level2}))`;

  return "0px";
};

export const getZIndex = (offset) => {
  if (offset === 0) return 10;
  if (Math.abs(offset) === 1) return 6;
  if (Math.abs(offset) === 2) return 4;
  return 1;
};
