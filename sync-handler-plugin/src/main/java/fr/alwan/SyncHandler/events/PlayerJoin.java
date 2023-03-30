package fr.alwan.SyncHandler.events;

import fr.alwan.SyncHandler.SyncHandler;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;

public class PlayerJoin implements Listener {
    @EventHandler
    public void onPlayerJoin(final PlayerJoinEvent event) {
        final SyncHandler instance = SyncHandler.getInstance();
        final Player player = event.getPlayer();

        if (instance.playerMemory.containsKey(player.getUniqueId()))
            instance.loadPermission(player);
    }
}
