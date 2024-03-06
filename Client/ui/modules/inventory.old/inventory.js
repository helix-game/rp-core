var inventoryData = {
    label: "Joe Smith",
    identifier: "3x20312",
    id: 1,
    slots: {
        1: {
            name: 'bagel', label: 'Bread', slot: 1, count: 5, weight: 2, unique: true, rarity: 'common', description: 'lorem ipsum'
        },
        2: {
            name: 'bagel', label: 'Bread', slot: 2, count: 9, weight: 2, unique: true, rarity: 'common', description: 'lorem ipsum'
        },
    },
    weight: [20.0, 30.0],
    slotAmount: 11
}
var nearbyInventoriesData = [
    {
        label: "Joe Smith",
        identifier: "3x20312",
        id: 1,
        slots: {
            1: {
                name: 'bagel', label: 'Bread', slot: 1, count: 5, weight: 2, unique: true, rarity: 'common', description: 'lorem ipsum'
            },
            2: {
                name: 'bagel', label: 'Bread', slot: 2, count: 9, weight: 2, unique: true, rarity: 'common', description: 'lorem ipsum'
            },
        },
        weight: [20.0, 50],
        slotAmount: 11
    },
    {
        label: "Audi",
        identifier: "CTRUNK0001",
        id: 1,
        slots: {
            10: {
                name: 'bagel', label: 'Bread', slot: 10, count: 5, weight: 2, unique: true, rarity: 'common', description: 'lorem ipsum'
            },
            8: {
                name: 'bagel', label: 'Bread', slot: 8, count: 9, weight: 2, unique: true, rarity: 'common', description: 'lorem ipsum'
            },
        },
        weight: 20.0,
        maxWeight: 10,
        slotAmount: 5
    },
]
var otherInventoryFocused = null
var InventoryElements = {
    Body: $('.inventory-wrapper'),
    DivideModal: $('.divide-modal'),
    ContextMenu: $('.context-menu'),
    MainInventorySlots: $("[data-inventory='player-inventory'] .slot"),
    Inventories : {
        Pocket: {
            Body: $('.pockets'),
            Slots: $('.pockets .slots')
        },
        FastSlots: {
            Body: $('.fast-slots'),
            Slots: $('.fast-slots .slots-large')
        },
        Backpack: {
            Body: $('.scroller'),
            Slots: $('.scroller .slots')
        }
    },
    Notice: $('.notice')
}

const setWeightPercent = (percent) => {
    const radius = 25;
    const strokeWidth = 1.3;
    const innerRadius = radius - strokeWidth;
    const circumference = innerRadius * 2 * Math.PI;
    const arc = circumference * 0.75;
    const dashArray = `${arc} ${circumference}`;
    const transform = `rotate(140, ${radius}, ${radius})`;
    const offset = arc - (percent / 100) * arc;
    // this took almost 2 hours to get right

    document
        .querySelector(".inventory-wrapper > .weight > .graph > .indicator circle")
        .setAttribute("stroke-dasharray", dashArray);
    document
        .querySelector(".inventory-wrapper > .weight > .graph > .indicator circle")
        .setAttribute("stroke-dashoffset", offset);
    document
        .querySelector(".inventory-wrapper > .weight > .graph > .indicator circle")
        .setAttribute("transform", transform);
};

var contextShown = false

