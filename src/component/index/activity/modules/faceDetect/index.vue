<template>
    <div class="faceDetect">
        <Checkbox  @on-change="changbox" v-model="enable" style="margin: 20px 0 20px 40px;">{{lang.enable_face_recognition}}</Checkbox>
        <div v-if="openFace" class="faceDetect-content">
            <div class="faceDetect-content-top">
              <div class="qr-code">
                <img :src="qrcodePackage.src" v-if="qrcodePackage.src" style="width: 130px;"/>
                <a class="qrcode-cover" :href="qrcodePackage.src" :download="getName()">
                  <i class="icon-download"></i>
                  <p>{{lang.download_qr_code}}</p>
                </a>
              </div>
              <div class="faceDetect-content-top-right">
                <div class="faceDetect-content-address">{{lang.face_package_address}}</div>
                <Input ref="copyAddress" v-model="packageUrl" readonly style="width:250px;margin-top:10px;">
                    <span @click="copyAddress" slot="append" class="btn">{{lang.copy}}</span>
                </Input>
                <div class="faceDetect-content-message">{{lang.hint}}：{{lang.after_install_package}}</div>
              </div>
            </div>
            <div class="faceDetect-content-top">
               <div class="qr-code">
                <img :src="qrcode.src" v-if="qrcode.src" style="width: 130px;"/>
                <a class="qrcode-cover" :href="qrcode.src" :download="getName()">
                  <i class="icon-download"></i>
                  <p>{{lang.download_qr_code}}</p>
                </a>
              </div>
              <div class="faceDetect-content-top-right">
                <div class="faceDetect-content-address">{{lang.meeting_id}}</div>
                <Input ref="copyConference" v-model="conferenceId" style="width:250px;margin-top:20px;" :class="['row-group']" readonly>
                  <span @click="copyConferenceId" slot="append" class="btn">{{lang.copy}}</span>
                </Input>
                <div class="faceDetect-content-message">{{lang.hint}}：{{lang.install_success_code}}</div>
              </div>
            </div>
            <div v-if="isEdit" class="faceDetect-content-edit">
              <div class="faceDetect-content-edit-title">{{lang.face_success_prompt}}</div>
              <Input v-model="editDate.succeedMessageTemplate" :placeholder="lang.enter_prompt_content" style="width:350px;" :class="['row-group']" type="textarea">
              </Input>
              <div class="faceDetect-content-edit-title">{{lang.face_failed_prompt}}</div>
              <Input v-model="editDate.failedMessage" :placeholder="lang.enter_prompt_content" style="width:350px;" :class="['row-group']" type="textarea">
              </Input>
              <div class="faceDetect-content-edit-title">{{lang.check_repeat_prompt}}</div>
              <Input v-model="editDate.duplicateMessageTemplate" :placeholder="lang.enter_prompt_content" style="width:350px;" :class="['row-group']" type="textarea">
              </Input>
              <div>
                <Button @click="confirmEdit" :disabled="((editDate.succeedMessageTemplate === showDate.succeedMessageTemplate) && (editDate.failedMessage === showDate.failedMessage) && (editDate.duplicateMessageTemplate === showDate.duplicateMessageTemplate)) || (editDate.succeedMessageTemplate === '') || (editDate.failedMessage === '') || (editDate.duplicateMessageTemplate === '')"  type="primary">{{lang.save}}</Button>
                <Button @click="cancelEdit" class="cancel" type="primary">{{lang.cancel}}</Button>
              </div>
            </div>
            <div v-if="!isEdit" class="faceDetect-content-noedit">
              <div class="faceDetect-content-noedit-title">{{lang.face_success_prompt}}</div>
              <div class="faceDetect-content-noedit-detail">{{showDate.succeedMessageTemplate}}</div>
              <div class="faceDetect-content-noedit-title">{{lang.face_failed_prompt}}</div>
              <div class="faceDetect-content-noedit-detail">{{showDate.failedMessage}}</div>
              <div class="faceDetect-content-noedit-title">{{lang.check_repeat_prompt}}</div>
              <div class="faceDetect-content-noedit-detail">{{showDate.duplicateMessageTemplate}}</div>
              <Button @click="editMessage" style="margin-top: 10px" :class="['row-group']" type="primary">{{lang.edit}}</Button>
            </div>
        </div>
    </div>
</template>

<script>
import * as siginActions from "app_src/actions/activity/signin";
import * as userActions from "app_src/actions/user";
import * as commonActions from "app_src/actions/common";
import * as faceActions from "app_src/actions/activity/faceDetect";
import lang from "app_src/languages/";

import config from "app_src/config/";
import QRCode from "qrcode";

import productionFace from "app_src/assets/images/faceDetect/face_signIn.png";
import testFace from "app_src/assets/images/faceDetect/face_test.png";

