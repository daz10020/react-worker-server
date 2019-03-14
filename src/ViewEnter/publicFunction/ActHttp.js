import { Toast } from "antd-mobile";

const { stringify } = require('querystring')

class Http {
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {//响应成功
            return response;
        }
        if (response.status === 301 || response.status === 302) {//重定向
            window.location = response.headers.get('Location');
        }
        const error = new Error(response.statusText);
        error.data = response;
        throw error;
    }

    //解析返回的结果
    async parseResult(response) {
        const contentType = response.headers.get('Content-Type');
        if (contentType != null) {
            if (contentType.indexOf('text') > -1) {
                return await response.text()
            }
            if (contentType.indexOf('form') > -1) {
                return await response.formData();
            }
            if (contentType.indexOf('video') > -1) {
                return await response.blob();
            }
            if (contentType.indexOf('json') > -1) {
                return await response.json();
            }
        }
        return await response.text();
    }

    async processResult(response, headers) {
        let _response = this.checkStatus(response)
        _response = await this.parseResult(_response);
        const { success, data, msg, code } = _response
        if (success) {
            return data;
        } else {
            const { hideMsg } = headers
            !hideMsg && Toast.fail(msg)
            const error = new Error(code);
            error.data = response;
            throw error;
        }
    }

    async _request(url, init, headers = {}) {
        try {
            let options = Object.assign(
                {
                    credentials: 'include',//允许跨域
                },
                init
            );
            options.headers = Object.assign({}, options.headers || {}, headers || {});
            let response = await fetch(window.config.url1 + url, options);
            response = await this.processResult(response, headers);//这里是对结果进行处理。包括判断响应状态和根据response的类型解析结果
            return response;
        } catch (error) {
            throw error;
            return null;
        }
    }

    async get(api, data = {}, headers = {}, config = {}) {
        return await this._request(`${api}?${stringify(data)}`, headers, {}, config);
    }

    async post(api, data = {}, headers = {}, config = {}) {
        const _headers = {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
            ...headers,
        };
        let formBody = JSON.stringify(data);
        if (_headers['Content-Type'] && _headers['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1) {
            formBody = new URLSearchParams();
            for (let k in data) {//遍历一个对象
                if (typeof(data[k]) === 'object') {
                    formBody.append(k, JSON.stringify(data[k]));
                } else {
                    formBody.append(k, data[k]);
                }
            }
        }

        return await this._request(
            api,
            {
                method: 'POST',
                headers: _headers,
                body: formBody,
            },
            {},
            config,
        )
    }
}

export default new Http();
