import { oAuthCleanerCron } from "./oauth-cleaner.cron";

export const cronRunner = () => oAuthCleanerCron.start();