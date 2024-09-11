// Import the required libraries
import Twitter from 'twitter-lite';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

// Twitter API client configuration
const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});


// Discord API client configuration
const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

// When the Discord bot is ready
discordClient.once('ready', () => {
    console.log('Discord bot is ready!');
});

// Function to get the latest tweet from your Twitter account
async function postLatestTweet() {
    try {
        // Fetch the latest tweet from your timeline
        // console.log("hit")
        // const tweets = await twitterClient.get('2/tweets', {
        //     screen_name: 'Prince_1908', // Twitter username
        //     count: 1,  // Get the latest tweet only
        // });
        // console.log("hit 2")
        // console.log(tweets);

        const tweets = await twitterClient.get('2/tweets', {
            screen_name: '@Prince_1908', // Twitter username
            count: 1,  // Get the latest tweet only
        });

        console.log(tweets);

        // const latestTweet = tweets[0];

        // // Get the specific Discord channel
        // const channel = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID);

        // // Post the tweet to the Discord channel
        // if (channel) {
        //     await channel.send(`New tweet by @${latestTweet.user.screen_name}: ${latestTweet.text} \nLink: https://twitter.com/${latestTweet.user.screen_name}/status/${latestTweet.id_str}`);
        // }
    } catch (error) {
        console.error('Error fetching tweets or sending to Discord:', error);
    }
}

// Log the bot into Discord
discordClient.login(DISCORD_TOKEN);

// Set an interval to check for new tweets every minute
// setInterval(postLatestTweet, 5000);
setTimeout(postLatestTweet, 2000);