const contextMenu = document.querySelector(".context-menu");
const contextMenu_ = $(".context-menu");
const showContextMenu = (slotElement) => {

    console.log(slotElement)

    const { x, y, width, height } = slotElement.getBoundingClientRect();
    const xCenter = x + width / 2;
    const yCenter = y + height / 2;
    const xPositionType = window.innerWidth / 2 > xCenter ? "left" : "right";
    const yPositionType = window.innerHeight / 2 > yCenter ? "top" : "bottom";
    const xPosition =
        xPositionType === "left" ? x + width : window.innerWidth - x;
    const yPosition =
        yPositionType === "top" ? y : window.innerHeight - y - height;

    contextMenu.style[xPositionType === "left" ? "right" : "left"] = "auto";
    contextMenu.style[xPositionType] = `${xPosition}px`;
    contextMenu.style[yPositionType === "top" ? "bottom" : "top"] = "auto";
    contextMenu.style[yPositionType] = `${yPosition}px`;
    contextMenu.style.transformOrigin = `${xPositionType} ${yPositionType}`;
    contextMenu.dataset.x = xPositionType;
    contextMenu.dataset.y = yPositionType;
    contextMenu.classList.add("active");

    var inventory = slotElement.closest('[data-inventory]');
    var invType = inventory.dataset.inventory;
    var slot = parseInt(slotElement.dataset.slot) || slotElement.dataset.type;
    var slotData;

    var useButton = contextMenu_.find("[data-type='use-action']")
    var divideButton = contextMenu_.find("[data-type='use-divide']");
    
    if (invType == 'other-inventory')
    {
        divideButton.hide()
        useButton.hide()
        slotData = nearbyInventoriesData[inventory.dataset.idx].slots[slot]
    }
    else
    {
        divideButton.show()
        useButton.show()
        invType = inventory.dataset.inventoryType;
        slotData = inventoryData[invType][slot];
    }

    if (slotData.usable == false)
        useButton.hide()

    var canDivide = slotData.count > 1 || slotData.canDivide

    if (invType !== 'other-inventory')
    {
        if (canDivide) {
            divideButton.show()
        } else {
            divideButton.hide()
        }
    }

    contextMenu_.find('.title').text(slotData.label);
    contextMenu_.find('.weight').text(slotData.weight * slotData.count + ' kg');
    contextMenu_.find('.rarity').text(slotData.rarity)
    contextMenu_.find('.subtitle').text(slotData.description)

    contextMenu.dataset.targetSlot = slot;
    contextMenu.dataset.targetInventory = inventory.dataset.inventory;
    contextMenu.dataset.targetInventoryType = invType;
    contextShown = true;
};
const hideContextMenu = () => {
    contextMenu.classList.remove("active");
    contextShown = false;
};

const showDivideModal = () => {
    document.querySelector(".divide-modal").classList.add("active");
};
const hideDivideModal = () => {
    document.querySelector(".divide-modal").classList.remove("active");
};

const scroller = $('.scroller');
const pockets = $('.pockets .slots');
const fast_slots = $('.fast-slots .slots-large');

let slotsList = []
let equipmentList = []
let outfitList = []

var svgs = [
    'one-stroke',
    'two-stroke',
    'three-stroke',
    'four-stroke',
    'five-stroke',
]

var outfits = [
    [{ type: 'glasses' }, { type: 'hat' }],
    [{ type: 'mask' }, { type: 'necklace' }],
    [{ type: 'shirt' }, { type: 'jacket' }],
    [{ type: 'watch' }, { type: 'gloves' }],
    [{ type: 'shoes' }, { type: 'pants' }],
]

var equipments = [{ type: 'backpack' }, { type: 'weapon' }, { type: 'bulletproof' }, { type: 'phone' }];

var backpackLevel = null

