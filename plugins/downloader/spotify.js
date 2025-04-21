// © HanakoBotz
// • By: Leooxzy - Deku
// • Owner: 6283136099660

// By: Leooxzy
// Bio cr: Krz

let axios = require('axios')
let api = 'https://spotifyapi.caliphdev.com'

let handler = async (m, {
    conn,
    Func,
    text
}) => {
    switch (m.command) {
        case 'spotifyplay': {
            if (!text) throw '⚠️ Masukan Nama Lagu !'
            const {
                data: search
            } = await axios(api + '/api/search/tracks', {
                post: 'GET',
                params: {
                    q: text
                }
            });
            const {
                data: detail
            } = await axios(api + '/api/info/track', {
                post: 'GET',
                params: {
                    url: search[0].url
                }
            });
            let linkurl;
            try {
                const {
                    data: downloader
                } = await axios.post('https://spotydown.media/api/download-track', {
                    url: detail.url
                }, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                linkurl = downloader.file_url
            } catch (e) {
                try {
                    linkurl = `${api + '/api/download/track?url=' + detail.url}`
                } catch (e) {}
            }
            const caption = `📁 Spotify Downloader
> • *Title:* ${detail.title || ''}
> • *Artist:* ${detail.artist || ''}
> • *Album:* ${detail.album || ''}
> • *Url:* ${detail.url || ''}
> • *Link-Download:* ${linkurl}`;
            m.reply(caption);
            let audio;
            try {
                const {
                    data: downloader
                } = await axios.post('https://spotydown.media/api/download-track', {
                    url: detail.url
                }, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                audio = {
                    url: downloader.file_url
                }
            } catch (e) {
                try {
                    const {
                        data
                    } = await axios(api + '/api/download/track', {
                        post: 'GET',
                        params: {
                            url: detail.url
                        },
                        responseType: 'arraybuffer'
                    });
                    audio = data
                } catch (e) {}
            }

            conn.sendMessage(m.chat, {
                audio,
                mimetype: 'audio/mpeg'
            }, {
                quoted: m
            });
        }
        break
        case 'spotify':
        case 'spdl': {
            if (!text) throw '⚠️ Masukan Link/Query !'
            if (Func.isUrl(text)) {
                if (!/open.spotify.com/.test(text)) throw '⚠️Mana Link Spotify Nya !';
                const {
                    data: detail
                } = await axios(api + '/api/info/track', {
                    post: 'GET',
                    params: {
                        url: text
                    }
                });
                let linkurl;
                try {
                    const {
                        data: downloader
                    } = await axios.post('https://spotydown.media/api/download-track', {
                        url: detail.url
                    }, {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        }
                    })
                    linkurl = downloader.file_url
                } catch (e) {
                    try {
                        linkurl = `${api + '/api/download/track?url=' + detail.url}`
                    } catch (e) {}
                }
                const caption = `📁 Spotify Downloader
> • *Title:* ${detail.title || ''}
> • *Artist:* ${detail.artist || ''}
> • *Album:* ${detail.album || ''}
> • *Url:* ${detail.url || ''}
> • *Link-Download:* ${linkurl}`;
                m.reply(caption);
                let audio;
                try {
                    const {
                        data: downloader
                    } = await axios.post('https://spotydown.media/api/download-track', {
                        url: detail.url
                    }, {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        }
                    })
                    audio = {
                        url: downloader.file_url
                    }
                } catch (e) {
                    try {
                        const {
                            data
                        } = await axios(api + '/api/download/track', {
                            post: 'GET',
                            params: {
                                url: detail.url
                            },
                            responseType: 'arraybuffer'
                        });
                        audio = data
                    } catch (e) {}
                }

                conn.sendMessage(m.chat, {
                    audio,
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: m
                });
            } else {
                const {
                    data: search
                } = await axios(api + '/api/search/tracks', {
                    post: 'GET',
                    params: {
                        q: text
                    }
                });
                if (!search && !search.length > 0) throw '⚠️ Maaf Lagu Yg Anda Search Tidak Di Temukan';

                let message = `🔍 Search Spotify\n\n`;
                message += search.map((a, i) => `\`[ ${i + 1} ]\`\n> • Title: ${a.title}\n> • Artist: ${a.artist}\n> • Url: ${a.url}`).join("\n\n");
                await conn.sendAliasMessage(m.chat, {
                    text: message
                }, search.map((a, i) => ({
                    alias: `${i + 1}`,
                    response: `${m.prefix + m.command} ${a.url}`
                })), m);
            }
        }
        break
    };
};

handler.help = ["spotify", "spdl", "spotifyplay"].map(v => v + ' *[ Download/Search Lagu ]* ');
handler.tags = ["downloader", "internet"];
handler.command = ["spotify", "spdl", "spotifyplay"];
handler.limit = true;
handler.loading = true;

module.exports = handler;
