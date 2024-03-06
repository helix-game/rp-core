import { onMount, onDestroy } from "svelte";

/**
 * A function that manage events listeners for receiving data from the client scripts
 * @param action The specific `action` that should be listened for.
 * @param handler The callback function that will handle data relayed by this function
 *
 * @example
 * useNuiEvent<{visibility: true, wasVisible: 'something'}>('setVisible', (data) => {
 *   // whatever logic you want
 * })
 *
 **/

export function useEvent(action, handler) {
  if (typeof Events === 'undefined')
    return
  
  const eventListener = (event) => handler(event);

  Events.Subscribe(action, eventListener)
}
