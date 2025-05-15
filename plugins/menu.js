// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

let rin = {
    help: [],
    command: ["menu", "rinmenu"],
    tags: ["run"],
    loading: true,
    code: async (m, {
        conn,
        text,
        config,
        Func
    }) => {
        function getPluginsByTags(selectedTags = []) {
            const tagCount = {};
            const tagHelpMapping = {};

            const selectedTagsLower = selectedTags.map(tag => tag.toLowerCase());

            Object.keys(pg.plugins)
                .filter(pluginName => !pg.plugins[pluginName].disabled)
                .forEach(pluginName => {
                    const plugin = pg.plugins[pluginName];
                    const tagsArray = Array.isArray(plugin.tags) ? plugin.tags : [];
                    const helpArray = Array.isArray(plugin.help) ? plugin.help : [plugin.help];

                    tagsArray.forEach(tag => {
                        if (!tag) return;

                        const tagLower = tag.toLowerCase();

                        if (selectedTags.length > 0 && !selectedTagsLower.includes(tagLower)) {
                            return;
                        }

                        if (tagCount[tag]) {
                            tagCount[tag]++;
                            tagHelpMapping[tag].push(...helpArray);
                        } else {
                            tagCount[tag] = 1;
                            tagHelpMapping[tag] = [...helpArray];
                        }
                    });
                });

            if (Object.keys(tagCount).length === 0) {
                return "No plugins found with the specified tags.";
            }

            return Object.keys(tagCount)
                .map(tag => {
                    const helpList = tagHelpMapping[tag]
                        .map((helpItem, index) => `│ *( ${index + 1} )* ${m.prefix + helpItem}`)
                        .join("\n");

                    return `╭───────────[ ${tag.toUpperCase()} ]──────────╮
${helpList}
╰──────────────────────────────────╯`;
                })
                .join("\n\n");
        }

        // User info
        const user = {
            name: m.pushName || 'User',
            number: (m.sender || '').split('@')[0] || '62xxx-xxx-xxx',
            limit: db.list().user[m.sender].limit,
            status: m.isOwner ? 'Pemilik' : 'Orang Bisaa'
        };

        // Bot info - Handle config.owner properly
        const botNumber = Array.isArray(config.owner) ?
            config.owner[0] :
            typeof config.owner === 'string' ?
            config.owner :
            '62xxx-xxx-xxx';
        const cleanBotNumber = botNumber.replace('@s.whatsapp.net', '').split('@')[0];

        const botInfo = {
            name: config.name || 'rin-okumura-bot',
            number: cleanBotNumber
        };

        // Main menu design
        const demonSlayerHeader = `
╔════════════════════════╗
│  ✧🔥 Blue Exorcist 🔥✧  │
╚════════════════════════╝

[1] (•̀ᴗ•́)و ̑̑  🔥 RIN 🔥  
    🔥=======> ︻デ═一  
    [🗡️ Kurikara - Flaming Sword]  

[2] (¬_¬ )ﾉ 🔫 YUKIO 🔫  
    ▄︻̷̿┻̿═━一⁍⁍⁍  
    [🔫 Dual Pistols - Exorcist Mode]  
`;

        const botInfoSection = `
╭───────────[ 🤖 BOT INFO ]──────────╮
│ 🏷️ Name: ${botInfo.name}          
│ 📞 Number: ${botInfo.number}          
╰──────────────────────────────────╯
`;

        const userInfoSection = `
╭───────────[ 👤 USER INFO ]─────────╮
│ 🏷️ Name: ${user.name}                     
│ 📞 Number: ${user.number}          
│ 🎚️ Limit: ${user.limit}                 
│ 🏅 Status: ${user.status}         
╰──────────────────────────────────╯
`;

        if (text === "all") {
            const allCommands = getPluginsByTags();

            const commandsSection = `
╭───────────[ 📜 COMMANDS ]──────────╮
${allCommands}
╰──────────────────────────────────╯
`;

            const caption = `${demonSlayerHeader}
${botInfoSection}
${userInfoSection}
${commandsSection}

✨✧･ﾟ: *✧･ﾟ:* SYSTEM LOADED *:･ﾟ✧*:･ﾟ✧✨`;

            await conn.sendMessage(m.chat, {
                text: Func.Styles(caption),
                footer: `© ${config.name}`,
                contextInfo: {
                    mentionedJid: [...conn.parseMention(caption)],
                    isForwarded: true,
                    externalAdReply: {
                        mediaType: 1,
                        title: Func.Styles("© " + config.name + " | Demon Mode"),
                        body: config.owner + ' / ' + config.ownername2,
                        ...config.menu,
                        sourceUrl: config.link.tt,
                        renderLargerThumbnail: true,
                    },
                },
            }, {
                quoted: m
            });
        } else if (text) {
            const tags = text.split(/[,\s]+/).filter(tag => tag.trim() !== '');
            const filteredCommands = getPluginsByTags(tags);

            const commandsSection = `
╭───────────[ 📜 ${tags.join(', ').toUpperCase()} COMMANDS ]──────────╮
${filteredCommands}
╰──────────────────────────────────╯
`;

            const caption = `${demonSlayerHeader}
${botInfoSection}
${userInfoSection}
${commandsSection}

✨✧･ﾟ: *✧･ﾟ:* SYSTEM LOADED *:･ﾟ✧*:･ﾟ✧✨`;

            await conn.sendMessage(m.chat, {
                text: Func.Styles(caption),
                footer: `© ${config.name}`,
                contextInfo: {
                    mentionedJid: [...conn.parseMention(caption)],
                    isForwarded: true,
                    externalAdReply: {
                        mediaType: 1,
                        title: Func.Styles("© " + config.name + " | Demon Slayer Mode"),
                        body: config.owner + ' / ' + config.ownername2,
                        ...config.menu,
                        sourceUrl: config.link.tt,
                        renderLargerThumbnail: true,
                    },
                },
            }, {
                quoted: m
            });
        } else {
            const allTags = [];
            Object.keys(pg.plugins).forEach(pluginName => {
                if (!pg.plugins[pluginName].disabled && pg.plugins[pluginName].tags) {
                    pg.plugins[pluginName].tags.forEach(tag => {
                        if (tag && !allTags.includes(tag.toLowerCase())) {
                            allTags.push(tag.toLowerCase());
                        }
                    });
                }
            });

            let sections = [{
                type: "list",
                title: "✧🔥 BLUE EXORCIST MENU 🔥✧",
                value: [{
                    headers: "– 乂 MAIN COMMANDS –",
                    rows: [{
                            headers: "ALL COMMANDS",
                            title: "- Lihat semua perintah yang tersedia",
                            command: `${m.prefix}menu all`
                        },
                        {
                            headers: "SCRIPT",
                            title: "- Lihat informasi script bot",
                            command: `${m.prefix}sc`
                        }
                    ]
                }, {
                    headers: "– 乂 COMMAND TAGS –",
                    rows: allTags.slice(0, 200).map(tag => ({
                        headers: tag.toUpperCase(),
                        title: `- Perintah dengan tag ${tag.toUpperCase()}`,
                        command: `${m.prefix}menu ${tag.toUpperCase()}`
                    }))
                }]
            }];

            // Format tags menu  
            const tagsList = allTags.map((tag, i) =>
                `│ ${i+1}. [🏷️] ${tag.charAt(0).toUpperCase() + tag.slice(1)}`
            ).join('\n');

            const defaultCommands = `

╭───────────[ 🏷️ MENU TAGS ]──────────╮
${tagsList}
│
│ Ketik ${m.prefix}menu <tag> untuk melihat
│ command dengan tag tertentu
│ Contoh: ${m.prefix}menu download
╰──────────────────────────────────╯`;

            const caption = `${demonSlayerHeader}

${botInfoSection}
${userInfoSection}
${defaultCommands}

✨✧･ﾟ: ✧･ﾟ: SYSTEM LOADED :･ﾟ✧:･ﾟ✧✨`;

            await conn.sendButton(m.cht, sections, m, {
                document: {
                    url: "https://www.npmjs.com/"
                },
                mimetype: "application/msword",
                fileName: config.ownername + ' / ' + config.ownername2,
                fileLength: 10,
                pageCount: 10,
                contextInfo: {
                    mentionedJid: [...conn.parseMention(caption)],
                    isForwarded: true,
                    externalAdReply: {
                        mediaType: 1,
                        title: Func.Styles("© " + config.name + " | Playground"),
                        body: "👨‍💻 Bot WhatsApp - Simple",
                        ...config.menu,
                        sourceUrl: config.link.tt,
                        renderLargerThumbnail: true,
                    },
                },
                caption,
                footer: config.name,
            });
        }
    }
};

module.exports = rin;
