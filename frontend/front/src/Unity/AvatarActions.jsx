export let actionStatus = { "setting": false, "start": false, "rootSearch": false, "finishPootSearch": false, "decideRoot": false, "move": false, "arrive": false };

export const changeAllStatus = (isAllStatus) => {
  actionStatus.setting = isAllStatus;
  actionStatus.start = isAllStatus;
  actionStatus.rootSearch = isAllStatus;
  actionStatus.finishPootSearch = isAllStatus;
  actionStatus.decideRoot = isAllStatus;
  actionStatus.move = isAllStatus;
  actionStatus.arrive = isAllStatus;
};

export function awake(sendMessage) {
  sendMessage("ChatdollKitVRM", "awake");
}

export function sleep(sendMessage) {
  sendMessage("ChatdollKitVRM", "sleep");
}

export function setting(sendMessage) {
  console.log("click settings")
  changeAllStatus(false);
  actionStatus.setting = true;
  console.log(actionStatus.setting);
  sendMessage("ChatdollKitVRM", "setting");
}

export function start(sendMessage) {
  changeAllStatus(false);
  actionStatus.start = true;
  sendMessage("ChatdollKitVRM", "start");
}

export function rootSearch(sendMessage) {
  changeAllStatus(false);
  actionStatus.rootSearch = true;
  sendMessage("ChatdollKitVRM", "rootSearch");
}

export function finishRootSearch(sendMessage) {
  changeAllStatus(false);
  actionStatus.finishPootSearch = true;
  sendMessage("ChatdollKitVRM", "finishRootSearch");
}

export function decideRoot(sendMessage) {
  changeAllStatus(false);
  actionStatus.decideRoot = true;
  sendMessage("ChatdollKitVRM", "decideRoot");
}

export function move(sendMessage, moveSectionId) {
  changeAllStatus(false);
  actionStatus.move = true;
  sendMessage("ChatdollKitVRM", "move", moveSectionId);
}

export function arrive(sendMessage, arrivePlace) {
  changeAllStatus(false);
  actionStatus.arrive = true;
  sendMessage("ChatdollKitVRM", "arrive", arrivePlace);
}

export function sendMessageToAvatar(sendMessage, userMessage) {
  sendMessage("ChatdollKitVRM", "sendMessageToAvatar", userMessage);
}
