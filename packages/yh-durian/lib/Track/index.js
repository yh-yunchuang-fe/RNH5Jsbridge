import { NativeModules, Platform, Dimensions } from 'react-native';
const RNSensorsAnalyticsModule = NativeModules.RNSensorsAnalyticsModule;
const CommonModule = NativeModules.CommonModule;
const window = Dimensions.get('window');

class Track {
  constructor(props) {
    this.instance = null;
    this.presetProperty = Object.assign({
      appName: 'yhPartner',
      partner_userId: '',
      partner_deviceId: '',
      partner_deviceModel: '',
      partner_operationSystem: '',
      partner_osVersion: '',
      partner_screenWidth: window.width,
      partner_screenHeight: window.height,
      partner_eventTime: '',
      partner_shopId: '',
      partner_shopName: '',
      partner_useWifi: '',
      partner_useGps: '',
      partner_useBluetooth: '',
      partner_platform: Platform.OS,
      partner_version: '',
      partner_isLocAllowed: '',
      partner_userCurrentLongitude: '',
      partner_userCurrentLatitude: '',
      partner_userCurrentAltitude: '',
      partner_userCurrentAccuracy: ''
    }, props || {});
  } // 保存预置属性


  savePresetProperty(key, value) {
    this.presetProperty[key] = value;
  }

  saveMultiPresetProperty(obj) {
    if (!obj) {
      return;
    }

    this.presetProperty = { ...this.presetProperty,
      ...obj
    };
  }

  async addTrack(trackName, params = {}) {
    try {
      let info = await CommonModule.trackInfo();
      info = info || {};

      for (let key in info) {
        if (!key.startsWith('partner_')) {
          info['partner_' + key] = info[key];
          delete info[key];
        }
      }

      this.saveMultiPresetProperty(info);
      let eventTime = new Date().getTime();
      this.savePresetProperty('partner_eventTime', eventTime);
      params = { ...this.presetProperty,
        ...params
      };
      console.log(params);
      RNSensorsAnalyticsModule.track(trackName, params);
    } catch (err) {
      console.log(err);
    }
  }

  static getInstance(props) {
    if (!this.instance) {
      this.instance = new Track(props);
    }

    return this.instance;
  }

}

export default Track.getInstance();