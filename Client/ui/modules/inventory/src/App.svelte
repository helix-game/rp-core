<script>
    import INVENTORY_STATES from "./state";

    import DragHandler from "./components/DragHandler.svelte";
    import OtherInventoryView from "./components/InventoryViews/OtherInventoryView.svelte";
    import PersonalView from "./components/InventoryViews/PersonalView.svelte";
    import ItemNotifications from "./components/ItemNotifications.svelte";
    import Backdrop from "./components/Backdrop.svelte";
    import NearbyInventoriesView from "./components/InventoryViews/NearbyInventoriesView.svelte";
    import GiveItemMenu from "./components/GiveItemMenu.svelte";

    import {
        inventory_visible,
        dragging,
        inventory_state,
        inventoryData as inventory_data,
        focusedInventory,
        otherInventoryData,
        closeContext,
    } from "./store/stores";

    import DropItemMenu from "./components/DropItemMenu.svelte";
    import ContextMenu from "./components/ContextMenu.svelte";
    import { onMount } from "svelte";

    var giveMenuActive = false;
    var giveMenuData = {};

    var dropMenuActive = false;
    var dropMenuData = {};

    var inventoriesNearby = [];

    const handleDragEnd = (e) => {
        // Slot not found
        if (!e.detail) {
            return;
        }

        var { fromSlot, toSlot } = e.detail;

        // Placed it on itself
        if (
            fromSlot.slot == toSlot.slot &&
            fromSlot.name == toSlot.name &&
            fromSlot.extra == toSlot.extra &&
            fromSlot.id == toSlot.id
        )
            return;

        Events.Call("AttemptSlotMovement", { fromSlot, toSlot });
    };

    const parseData = (arr) => {
        var isArray = !Array.isArray(arr);
        if (isArray && typeof arr == "object") return arr;

        if (isArray) return {};

        var obj = {};

        arr.forEach((x) => {
            obj[x.slot] = x;
        });

        return obj;
    };

    const giveItemToPlayer = (e) => {
        giveMenuData = {
            type: "positive",
            inventory: {
                name: e.detail.name,
                extra: e.detail.extra,
            },
            item: e.detail.item,
        };

        if (typeof Events !== "undefined") Events.Call("GetNearbyPlayers");
        else {
            setTimeout(() => {
                giveMenuData.players = [
                    {
                        distance: 1,
                        name: "Opod",
                        profilePicture: "https",
                        source: 10,
                    },
                ];
            }, 500);
        }

        giveMenuActive = true;
    };

    const dropItem = (e) => {
        dropMenuActive = true;
        dropMenuData = {
            type: "negative",
            item: e.detail.item,
            inventory: {
                extra: e.detail.extra,
                name: e.detail.name,
            },
            source: {
                profile:
                    "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
                name: "Opod",
            },
        };
    };

    // onMount(() => {
    //     let nearbyInventories;
    //     let inventoryData = {
    //         id: "34",
    //         pockets: {
    //             "2": {
    //                 count: 1,
    //                 description:
    //                     "The elixir of life, conveniently packaged in a bottle. Guaranteed to make you feel hydrated and environmentally conscious.",
    //                 inventoryType: "pockets",
    //                 label: "Water Bottle",
    //                 name: "water",
    //                 rarity: "Common",
    //                 slot: 2,
    //                 type: "drink",
    //                 unique: false,
    //                 weight: 0.1,
    //             },
    //         },
    //         slots: [],
    //         weight: [0.1, 100],
    //     };

    //     let source = {
    //         name: "Opod",
    //         profile:
    //             "https://helix-social.s3.amazonaws.com/profile/ab37df1b-982b-4554-9216-a13a292fe2ed.jpeg",
    //     };

    //     let forceOpen = true;

    //     var newInventoryData = {
    //         id: inventoryData.id,
    //         pockets: parseData(inventoryData.pockets),
    //         slots: parseData(inventoryData.slots),
    //         label: "Your Inventory",
    //         weight: inventoryData.weight,
    //         source: source,
    //     };

    //     if ($focusedInventory && nearbyInventories) {
    //         nearbyInventories.forEach((x) => {
    //             if (x.id == $focusedInventory) {
    //                 if (x.pockets) x.pockets = parseData(x?.pockets);
    //                 if (x.slots) x.slots = parseData(x?.slots);

    //                 otherInventoryData.set(x);
    //                 return;
    //             }
    //         });
    //     }

    //     if (forceOpen) {
    //         focusedInventory.set(null);
    //         if (nearbyInventories) {
    //             inventoriesNearby = nearbyInventories;
    //             inventory_state.set(INVENTORY_STATES.INVENTORY_BROWSE);
    //         } else {
    //             inventory_state.set(INVENTORY_STATES.PERSONAL_INVENTORY);
    //         }
    //     } else {
    //         if (
    //             nearbyInventories &&
    //             $inventory_state !== INVENTORY_STATES.OTHER_INVENTORY
    //         ) {
    //             inventoriesNearby = nearbyInventories;
    //             inventory_state.set(INVENTORY_STATES.INVENTORY_BROWSE);
    //         } else if (!nearbyInventories) {
    //             inventory_state.set(INVENTORY_STATES.PERSONAL_INVENTORY);
    //         }
    //     }

    //     inventory_data.set(newInventoryData);
    //     inventory_visible.set(true);
    // });

    // onMount(() => {
    //     let inventoryData = {
    //         "id": "48",
    //         "pockets": [],
    //         "slots": [],
    //         "weight": [
    //             0,
    //             100
    //         ]
    //     }
        
    //     var newInventoryData = {
    //         id: inventoryData.id,
    //         pockets: parseData(inventoryData.pockets),
    //         slots: parseData(inventoryData.slots),
    //         label: "Your Inventory",
    //         weight: inventoryData.weight,
    //         source: source,
    //     };

    //     if ($focusedInventory && nearbyInventories) {
    //         nearbyInventories.forEach((x) => {
    //             if (x.id == $focusedInventory) {
    //                 if (x.pockets) x.pockets = parseData(x?.pockets);
    //                 if (x.slots) x.slots = parseData(x?.slots);

    //                 otherInventoryData.set(x);
    //                 return;
    //             }
    //         });
    //     }

    //     if (forceOpen) {
    //         focusedInventory.set(null);
    //         if (nearbyInventories) {
    //             inventoriesNearby = nearbyInventories;
    //             inventory_state.set(INVENTORY_STATES.INVENTORY_BROWSE);
    //         } else {
    //             inventory_state.set(
    //                 INVENTORY_STATES.PERSONAL_INVENTORY,
    //             );
    //         }
    //     } else {
    //         if (
    //             nearbyInventories &&
    //             $inventory_state !== INVENTORY_STATES.OTHER_INVENTORY
    //         ) {
    //             inventoriesNearby = nearbyInventories;
    //             inventory_state.set(INVENTORY_STATES.INVENTORY_BROWSE);
    //         } else if (!nearbyInventories) {
    //             inventory_state.set(
    //                 INVENTORY_STATES.PERSONAL_INVENTORY,
    //             );
    //         }
    //     }

    //     inventory_data.set(newInventoryData);
    //     inventory_visible.set(true);
    // })

    if (typeof Events !== "undefined") {
        Events.Subscribe(
            "OpenInventory",
            ({ inventoryData, nearbyInventories, source, forceOpen }) => {
                console.log("open inventory =>", inventoryData);
                console.log(
                    inventoryData,
                    nearbyInventories,
                    source,
                    forceOpen,
                );

                var newInventoryData = {
                    id: inventoryData.id,
                    pockets: parseData(inventoryData.pockets),
                    slots: parseData(inventoryData.slots),
                    label: "Your Inventory",
                    weight: inventoryData.weight,
                    source: source,
                };

                if ($focusedInventory && nearbyInventories) {
                    nearbyInventories.forEach((x) => {
                        if (x.id == $focusedInventory) {
                            if (x.pockets) x.pockets = parseData(x?.pockets);
                            if (x.slots) x.slots = parseData(x?.slots);

                            otherInventoryData.set(x);
                            return;
                        }
                    });
                }

                if (forceOpen) {
                    focusedInventory.set(null);
                    if (nearbyInventories) {
                        inventoriesNearby = nearbyInventories;
                        inventory_state.set(INVENTORY_STATES.INVENTORY_BROWSE);
                    } else {
                        inventory_state.set(
                            INVENTORY_STATES.PERSONAL_INVENTORY,
                        );
                    }
                } else {
                    if (
                        nearbyInventories &&
                        $inventory_state !== INVENTORY_STATES.OTHER_INVENTORY
                    ) {
                        inventoriesNearby = nearbyInventories;
                        inventory_state.set(INVENTORY_STATES.INVENTORY_BROWSE);
                    } else if (!nearbyInventories) {
                        inventory_state.set(
                            INVENTORY_STATES.PERSONAL_INVENTORY,
                        );
                    }
                }

                inventory_data.set(newInventoryData);
                inventory_visible.set(true);
            },
        );

        Events.Subscribe("CloseInventory", () => {
            console.log("closing inventory");
            inventory_visible.set(false);
        });

        Events.Subscribe("EscapeButtonPressed", () => {
            if (giveMenuActive) {
                giveMenuActive = false;
                return;
            }

            if ($inventory_state == INVENTORY_STATES.OTHER_INVENTORY) {
                inventory_state.set(INVENTORY_STATES.INVENTORY_BROWSE);
                return;
            }

            Events.Call("CloseInventory");
        });

        Events.Subscribe("SendNearbyPlayers", (nearbyPlayers) => {
            giveMenuData.players = nearbyPlayers;
        });
    }