const setupSlots = () => {
    InventoryElements.Inventories.Backpack.Body.empty()
    InventoryElements.Inventories.Pocket.Slots.empty()
    InventoryElements.Inventories.FastSlots.Slots.empty()

    var slotcount = 1;
    var slotsTemplate = ''
    
    // Fast slots
    for (i = 0; i < 5; i++) {
        slotsTemplate += `
      <div class="slot slot-empty" data-slot=${slotcount} >
        <figure class="slot-content">
          <figure class="slot-icon"></figure>
          <figure class="label"></figure>
          
          <figcaption class="slot-number" style="background-image: url(./assets/icons/${svgs[i]}.svg)"></figcaption>
        </figure>
      </div>
      `
        slotcount++;
    }

    InventoryElements.Inventories.FastSlots.Slots.append(slotsTemplate)

    // Pocket slots
    slotsTemplate = '';
    for (i = 0; i < 6; i++) {
        slotsTemplate += `
      <figure data-slot=${slotcount} class="slot slot-empty">
          <figure
          class="slot-icon"
          style="background-image: url(./assets/icons/bg.png)"
        
        ></figure>
        <figcaption class="label">2</figcaption>
        <span class="notch"></span>
      </figure>`
        slotcount++;
    }

    InventoryElements.Inventories.Pocket.Slots.append(slotsTemplate);

    // Backpack slots
    slotsTemplate = '';
    for (j = 0; j < 8; j++) {
        var slotTemplate = ''
        for (i = 0; i < 6; i++) {
            slotTemplate += `
            <figure data-slot=${slotcount} class="slot slot-locked">
                <figure class="slot-icon"></figure>
                <span class="notch"></span>
                <figcaption class="label">2</figcaption>
            </figure>`
            slotcount++;
        }

        slotsTemplate += `
        <figure class="slots">
            ${slotTemplate}
        </figure>
        `
    }

    InventoryElements.Inventories.Backpack.Body.append(slotsTemplate);
    InventoryElements.Inventories.Backpack.Slots = $(".scroller .slot");
    
    // Outfit slots

    slotsTemplate = ''
    for (j = 0; j < 5; j++) {
        var slotTemplate = ''
        for (i = 0; i < 2; i++) {
            slotTemplate += `
                <figure class="slot slot-empty" data-type="${outfits[j][i].type}">
                    <figure class="slot-icon" style="--background: url(./assets/icons/${outfits[j][i].type}.svg)" data-icon="./assets/icons/${outfits[j][i].type}.svg"></figure>
                    <span class="notch"></span>
                </figure>
            `;
        }

        slotsTemplate += `
        <figure class="slots">
          ${slotTemplate}
        </figure>
        `
    }

    outfit.find('.slots-wrapper').append(slotsTemplate);

    slotsTemplate = '';
    for (i = 0; i < 4; i++) {
        slotsTemplate += `
        <figure data-type="${equipments[i].type}" class="slot slot-empty">
            <figure class="slot-icon" style="--background: url(./assets/icons/${equipments[i].type}.svg)"></figure>
            <figcaption class="label">1</figcaption>
            <span class="notch"></span>
        </figure>
        `
    }

    equipment.find('.slots').append(slotsTemplate)

    console.log(backpackLevel)
    // No backpack notice
    
    // InventoryElements.Inventories.Backpack.Body.append(noticeTemplate);
    // InventoryElements.Notice = noticeTemplate;
    
    // noticeTemplate.hide()

    slotsList = [...document.querySelectorAll('.slot')]

    var objectSlotlist = {}
    slotsList.forEach((element, index) => {
        objectSlotlist[index + 1] = element;
    })

    slotsList = objectSlotlist;
}

const clearInventory = (target) => {
    if (target === 'playerInventory') {
        const playerInv = $("[data-inventory='player-inventory'");
        const slots = playerInv.find('.slot');
        const slotIcons = playerInv.find('.slot-icon');

        slots.addClass('slot-empty');
        slots.removeClass('slot-locked');
        slotIcons.css('background-image', 'none');

        
        console.log(inventoryData.slotAmount, slots)
        for (var i = 11; i < 48; i++) {
            const jSlot = $(slots[i]);
            console.log("LOCKING SLOT =>", i, slots[i])
            jSlot.addClass('slot-locked');
            jSlot.removeClass('slot-empty');
            slotIcons.css('background-image', 'url(./assets/icons/lock.svg)');
        }

    } else if (target === 'playerStats') {
        const playerInv = $("[data-inventory='player-stats]'");
        const slots = playerInv.find('.slot');
        const slotIcons = playerInv.find('.slot-icon');

        slots.addClass('slot-empty');
        slots.removeClass('slot-locked');

        for (var i = 0; i < slotIcons.length; i++) {
            $(slotIcons[i]).css('background-image', slotIcons[i].dataset.icon);
        }
    } else if (target === 'other') {
        var inventoryHolder = $('.inventory-groups');
        inventoryHolder.empty();
    }
}

