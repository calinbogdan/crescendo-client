import DiscordClientProvider from "../DiscordClientProvider";

export default (message, { text }) => {
    const client = DiscordClientProvider.getClient();

    client.users.get(message.author.id).send(text);
};