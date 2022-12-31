import { MESSAGES_MAX_CONSECUTIVE_AMOUNT, MESSAGES_TIMEOUT_MS } from '../constants';
import { User } from './../types/User';

// Track the time between a message and MESSAGES_TIMEOUT_MS
// If user sends more than MESSAGES_MAX_CONSECUTIVE_AMOUNT
// they should be blocked from sending messages until MESSAGES_TIMEOUT_MS has ended
function rateLimitUser(user: User) {
  const currentTime = +new Date();

  function resetTimeout() {
    user.messageLimitStartTime = currentTime;
    user.messageCountWhileLimited = 0;
  }

  // First message, no timeout ever applied
  if (!user.messageLimitStartTime || user.messageCountWhileLimited === undefined) {
    resetTimeout();

    return;
  }

  // Timeout has ran out
  const isPastMessageLimitTime = user.messageLimitStartTime + MESSAGES_TIMEOUT_MS <= currentTime;

  if (!user.messageLimitStartTime || isPastMessageLimitTime) {
    resetTimeout();

    return;
  }

  // If user is trying to send message while limited
  // restart the timer
  if (
    user.messageCountWhileLimited &&
    MESSAGES_MAX_CONSECUTIVE_AMOUNT < user.messageCountWhileLimited
  ) {
    user.messageLimitStartTime = currentTime;
  }
  user.messageCountWhileLimited++;
}

export function isUserSpamming(user: User) {
  rateLimitUser(user);

  if (
    user.messageCountWhileLimited &&
    MESSAGES_MAX_CONSECUTIVE_AMOUNT < user.messageCountWhileLimited
  ) {
    return true;
  }

  return false;
}
