/**
* @param eventName - The endpoint eventname to target
* @param data - Data you wish to send in the NUI Callback
*
* @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
*/

var callbackHandler = {}

export async function fetchEvent(eventName, data = {}) {
  if (typeof Events === 'undefined')
    return

  if (!callbackHandler[eventName])
    callbackHandler[eventName] = 0

  callbackHandler[eventName]++;

  var callbackId = callbackHandler[eventName];

  return new Promise((resolve) => {
    const callback = (_eventName, data) => {
      resolve(data);
    };

    Events.Subscribe("EventCallback:" + callbackId, callback);
    Events.Call("EventCallback", eventName, {...data, callbackId});
  });  
}
