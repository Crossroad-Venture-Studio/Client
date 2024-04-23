let CNT = 0;
export const genKeyAttr = () => `${Math.random()}-${++CNT}`;
export default genKeyAttr;