export default {
  props: ["id", "activityId"],
  data() {
    return {
      showDate: {
        duplicateMessageTemplate: "",
        failedMessage: "",
        succeedMessageTemplate: ""
      },
      editDate: {
        duplicateMessageTemplate: "",
        failedMessage: "",
        succeedMessageTemplate: ""
      },
      //  会议ID号
      conferenceId: "",
      //  生成安装包二维码的地址
      packageUrl: "",
      //  保存按鈕禁用
      enable: false,
      isEdit: false,
      openFace: false,
      qrcode: {
        text: "",
        size: 130,
        margin: 0,
        url: "",
        name: `${Date.now()}.png`,
        src: ""
      },
      qrcodePackage: {
        text: "",
        size: 130,
        margin: 0,
        url: "",
        name: `${Date.now()}x.png`,
        src: ""
      },
      copy_success: ''
    };
  },
  methods: {
    //  获取提示语信息
    getSettings() {
      faceActions.getSetting({
        activityId: this.activityId,
        success: res => {
          this.enable = res.recognizeNotifySetting.enable;
          if (this.enable === true) {
            this.openFace = true;
          } else {
            this.openFace = false;
          }
          this.showDate.duplicateMessageTemplate =
            res.recognizeNotifySetting.duplicateMessageTemplate;
          this.showDate.failedMessage =
            res.recognizeNotifySetting.failedMessage;
          this.showDate.succeedMessageTemplate =
            res.recognizeNotifySetting.succeedMessageTemplate;
          this.editDate = JSON.parse(JSON.stringify(this.showDate));
          this.qrcode.text = res.conferenceId;
          this.conferenceId = res.conferenceId;
          //  生成二维码
          QRCode.toDataURL(
            this.qrcode.text,
            {
              errorCorrectionLevel: "Q",
              type: "image/png",
              margin: 0
            },
            (err, url) => {
              if (!err) {
                this.qrcode.src = url;
                this.qrcode.url = url;
              }
            }
          );
        }
      });
    },
    //  编辑提示语
    editMessage() {
      this.isEdit = true;
    },
    //  取消编辑
    cancelEdit() {
      this.isEdit = false;
      this.editDate = JSON.parse(JSON.stringify(this.showDate));
    },
    //  保存编辑
    confirmEdit() {
      faceActions.updateMessage({
        activityId: this.activityId,
        notifySettingDTO: this.editDate,
        success: () => {
          this.isEdit = false;
          this.getSettings();
        }
      });
    },
    //  开启人脸识别
    changbox(val) {
      this.enable = val;
      if (val === true) {
        this.openFace = true;
      } else {
        this.openFace = false;
        this.isEdit = false;
      }
      faceActions.enableFace({
        activityId: this.activityId,
        enable: this.enable
      });
    },
    //  复制安装包地址
    copyAddress() {
      let inputNum = this.$refs.copyAddress.$el.getElementsByTagName(
        "input"
      )[0];
      inputNum.select();
      document.execCommand("copy");
      this.alert_success(this.copy_success);
    },
    //  复制会议号ID
    copyConferenceId() {
      let inputNum = this.$refs.copyConference.$el.getElementsByTagName(
        "input"
      )[0];
      inputNum.select();
      document.execCommand("copy");
      this.alert_success(this.copy_success);
    },
    //  下载图片
    getName() {
      return `${Date.now()}.png`;
    }
  },
  created() {

    this.getSettings();
    if (config.shortUrl === "face_production") {
      this.packageUrl = "https://www.pgyer.com/erV4";
    } else if (config.shortUrl === "face_test") {
      this.packageUrl = "https://www.pgyer.com/4bI5";
    }

    this.copy_success = this.lang.copy_success;
    QRCode.toDataURL(
      this.packageUrl,
      {
        errorCorrectionLevel: "Q",
        type: "image/png",
        margin: 0
      },
      (err, url) => {
        if (!err) {
          this.qrcodePackage.src = url;
          this.qrcodePackage.url = url;
        }
      }
    );
  }
};
</script>

<style lang="less">
.faceDetect {
  padding: 20px 0 0;
  color: #555555;
  .row-group {
    // margin-top: 20px;
  }

  .btn {
    cursor: pointer;
    color: #555555;
  }

  &-content {
    a {
      color: #555555;
    }
    &-top {
      overflow: hidden;
      padding-left: 40px;
      .qr-code {
        float: left;
        margin-bottom: 30px;
        display: inline-block;
        position: relative;
        &-logo {
          position: absolute;
          width: 30px;
          height: 30px;
          top: 50%;
          left: 50%;
          margin-top: -15px;
          margin-left: -15px;
          background: red;
        }
        img {
          border: 1px solid #d0d0d0;
          padding: 5px;
        }

        &:hover {
          .qrcode-cover {
            display: block;
          }
        }
        .qrcode-cover {
          cursor: pointer;
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.9);
          padding-top: 50px;
          text-align: center;
          i {
            font-size: 24px;
          }

          &:hover {
            font-size: 12px;
          }
        }
      }

      &-right {
        float: left;
        margin-left: 20px;
        width: 250px;
      }
    }

    &-address {
      margin-bottom: 17px;
      font-size: 14px;
      color: #111;
    }

    &-message {
      margin-top: 10px;
      margin-bottom: 20px;
      color: #888;
      font-size: 12px;
    }

    &-edit {
      padding: 30px 40px;
      height: 500px;
      background: rgba(250, 250, 250, 1);

      &-title {
        margin-bottom: 12px;
        font-size: 14px;
        color: #111;
      }

      .cancel {
        margin-left: 10px;
        background: #e4e4e4;
        border: 1px solid #e4e4e4;
        color: #555555;
      }

      .ivu-input-wrapper {
        width: 400px !important;
      }

      textarea.ivu-input {
        margin-bottom: 20px !important;
        height: 80px !important;
      }
    }

    &-noedit {
      padding: 30px 40px;
      height: 500px;
      background: rgba(250, 250, 250, 1);
      &-title {
        margin-bottom: 12px;
        font-size: 14px;
        color: #111;
      }
      &-detail {
        margin-bottom: 20px;
        font-size: 14px;
        color: #555;
      }
    }
  }

  // .btnDisabled {
  //   cursor: not-allowed;
  //   opacity: 0.5 !important;
  // }
}
</style>