const updateInventoryWeight = (total, max) => {
    var weightDom = $('.weight .label');
    var totalWeight = weightDom.find('.total');
    var maxWeight = weightDom.find('.tare');


    setWeightPercent((total / max) * 100)
    totalWeight.text(`${total} kg`);
    maxWeight.text(`${max} kg`);
}


const openInventory = nearbyInvData => {    
    clearInventory('playerInventory')
    hideContextMenu();
    updateInventoryWeight(inventoryData.weight, inventoryData.maxWeight)

    nearbyInventoriesData = nearbyInvData

    Object.entries(InventoryElements.Inventories).forEach(([_, element]) => {
        if (element[0] !== undefined)
            element[0].dataset.id = inventoryData.name
    })

    
    if (inventoryData.slotAmount <= 11)
    {
        InventoryElements.Inventories.Backpack.Body.addClass('locked')
        InventoryElements.Notice.show();
    }
    else
    {
        InventoryElements.Inventories.Backpack.Body.removeClass('locked');

        InventoryElements.Inventories.Backpack.Slots.removeClass('slot-empty')
        InventoryElements.Inventories.Backpack.Slots.addClass('slot-locked')
        InventoryElements.Notice.hide()

        // fast slots + pockets + backpack
        var maxSlots = 11 + inventoryData.slotAmount

        for (i = 0; i < maxSlots; i++) 
        {
            slotsList[i].classList.add('slot-empty')
            slotsList[i].classList.remove('slot-locked')
        }
    }

    // else
    // {
    //     InventoryElements.Inventories.Backpack.Body.addClass('locked')
    //     InventoryElements.Notice.fadeIn()
    // }

    if (inventoryData.slots)
    {
        Object.entries(inventoryData.slots).forEach(([index, item]) => {
            if (item !== undefined) {
                var domSlot = $(slotsList[index])
    
                var domIcon = domSlot.find('.slot-icon');
                var domAmount = domSlot.find('.label');
    
                domIcon.css('background-image', `url(./assets/items/${item.name}.png)`)
                domAmount.text(item.count)
                domSlot.removeClass('slot-empty');
            }
        })
    }

    $('.inventory-wrapper').fadeIn();

    if (nearbyInventoriesData === undefined)
    {
        openPlayerStats()   
    } else {
        openNearbyInventories()
    }

    $('.slot:not(.slot-empty):not(.slot-locked) .slot-icon, .slot-slim:not(.slot-empty):not(.slot-locked) .slot-icon').draggable({
        helper: 'clone',
        appendTo: 'body',
        start: function (event, ui) {
            var item = $(ui.helper)
            
            // Margin will center the images
            item.css('margin-left', '24px')
            item.css('margin-top', '24px')
            
            item.css('width', '48px')
            item.css('height', '48px')
            item.css('z-index', '9999')
            item.css('background-size', 'contain')
            item.css('background-repeat', 'no-repeat')
        },
    })

    $('.slot, .slot-slim').droppable({
        drop: (e, ui) => {
            var toSlot = $(e.target.closest('.slot, .slot-slim'));

            if (toSlot.hasClass('slot-locked')) return;

            var fromSlot = $(ui.draggable.closest('.slot, .slot-slim'));
            var fromInventory = ui.draggable.closest('[data-inventory]')[0];
            var toInventory = e.target.closest('[data-inventory]');
            
            Events.Call('inventory:InventorySwap', {
                action: "swap",
                requestId: 0,
                fromInventory: { type: fromInventory.dataset.inventory, id: fromInventory.dataset.id },
                fromSlot: fromSlot[0].dataset.slot,
                toInventory: { type: toInventory.dataset.inventory, id: toInventory.dataset.id },
                toSlot: toSlot[0].dataset.slot
            })
        }
    })
}

