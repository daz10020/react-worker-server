export const Images = {
    bg: require('./images/bg.png'),
    logo: require('./images/logo.png'),
    tit1: require('./images/tit1.png'),
    tit2: require('./images/tit2.png'),
    dImgAct: require('./images/dImgAct.gif'),
    dImg: require('./images/dImg.png'),
    circle: require('./images/circle.png'),
    btn: require('./images/btn.png'),
    sucBg: require('./images/sucBg.png'),
}

export const getBg = key =>  {
    return {
        backgroundImage: `url(${Images[key]})`
    }
}