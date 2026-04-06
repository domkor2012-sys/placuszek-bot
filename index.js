const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'placuszekcraftsmp.falix.gg',
        port: 25565,
        username: 'BOTEK',
        version: '1.21.11'
    });

    bot.on('login', () => {
        console.log('✅ Zalogowano jako BOTEK');
    });

    bot.on('spawn', () => {
        console.log('🎮 Bot wszedł na serwer');

        // logowanie
        setTimeout(() => {
            bot.chat('/login AFK_1234');
        }, 3000);

        // ANTY AFK - bardziej "ludzki"
        setInterval(() => {
            const actions = ['forward', 'back', 'left', 'right'];
            const action = actions[Math.floor(Math.random() * actions.length)];

            bot.setControlState(action, true);

            setTimeout(() => {
                bot.setControlState(action, false);
            }, 2000 + Math.random() * 2000);

            // czasem skok
            if (Math.random() < 0.3) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }

        }, 12000 + Math.random() * 8000);

        // patrzenie się losowo
        setInterval(() => {
            bot.look(
                Math.random() * Math.PI * 2,
                (Math.random() - 0.5) * Math.PI
            );
        }, 8000 + Math.random() * 5000);
    });

    // respawn
    bot.on('death', () => {
        console.log('☠️ Respawn');
        bot.emit('respawn');
    });

    // reconnect
    bot.on('end', () => {
        console.log('❌ Rozłączono - reconnect...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', err => console.log('Błąd:', err));
}

createBot();
