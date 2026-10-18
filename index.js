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
    host: 'vixter.aternos.me',
    port: 58098,
    username: 'AFK_Botu',
    version: false, // Sürüm denetimini Aternos'un gönderdiği 26.3 yanıtına bırakır
    checkTimeoutInterval: 60000
  });

  bot.on('end', () => {
    console.log('Bot düştü, 30 saniye sonra tekrar bağlanıyor...');
    setTimeout(createBot, 30000);
  });

  bot.on('error', err => console.log('Hata:', err.message || err));

  bot.on('spawn', () => {
    console.log('Bot başarıyla sunucuya girdi!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });
}

createBot();