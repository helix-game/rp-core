<script>
    import ItemNotification from './ItemNotification.svelte';

    let notifications = [];
    let notificationQueue = [];
    const maxNotifications = 4;

    const createItemNotification = ({type, item, count}) => {
        const id = Date.now();
        if (notifications.length < maxNotifications) {
            
            notifications = [
                {
                    type,
                    item,
                    count,
                    id,
                    timer: setTimeout(() => {
                        notifications = notifications.filter(notification => notification.id !== id);
                    }, 3000)
                },
                ...notifications
            ];

        } else {
            notificationQueue = [
                {
                    type,
                    item,
                    count,
                    id
                },
                ...notificationQueue
            ];
        }
    }

    if (typeof Events !== 'undefined')
    {
        Events.Subscribe('ItemAdded', (item, label, count) => {
            createItemNotification({
                type: 'added',
                item,
                label,
                count
            })
        })

        Events.Subscribe('ItemRemoved', (item, label, count) => {
            createItemNotification({
                type: 'removed',
                item,
                count,
                label
            })
        })
    }

</script>

<div class="notification--stacker">
    {#each notifications as {type, item, count, id} (id)}
        <ItemNotification {type} {item} {count} />
    {/each}
</div>

<style>
    .notification--stacker {
        position: absolute;
        left: 50%;
        bottom: 26px;
        transform: translateX(-50%);

        max-height: calc((73px + 6px) * 4 - 6px);
        overflow-y: hidden;
    }
</style>