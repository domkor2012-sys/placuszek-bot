const mineflayer = require('mineflayer');
const http = require('http');

// 1. Serwer dla Rendera (żeby nie wyłączał bota)
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot is running!");
}).listen(process.env.PORT || 10000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'placuszekcraftsmp.play.hosting',
        port: 65096, // <--- WPISZ TU AKTUALNY PORT Z PANELU!
        username: 'BOTEK_AFK',
        version: '1.21.1', // Spróbujmy tej wersji dla lepszej stabilności
        auth: 'offline'
    });

    bot.on('login', () => console.log('✅ Zalogowano do serwera!'));
    
    bot.on('message', (jsonMsg) => {
        const msg = jsonMsg.toString();
        if (msg.includes('/login')) {
            bot.chat('/login AFK_1234');
            console.log('>>> Wysłano hasło.');
        }
    });

    bot.on('spawn', () => {
        console.log('🎮 Bot jest na serwerze!');
        // Anty-AFK: skok co 30s
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('error', err => {
        console.log('❌ Błąd:', err.message);
        if (err.message.includes('ECONNREFUSED')) {
            console.log('!!! PORT JEST ZABLOKOWANY LUB ZŁY !!!');
        }
    });

    bot.on('end', () => {
        console.log('🔄 Rozłączono. Próba powrotu za 10s...');
        setTimeout(createBot, 10000);
    });
}

createBot();
