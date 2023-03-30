package fr.alwan.SyncHandler;

import fr.alwan.SyncHandler.events.AsyncPlayerChat;
import fr.alwan.SyncHandler.events.AsyncPlayerPreLogin;
import fr.alwan.SyncHandler.events.PlayerJoin;
import fr.alwan.SyncHandler.events.PlayerQuit;
import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.permissions.PermissionAttachment;
import org.bukkit.plugin.PluginManager;
import org.bukkit.plugin.java.JavaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

public class SyncHandler extends JavaPlugin {

    public static SyncHandler instance;
    public Socket socket;
    public HashMap<String, Rank> rankMemory = new HashMap<>();
    public HashMap<UUID, String> playerMemory = new HashMap<>();
    public HashMap<UUID, PermissionAttachment> permissionMemory = new HashMap<>();
    public ArrayList<UUID> loginMemory = new ArrayList<>();

    public static SyncHandler getInstance() {
        return instance;
    }

    @Override
    public void onEnable() {
        instance = this;
        this.loadSocket();
        this.loadEvent();
        this.loadPlayer();

        getLogger().info("SyncHandler is loaded!");
    }

    @Override
    public void onDisable() {
        this.unloadSocket();

        getLogger().info("SyncHandler is unloaded!");
    }

    private void loadSocket() {
        socket = IO.socket(URI.create("http://localhost:8000"));
        socket.connect();
        socket.emit("rank");

        socket.on("rank", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                try {
                    Object data = args[0];
                    JSONArray array = new JSONArray(data.toString());
                    rankMemory.clear();
                    for (int i = 0; i < array.length(); i++) {
                        Rank rank = new Rank(array.getJSONObject(i));
                        rankMemory.put(rank.getName(), rank);
                    }

                    for (final Player player : Bukkit.getOnlinePlayers())
                        loadPermission(player);

                    getLogger().info(" ");
                    getLogger().info("RankMemory Update");
                    getLogger().info(" ");

                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
            }
        });

        socket.on("player", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                try {
                    Object data = args[0];
                    if (data != null) {
                        JSONObject object = new JSONObject(data.toString());
                        UUID uuid = UUID.fromString(object.getString("uuid"));
                        Player player = Bukkit.getPlayer(uuid);
                        if (player != null || loginMemory.contains(uuid)) {
                            if (player != null && !loginMemory.contains(uuid))
                                player.sendMessage("Your rank has been changed");

                            loginMemory.remove(uuid);

                            JSONObject rank = object.getJSONObject("rank");
                            playerMemory.put(uuid, rank.getString("name"));

                            if (player != null)
                                loadPermission(player);

                            getLogger().info(" ");
                            getLogger().info("PlayerMemory Update " + uuid);
                            getLogger().info(" ");

                        }
                    }
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }

    private void unloadSocket() {
        socket.off();
    }

    private void loadEvent() {
        PluginManager pm = getServer().getPluginManager();
        pm.registerEvents(new AsyncPlayerChat(), this);
        pm.registerEvents(new AsyncPlayerPreLogin(), this);
        pm.registerEvents(new PlayerJoin(), this);
        pm.registerEvents(new PlayerQuit(), this);
    }

    private void loadPlayer() {
        for (Player player : Bukkit.getOnlinePlayers())
            socket.emit("player", player.getUniqueId());
    }

    public void loadPermission(final Player player) {
        this.unloadPermission(player);

        final PermissionAttachment attachment = player.addAttachment(this);
        final Rank rank = rankMemory.get(playerMemory.get(player.getUniqueId()));

        for (final String perm : rank.getPermissions())
            attachment.setPermission(perm, true);

        permissionMemory.put(player.getUniqueId(), attachment);
    }

    public void unloadPermission(final Player player) {
        if (permissionMemory.containsKey(player.getUniqueId())) {

            final PermissionAttachment attachment = permissionMemory.get(player.getUniqueId());

            for (final String perm : attachment.getPermissions().keySet())
                attachment.unsetPermission(perm);

            permissionMemory.remove(player.getUniqueId());
        }
    }
}
