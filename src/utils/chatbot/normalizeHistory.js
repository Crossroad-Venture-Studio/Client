import ChatBubble from '../../core/components/atoms/ChatBubble';
import ChatTextLoader from '../../core/components/atoms/ChatTextLoader';

// Helper function to extract the date string.
const getDate = date => {
  if (!date) return '';
  date instanceof Date || (date = new Date(date));
  const s = date.toString(), y = date.getFullYear().toString();
  return s.slice(0, s.indexOf(y) + y.length);
}

// Date line component.
const DateLine = props => <div className='row width-100-percent center text-gap text-color-semi-dark font-size-22-28 bold margin-vertical'>
  {props.date}
</div>;

// Helper function to normalize conversation history data.
export const normalizeHistory = (history, botName = 'Chatbot', botSrc) => {
  const output = [];

  // Add dates.
  let date = null, d;
  for (let i = 0, l = (history || (history = [])).length, user, curUser, item, out, j = 0; i !== l; ++i) {
    item = history[i];
    if (!item || typeof item !== 'object' || !item.data || typeof item.data !== 'object' ) continue;
    ((d = getDate(item.data.__date__)) === date) || (
      output.push({
        component: <DateLine date={d} />
      }),
      date = d
    );
    output.push(out = {});
    // is user / start / end
    out.__is_user__ = !(curUser = item.type);
    (out.__is_start__ = user !== curUser)
      && (output.length - 1)
      && (output[output.length - 2].__is_end__ = true);

    item.component && (out.component = item.component);

    if (!item.data || typeof item.data !== 'object' ) continue;
    // other
    Object.assign(out, item.data);

    // text
    out.text = item.data.text;
    
    // name
    out.name = item.data.name || item.data.botName
      || (out.__is_user__ && (item.data.name || 'You') || botName);

    // pic
    out.pic = item.data.picSrc || item.data.pic || item.data.botSrc || botSrc
      || (!out.__is_user__ && botSrc);

    user = curUser;
  }

  // Add bubbles
  output.length && (
    output[0].__is_start__ = true,
    output[output.length - 1].__is_end__ = true,
    output[output.length - 1].__is_user__ && output.push({
      component: <ChatBubble><ChatTextLoader size='xsmall'/></ChatBubble>,
      name: botName,
      date: Date.now()
    }),
    output[output.length - 1].__is_end__ = true
  ) || (
    date = Date.now(),
    d = getDate(date),
    output.push({
      component: <DateLine date={d} />
    }),
    output.push({
      component: <ChatBubble><ChatTextLoader size='xsmall'/></ChatBubble>,
      name: botName,
      date,
      __is_end__: true
    })
  );

  // Return history.
  return output;
}

// Default export.
export default normalizeHistory;