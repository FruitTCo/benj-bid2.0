const { CronJob } = require('cron');

new CronJob(
'* * * * * *',
async function() {
    console.log('GETTING!');
    const response =  await fetch('https://benj-bid2-0.vercel.app/api/hello');
console.log('RESPONSE', response.status);
}, null, true, 'America/Los_Angeles');