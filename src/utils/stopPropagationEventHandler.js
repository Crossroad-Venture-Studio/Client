export const stopPropagationEventHandler = event => {
  event.cancelBubble = true;
  event.stopPropagation();
}
export default stopPropagationEventHandler;