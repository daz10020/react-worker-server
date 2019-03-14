const Images = {}
// 读取所有js文件
const requireModule = require.context('.', false, /\.png$/)
requireModule.keys().forEach(fileName => {
    const key = fileName.replace(/(\.\/|\.png)/g, '')
    Images[key] = requireModule(fileName)
})

export default Images
