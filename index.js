const mineflayer = require('mineflayer');
const http = require('http');

// Render'ın kapanmasını önleyen HTTP sunucusu
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("AFK Botu Aktif!");
  res.end();
}).listen(port, () => {
  console.log(`HTTP sunucu ${port} portunda dinleniyor.`);
});

function createBot() {
  const bot = mineflayer.createBot({
    host: 'vixter.aternos.me', // Yeni Aternos IP adresin
    port: 25565,
    username: 'AFK_Botu',
    version: false // Sürümü otomatik algılar
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