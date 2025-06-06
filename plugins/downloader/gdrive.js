const axios = require('axios')
const {
    writeFileSync
} = require('fs')
const {
    tmpdir
} = require('os')
const path = require('path')

module.exports = {
    help: ['googledrive', 'gdrive'].map(v => v + ' *[ Mendownload Drive Google ]* '),
    command: ['googledrive', 'gdrive'],
    tags: ['downloader'],
    loading: true,
    limit: true,
    code: async (m, {
        ctx,
        text
    }) => {
        if (!text.includes('drive')) throw `Contoh: ${m.prefix + m.command} https://drive.google.com/file/d/xxxxxxxxx/view`

        const match = text.match(/\/d\/([^/]+)|open\?id=([^&]+)/)
        const fileId = match ? (match[1] || match[2]) : null
        if (!fileId) throw 'URL Google Drive tidak valid!'

        try {
            const apiKey = 'AIzaSyAA9ERw-9LZVEohRYtCWka_TQc6oXmvcVU'
            const metaUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=name,size,mimeType&key=${apiKey}`
            const downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`

            const metadata = await axios.get(metaUrl)
            const {
                name,
                size,
                mimeType
            } = metadata.data

            m.reply(`Mendownload file...\n\n• Nama: ${name}\n• Ukuran: ${await formatSize(size)}\n• Tipe: ${mimeType}`)

            const res = await axios.get(downloadUrl, {
                responseType: 'arraybuffer'
            })

            if (res.status !== 200) {
                throw `Gagal mengunduh file: ${res.status} ${res.statusText}`
            }

            const buffer = Buffer.from(res.data, 'binary')
            const tmpPath = path.join(tmpdir(), name)
            writeFileSync(tmpPath, buffer)

            await ctx.sendMessage(m.chat, {
                document: {
                    url: tmpPath
                },
                fileName: name,
                mimetype: mimeType || 'application/octet-stream',
                caption: `File berhasil diunduh!\n\n• Nama: ${name}\n• Ukuran: ${await formatSize(size)}`
            }, {
                quoted: m
            })

        } catch (err) {
            console.error(err)
            throw typeof err === 'string' ? err : `Terjadi kesalahan: ${err.response?.status} ${err.response?.statusText}`
        }
    },
};

async function formatSize(bytes) {
 const sizes = ['B', 'KB', 'MB', 'GB']
 if (bytes === 0) return '0 B'
 const i = Math.floor(Math.log(bytes) / Math.log(1024))
 return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}
