const { CronJob } = require('cron');

new CronJob(
'* * * * * *',
async function() {
    console.log('GETTING!');
    const response =  await fetch('http://localhost:3000/api/hello');
console.log('RESPONSE', response.status);
}, null, true, 'America/Los_Angeles');