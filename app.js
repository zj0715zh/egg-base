const apolloConfig = require('./app/middleware/ctrip-apollo')
module.exports = app => {
    // 开始前执行
    app.beforeStart(async () => {
        apolloConfig()
    });
    // 准备好执行
    app.ready(async () => {
        //在准备好执行阶段先执行一次定时任务
        await app.runSchedule('test')
    });
    // 关闭前执行
    app.beforeClose(async () => {
       
    });
};
//以上生命周期已经被废弃，建议查看https://eggjs.org/zh-cn/advanced/loaderUpdate.html升级