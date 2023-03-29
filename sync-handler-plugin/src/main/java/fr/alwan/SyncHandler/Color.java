package fr.alwan.SyncHandler;

import org.bukkit.ChatColor;

public class Color {
    private final ChatColor color;

    public Color(String str) {
        switch (str) {
            case "black":
                this.color = ChatColor.BLACK;
                break;
            case "dark_blue":
                this.color = ChatColor.DARK_BLUE;
                break;
            case "dark_green":
                this.color = ChatColor.DARK_GREEN;
                break;
            case "dark_aqua":
                this.color = ChatColor.DARK_AQUA;
                break;
            case "dark_red":
                this.color = ChatColor.DARK_RED;
                break;
            case "dark_purple":
                this.color = ChatColor.DARK_PURPLE;
                break;
            case "gold":
                this.color = ChatColor.GOLD;
                break;
            case "gray":
                this.color = ChatColor.GRAY;
                break;
            case "dark_gray":
                this.color = ChatColor.DARK_GRAY;
                break;
            case "blue":
                this.color = ChatColor.BLUE;
                break;
            case "green":
                this.color = ChatColor.GREEN;
                break;
            case "aqua":
                this.color = ChatColor.AQUA;
                break;
            case "red":
                this.color = ChatColor.RED;
                break;
            case "light_purple":
                this.color = ChatColor.LIGHT_PURPLE;
                break;
            case "yellow":
                this.color = ChatColor.YELLOW;
                break;
            default:
                this.color = ChatColor.WHITE;
                break;
        }
    }

    public ChatColor getColor() {
        return color;
    }
}
