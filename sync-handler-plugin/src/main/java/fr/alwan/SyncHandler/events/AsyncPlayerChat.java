package fr.alwan.SyncHandler.events;

import fr.alwan.SyncHandler.Color;
import fr.alwan.SyncHandler.Rank;
import fr.alwan.SyncHandler.SyncHandler;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.AsyncPlayerChatEvent;

public class AsyncPlayerChat implements Listener {
    @EventHandler
    public void onAsyncPlayerChat(final AsyncPlayerChatEvent event) {
        final SyncHandler instance = SyncHandler.getInstance();
        final Rank rank = instance.rankMemory.get(instance.playerMemory.get(event.getPlayer().getUniqueId()));

        if (rank == null)
            event.setCancelled(true);

        final String prefix = rank.getPrefix() != "null" ? rank.getPrefix() + " " : "";
        final String suffix = rank.getSuffix() != "null" ? " " + rank.getSuffix() : "";
        final Color color = new Color(rank.getChatColor());

        event.setFormat(prefix + "%1$s" + suffix + ": " + color.getColor() + "%2$s");
    }
}
