import DiscordClientProvider from "../DiscordClientProvider";
import { TextChannel } from "discord.js";

export default (message, { channelId, text }) => {
    const client = DiscordClientProvider.getClient();

    const guild = client.guilds.get(message.guild.id);

    const textChannel = guild.channels.get(channelId) as TextChannel;

    textChannel.send(text);
};