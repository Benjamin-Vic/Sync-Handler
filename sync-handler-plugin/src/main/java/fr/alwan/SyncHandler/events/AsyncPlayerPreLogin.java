package fr.alwan.SyncHandler.events;

import fr.alwan.SyncHandler.SyncHandler;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.AsyncPlayerPreLoginEvent;

public class AsyncPlayerPreLogin implements Listener {
    @EventHandler
    public void onAsyncPlayerPreLogin(final AsyncPlayerPreLoginEvent event) {
        final SyncHandler instance = SyncHandler.getInstance();

        instance.loginMemory.add(event.getUniqueId());
        instance.socket.emit("player", event.getUniqueId());
    }
}