const outfit = $('.outfit');
const equipment = $('.equipment');
const nearbyInventories = $('.nearby');

const openNearbyInventories = () => {
    outfit.hide();
    equipment.hide();
    nearbyInventories.show();

    clearInventory('other');

    var templates = ''

    nearbyInventoriesData.forEach((inventory, idx) => {
        var slotCount = 0;
        var slotsWrapper = ''
        
        console.log(inventory)
        if (inventory.type == 'player')
            inventory.slotAmount -= 11

        var itrAmount = Math.ceil(inventory.slotAmount / 5);
        
        for (let i = 0; i < itrAmount; i++) {
            var slots = ''
            for (let j = 0; j < 5; j++) {
                slotCount++;

                slots += `
                    <figure class="slot-slim ${inventory.slots[slotCount] ? '' : 'slot-empty'} ${slotCount > inventory.slotAmount && 'slot-locked'}" data-slot="${slotCount}">
                        <figure class="slot-icon" style='background-image: url(./assets/items/${inventory.slots[slotCount]?.name}.png)'></figure>
                        <span class="notch"></span>
                        <figcaption class="label">${inventory.slots[slotCount]?.count || 0}</figcaption>
                    </figure>
                `
            }

            slotsWrapper += `
                <figure class="slots-slim">
                    ${slots}
                </figure>
            `;
        }

        var template = `
            <div class="inventory-group ${otherInventoryFocused == idx && 'active'}" data-inventory="other-inventory" data-id="${inventory.id}" data-idx="${idx}">
                <header class="group-header">
                <figure class="details">
                    <figure class="icon">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M1.54727 7.68752L2.92188 3.76134C3.44805 2.25705 4.86719 1.25002 6.46094 1.25002H13.5391C15.1328 1.25002 16.5508 2.25705 17.0781 3.76134L18.4531 7.68752C19.3594 8.06252 20 8.95705 20 10V17.5C20 18.1914 19.4414 18.75 18.75 18.75H17.5C16.8086 18.75 16.25 18.1914 16.25 17.5V15.625H3.75V17.5C3.75 18.1914 3.19023 18.75 2.5 18.75H1.25C0.559766 18.75 0 18.1914 0 17.5V10C0 8.95705 0.639063 8.06252 1.54727 7.68752ZM4.26172 7.50002H15.7383L14.7188 4.58595C14.543 4.08595 14.0703 3.75002 13.5391 3.75002H6.46094C5.92969 3.75002 5.45703 4.08595 5.28125 4.58595L4.26172 7.50002ZM3.75 10C3.05977 10 2.5 10.5586 2.5 11.25C2.5 11.9414 3.05977 12.5 3.75 12.5C4.44141 12.5 5 11.9414 5 11.25C5 10.5586 4.44141 10 3.75 10ZM16.25 12.5C16.9414 12.5 17.5 11.9414 17.5 11.25C17.5 10.5586 16.9414 10 16.25 10C15.5586 10 15 10.5586 15 11.25C15 11.9414 15.5586 12.5 16.25 12.5Z"
                        fill="currentColor"
                        />
                    </svg>
                    </figure>
                    <figure class="name">
                    <h2 class="title">${inventory.label}</h2>
                    <figcaption class="subtitle">${inventory.identifier}</figcaption>
                    </figure>
                </figure>
                ${
                    inventory.type !== 'drop' ? `<figure class="weight">
                        <figure class="details">
                        <figcaption class="total">${inventory.weight} kg</figcaption>
                        <figcaption class="tare">/ ${inventory.maxWeight} kg</figcaption>
                        </figure>
                        <figure class="icon"></figure>
                    </figure>` : ''
                }
                </header>
                <div class="group-contents">
                    ${slotsWrapper}
                </div>
            </div>
        `;

        templates += template;
    })

    nearbyInventories.find('.inventory-groups').append(templates);
}

