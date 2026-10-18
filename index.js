const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => {
  res.write("Bot aktif!");
  res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'ERIMYER1234.aternos.me',
    port: 25565,
    username: 'AFK_Botu',
    version: '26.3' // <--- Aternos panelinde yazan sürümü buraya yazdık
  });

  bot.on('end', () => {
    console.log('Bot düştü, 30 saniye sonra tekrar bağlanıyor...');
    setTimeout(createBot, 30000);
  });

  bot.on('error', err => console.log('Hata:', err));

  bot.on('spawn', () => {
    console.log('Bot başarıyla sunucuya girdi!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });
}

createBot();