</script>

{#if $inventory_visible}
    {#if giveMenuActive}
        <GiveItemMenu bind:active={giveMenuActive} data={giveMenuData} />
    {:else if dropMenuActive}
        <DropItemMenu bind:active={dropMenuActive} data={dropMenuData} />
    {/if}

    {#if $dragging}
        <DragHandler
            data={$dragging}
            on:dropItem={dropItem}
            on:giveItemToPlayer={giveItemToPlayer}
            on:dragSlotHandler={handleDragEnd}
        />
    {/if}

    {#if $inventory_state == INVENTORY_STATES.PERSONAL_INVENTORY}
        <PersonalView />
    {:else if $inventory_state == INVENTORY_STATES.OTHER_INVENTORY}
        <OtherInventoryView />
    {:else if $inventory_state == INVENTORY_STATES.INVENTORY_BROWSE}
        <NearbyInventoriesView data={inventoriesNearby} />
    {/if}

    <div class="keybind--shortcut">
        <div class="keybind">Esc</div>
        <div class="label">
            {#if giveMenuActive}
                Back
            {:else if dropMenuActive}
                Back
            {:else if $inventory_state == INVENTORY_STATES.OTHER_INVENTORY}
                Back
            {:else if $inventory_state == INVENTORY_STATES.PERSONAL_INVENTORY || $inventory_state == INVENTORY_STATES.INVENTORY_BROWSE}
                Close Inventory
            {/if}
        </div>
    </div>

    <Backdrop />
    <ContextMenu />
{:else}
    <ItemNotifications />
{/if}

<style>
    .keybind--shortcut {
        position: absolute;
        right: 78px;
        bottom: 78px;

        display: flex;
        gap: 14px;
        align-items: center;
        z-index: 9999;
    }
    .keybind--shortcut .label {
        font-family: "Outfit";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0.06em;
        text-transform: capitalize;

        color: rgba(255, 255, 255, 0.65);
    }
    .keybind--shortcut .keybind {
        font-family: "Outfit";
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #000000;

        padding-inline: 7px;

        background: #ffffff;
        box-shadow: -4px 0px 14px rgba(0, 0, 0, 0.75);
        border-radius: 8px;

        height: 24px;
    }

    .personal--inventory {
        width: fit-content;
        margin-left: 193px;
    }
</style>
