import AsyncStorage from '@react-native-community/async-storage';
import RNAdvertisingId from 'react-native-advertising-id';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

export default class UserReport {
    static myInstance = null;

    static getInstance() {
        if (UserReport.myInstance == null) {
            UserReport.myInstance = new UserReport();
        }
        return this.myInstance;
    }
    configure = async (sakId, mediaId) => {
        try {
            const platform = this.checkData(Platform.OS, 'platform');
            const url = `https://sak.userreport.com/${sakId}/media/${mediaId}/${platform}.json`;
            const data = await fetch(url);
            const dataJson = await data.json();
            if (dataJson !== null) {
                const string = JSON.stringify(dataJson);
                await AsyncStorage.setItem('json_file', string);
            } else {
                console.warn('json_file');
            }
        } catch (e) {
            console.warn(e);
        }
    };

    gettingData = async (code) => {
        const {advertisingId} = await RNAdvertisingId.getAdvertisingId();
        const random = Math.floor(Math.random() * 1e10);
        const bundleId = this.checkData(DeviceInfo.getBundleId(), 'BundleId');
        const buildNumber = this.checkData(DeviceInfo.getBuildNumber(), 'BuildNumber');
        const idfv = Platform.OS === 'ios' ? `&idfv=${DeviceInfo.getUniqueId()}` : '';
        return `?r=${random}&t=${code}&d=${advertisingId}&med=${bundleId}${buildNumber}${idfv}`;
    };

    checkData = (data, name) =>
        (data === undefined || data === null)
            ? console.warn(`${name} not received`)
            : data;

    trackScreenView = async () => {
        try {
            const data = await AsyncStorage.getItem('json_file');
            if (data !== null) {
                const {kitTcode} = JSON.parse(data);
                const track = await this.gettingData(kitTcode);
                fetch(`https://visitanalytics.userreport.com/hit.gif${track}`)
                    .then(res => console.log(res)).catch(e => console.warn(e)).done();
            }
        } catch (e) {
            console.warn(e);
        }
    };

    trackSectionScreenView = async (sectionId) => {
        try {
            const data = await AsyncStorage.getItem('json_file');
            if (data !== null) {
                const sections = await JSON.parse(data);
                const tCode = sections[sectionId];
                const track = await this.gettingData(tCode);
                fetch(`https://visitanalytics.userreport.com/hit.gif${track}`)
                    .then(res => console.log(res)).catch(e => console.warn(e)).done();
            }
        } catch (e) {
            console.warn(e);
        }
    };
}
