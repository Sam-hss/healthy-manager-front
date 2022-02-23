import {Message, MessageBox, Notification} from 'element-ui';

const m = {
  info(msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'info'
    });
  },
  error(msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'error'
    });
  },
  success(msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'success'
    });
  },
  warning(msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'warning'
    });
  },

  /**
   *
   * @param msg
   * @param icon 可为["success"，"error"，"info"，"warning"]
   * @returns {Promise<any>}
   */
  confirm2(msg, icon,) {
    return new Promise(function (resolve, reject) {
      MessageBox.confirm(msg, "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: icon
      }).then(() => {
        resolve();
      }).catch(() => {
        reject();
      })
    })
  },
  confirm(msg) {
    return new Promise((resolve, reject) => {
      MessageBox.confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resolve()
      })
          .catch(() => {
            reject()
          });
    })
  },
  prompt(msg) {
    return new Promise((resolve, reject) => {
      MessageBox.prompt(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        resolve(value)
      }).catch(() => {
        reject()
      });
    })
  },
  notification(msg, title, type) {
    Notification({
      title: title == null ? "通知" : title,
      type: type == null ? "info" : type,
      message: msg,
      iconClass: "el-icon-bell"
    })
  },
  notification2(msg, type) {
    Notification({
      type: type == null ? "info" : type,
      message: msg
    })
  }
}

export default m;
