package fr.alwan.SyncHandler;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class Rank {
    private final int id;
    private final String name;
    private final String prefix;
    private final String suffix;
    private final String chatColor;
    private final List<String> permissions;

    public Rank(JSONObject rank) {
        try {
            this.id = rank.getInt("id");
            this.name = rank.getString("name");
            this.prefix = rank.getString("prefix");
            this.suffix = rank.getString("suffix");
            this.chatColor = rank.getString("chatColor");
            this.permissions = new ArrayList<>();


            String perms = rank.getString("permissions");
            if (perms != "null") {
                JSONArray array = new JSONArray(perms);
                for (int i = 0; i < array.length(); i++)
                    this.permissions.add(array.getString(i));
            }

        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPrefix() {
        return prefix;
    }

    public String getSuffix() {
        return suffix;
    }

    public String getChatColor() {
        return chatColor;
    }

    public List<String> getPermissions() {
        return permissions;
    }
}
