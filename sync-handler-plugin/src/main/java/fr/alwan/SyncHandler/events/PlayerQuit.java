package fr.alwan.SyncHandler.events;

import fr.alwan.SyncHandler.SyncHandler;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerQuitEvent;

public class PlayerQuit implements Listener {
    @EventHandler
    public void onPlayerQuit(final PlayerQuitEvent event) {
        final SyncHandler instance = SyncHandler.getInstance();
        final Player player = event.getPlayer();

        instance.playerMemory.remove(player.getUniqueId());
    }
}
