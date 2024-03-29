/**
* @param eventName - The endpoint eventname to target
* @param data - Data you wish to send in the NUI Callback
*
* @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
*/

export async function callEvent(eventName, data = {}) {
    if (typeof Events === 'undefined')
        return
    
    Events.Call(eventName, data);
}
