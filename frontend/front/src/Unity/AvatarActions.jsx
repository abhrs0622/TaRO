export function awake(sendMessage) {
  sendMessage("ChatdollKitVRM", "awake");
}

export function sleep(sendMessage) {
  sendMessage("ChatdollKitVRM", "sleep");
}

export function setting(sendMessage) {
  sendMessage("ChatdollKitVRM", "setting");
}

export function start(sendMessage) {
  sendMessage("ChatdollKitVRM", "start");
}

export function rootSearch(sendMessage) {
  sendMessage("ChatdollKitVRM", "rootSearch");
}

export function finishRootSearch(sendMessage) {
  sendMessage("ChatdollKitVRM", "finishRootSearch");
}

export function decideRoot(sendMessage) {
  sendMessage("ChatdollKitVRM", "decideRoot");
}

export function move(sendMessage, moveSectionId) {
  sendMessage("ChatdollKitVRM", "move", moveSectionId);
}

export function arrive(sendMessage, arrivePlace) {
  sendMessage("ChatdollKitVRM", "arrive", arrivePlace);
}

export function sendMessageToAvatar(sendMessage, userMessage) {
  sendMessage("ChatdollKitVRM", "sendMessageToAvatar", userMessage);
}
