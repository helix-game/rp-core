/**
* @param eventName - The endpoint eventname to target
* @param data - Data you wish to send in the NUI Callback
*
* @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
*/

export async function fetchNui(
  eventName,
  data = {}
) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  const resourceName = (window).GetParentResourceName
    ? (window).GetParentResourceName()
    : "nui-frame-app";

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);

  return await resp.json();
}