const openPlayerStats = () => {
    otherInventoryFocused = null;
    nearbyInventories.hide()
    outfit.show()
    equipment.show()

    clearInventory('playerStats')

    if (inventoryData.outfit) {
        Object.entries(inventoryData.outfit).forEach(([index, item]) => {
            if (item !== undefined) {
                var domSlot = outfit.find(`[data-type='${index}']`);

                var domIcon = domSlot.find('.slot-icon');

                domIcon.css('background-image', `url(./assets/items/${item.name}.png)`)
                domSlot.removeClass('slot-empty');
            }
        })
    }
    if (inventoryData.equipment) {
        console.log("EQUIPMENT", inventoryData.equipment)
        Object.entries(inventoryData.equipment).forEach(([index, item]) => {
            console.log(index, item)
            if (item !== undefined) {
                // console.log(slotsList[ind])
                var domSlot = $(slotsList[index])

                var domIcon = domSlot.find('.slot-icon');
                var domAmount = domSlot.find('.label');

                domIcon.css('background-image', `url(./assets/items/${item.name}.png)`)
                domAmount.text(item.count)
                domSlot.removeClass('slot-empty');
            }
        })
    }
}

window.addEventListener('contextmenu', e => {
    e.preventDefault();
    e.stopPropagation();
})

var nearbyOpened = undefined;

const divideModal = document.querySelector('.divide-modal');

window.addEventListener('mousedown', e => {
    if (e.buttons & 2) {

        var slot = e.target.closest('.slot')
        // var inv = e.target.closest('.inventory-group')
        // var invType = inv.dataset.inventory
        // var invId = inv.dataset.id

        if (slot === null) return;

        return showContextMenu(slot)
    }
})

