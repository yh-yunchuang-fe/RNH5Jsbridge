/**
 * 事件管理器
 */
class Events {
    public static instance: any;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Events();
        }
        return this.instance;
    }

    public handlers: any;

    constructor() {
        this.handlers = {};
    }

    /**
     * 事件注册
     * @param {*} event 事件名字
     * @param {*} handlers 执行函数
     */
    public on(evt: any, handlers: any) {
        this.handlers[evt] = this.handlers[evt] || [];
        this.handlers[evt].push(handlers);
        return this.handlers[evt];
    }

    /**
     * 事件方法解绑
     * @param {*} event 事件名字
     */
    public off(evt: any, func: any) {
        if (this.handlers[evt] && !func) {
            delete this.handlers[evt];
        } else if (this.handlers[evt] && func) {
            const funcs = this.handlers[evt];

            const cfuncs: any = [];

            funcs.map((fn: any) => {
                // 不能用 ===
                if (fn !== func) {
                    cfuncs.push(fn)
                }
                return false;
            });

            if (!funcs.length) {
                delete this.handlers[evt];
            } else {
                this.handlers[evt] = cfuncs;
            }
        }
    }

    /**
     * 触发事件
     * @param {*} event 事件名字
     * @param {*} args 执行参数
     */
    public trigger(evt: any, ...params: any) {
        const funcs = this.handlers[evt];
        const result: any = [];
        if (funcs) {
            funcs.forEach((f: any) => {
                result.push(f.apply(this, params));
            });
        }
        return result.length === 1 ? result[0] : result;
    }
}

const event = Events.getInstance();

export default event
