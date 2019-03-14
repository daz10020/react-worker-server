//config配置
window.config = {
    url: null
};


//IP配置
(function JiP() {
    let jsIP = null;
    if (document.domain === "localhost") {
        jsIP = true
    } else if (!isNaN(document.domain.substring(0, 1))) {
        jsIP = true
    } else {
        jsIP = false
    }

    if (jsIP) {
        window.config.url = "http://192.168.0.254:8080/shudailaoshi-web";
        window.config.url1 = 'https://testapi.vipboluo.com';
        //官网
        window.config.PCwebsite='http://192.168.0.254:5000'
    } else {
        window.config.url1 = "https://api.vipboluo.com";
        //官网
        window.config.PCwebsite='https://www.boluozaixian.com'
        if (window.location.protocol === "http:") {
            window.config.url = "http://admin.boluozaixian.com";
        }
        if (window.location.protocol === "https:") {
            window.config.url = "https://admin.boluozaixian.com";
        }
    }
})();