window.addEventListener('click', e => {
    // console.log(e)

    let target = e.target;

    if (target.closest('.exit-wrapper .exit')) {
        console.log('close')
        Events.Call('inventory:CloseInventory')

        return;
    }
    if (target.closest('.inventory-group .group-header')) {
        var groupButton = target.closest('.inventory-group');

        // console.log(groupButton)
        if (groupButton === nearbyOpened) {
            // otherInventoryFocused = groupButton.dataset.idx
            otherInventoryFocused = null;
            // nearbyInventoriesData[groupButton.dataset.idx].focused = false;
            groupButton.classList.remove('active')
            nearbyOpened = undefined;
            return;
        } else if (nearbyOpened) {
            otherInventoryFocused = null;
            // nearbyInventoriesData[nearbyOpened.dataset.idx].focused = false;
            nearbyOpened.classList.remove('active')
        }
        
        nearbyOpened = groupButton;
        otherInventoryFocused = groupButton.dataset.idx
        // nearbyInventoriesData[nearbyOpened.dataset.idx].focused = true;
        groupButton.classList.add('active');

        return;
    }
    if (target.closest('.divide-modal')) {
        if (target.closest('#increase')) {
            var amount = divideModal.dataset.amount;

            amount++;

            if (amount > divideModal.dataset.max)
                return;

            divideModal.dataset.amount = amount;
            $('.divide-modal .input .label').text(divideModal.dataset.amount);
            return;
        }

        if (target.closest('#decrease')) {
            var amount = divideModal.dataset.amount;

            amount--;

            if (amount < 1)
                return;

            divideModal.dataset.amount = amount;
            $('.divide-modal .input .label').text(divideModal.dataset.amount);
            return;
        }

        if (target.closest('#min-amount')) {
            divideModal.dataset.amount = 1;
            $('.divide-modal .input .label').text(divideModal.dataset.amount);

            return
        }
        if (target.closest('#max-amount')) {
            divideModal.dataset.amount = divideModal.dataset.max;
            $('.divide-modal .input .label').text(divideModal.dataset.amount);

            return
        }
        if (target.closest('#half-amount')) {
            divideModal.dataset.amount = Math.floor(divideModal.dataset.amount / 2);

            if (divideModal.dataset.amount < 1) divideModal.dataset.amount = 1;

            $('.divide-modal .input .label').text(divideModal.dataset.amount);
            return;
        }

        if (target.closest('#cancel')) {
            hideDivideModal()
            return
        }

        if (target.closest('#done')) {
            // Send Request to divide
            var amountToSplit = divideModal.dataset.amount;
            var targetInventory = divideModal.dataset.targetInventory;
            var targetInventoryType = divideModal.dataset.targetInventoryType;
            var targetSlot = divideModal.dataset.targetSlot;
            
            // Can only split in your own inventory
            
            // console.log(targetInventory, targetInventoryType, targetSlot, amountToSplit)
            hideDivideModal()
            Events.Call('inventory:SplitItem', targetSlot, amountToSplit)
            return
        }

        return;
    }
    if (target.closest('.context-menu .action')) {
        var contextButton = target.closest('.context-menu .action');
        var targetSlot = contextMenu.dataset.targetSlot;
        var targetInventory = contextMenu.dataset.targetInventory;
        var targetInventoryType = contextMenu.dataset.targetInventoryType;

        switch (contextButton.dataset.type) {
            case 'use-action':
                // You can only use an item from your own inventory!
                Events.Call('inventory:UseItem', targetSlot, true)
                break;
            case 'use-divide':
                if (targetInventory === 'player-inventory') {
                    divideModal.dataset.max = inventoryData[targetInventoryType][targetSlot].count
                } else if (targetInventory === 'other-inventory') {
                    // 
                    // divideModal.dataset.max = nearbyInventoriesData[targetInventoryType][targetSlot].count   
                }

                divideModal.dataset.targetInventory = targetInventory;
                divideModal.dataset.targetInventoryType = targetInventoryType;
                divideModal.dataset.targetSlot = targetSlot;

                var maxAmount = divideModal.dataset.max;
                $('.divide-modal .subtitle').html(`number from <em>1</em> to <em>${maxAmount}</em>`);

                divideModal.dataset.amount = 1;
                $('.divide-modal .input .label').text(divideModal.dataset.amount)

                showDivideModal()
                hideContextMenu()

                break;
            case 'use-drop':
                Events.Call('inventory:RemoveItem', targetSlot)
            break;

        }

        return;
    } else if (contextShown) {
        hideContextMenu();
        return;
    }
})
window.addEventListener('scroll', e => {
    if (!e.target) return;
    var target = e.target.closest('.scroller');
    if (target === null) return;
    hideContextMenu();
})
document
    .querySelectorAll(".slots")
    .forEach((node) => (node.onscroll = hideContextMenu));

setupSlots()

// Events.Subscribe('inventory:CloseInventory', () => {
//     otherInventoryFocused = null;
//     $('.inventory-wrapper').fadeOut();
// })

// Events.Subscribe('inventory:OpenInventory', e => {
//     console.log("RECIEVED OPEN REQUEST")
//     var obj = e.inventoryData;
//     var slotObj = {};

//     if (e?.inventoryData?.slots)
//     {
//         Object.entries(e.inventoryData.slots).forEach(x => {
//             slotObj[x[1].slot] = x[1]
//         })
//     }

//     inventoryData = obj;


//     if (e.nearbyInventories)
//     {
//         e.nearbyInventories.forEach((inventory, idx) => {
//             slotObj = {}

//             if (inventory.slotsActive !== 0)
//             {
//                 Object.entries(inventory.slots).forEach(x => {
//                     slotObj[x[1].slot] = x[1]
//                 })
//             }

//             e.nearbyInventories[idx].slots = slotObj
//         })
//     }

//     openInventory(e.nearbyInventories);
// })

InventoryElements.Body.css('opacity', 1)
InventoryElements.Body.hide()