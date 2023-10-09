import { animateScroll } from 'react-scroll';

export const scrollToBottom = () => {
  animateScroll.scrollToBottom({
    duration: 600,
    delay: 5,
    smooth: 'linear',
  });
};