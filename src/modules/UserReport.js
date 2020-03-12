import AsyncStorage from '@react-native-community/async-storage';
import RNAdvertisingId from 'react-native-advertising-id';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

export default class UserReport {
    configure = async (sakId, mediaId) => {
        try {
            await AsyncStorage.setItem('sakId', sakId);
            await AsyncStorage.setItem('mediaId', mediaId);
        } catch (e) {
            console.warn(e);
        }
    };

    gettingData = async () => {
        try {
        const sakId = await AsyncStorage.getItem('sakId');
        const mediaId = await AsyncStorage.getItem('mediaId');
        const {advertisingId} = await RNAdvertisingId.getAdvertisingId();
        const platform = Platform.OS;
        const random = Math.floor(Math.random() * 1e10);
        const bundleId = DeviceInfo.getBundleId();
        const buildNumber = DeviceInfo.getBuildNumber();
        const url = `https://sak.userreport.com/${sakId}/media/${mediaId}/${platform}.json`;
        const data = await fetch(url);
        return { advertisingId, random, bundleId, buildNumber, data};
        } catch (e) {
            console.warn(e);
        }
    };

    trackScreenView = async () => {
        const {advertisingId, random, bundleId, buildNumber, data} = await this.gettingData();
        const {kitTcode} = await data.json();
        const idfv = Platform.OS === 'ios' ? `&idfv=${DeviceInfo.getUniqueId()}` : '';
        const track = `?r=${random}&t=${kitTcode}&d=${advertisingId}&med=${bundleId}${buildNumber}${idfv}`;
        fetch(`https://visitanalytics.userreport.com/hit.gif${track}`)
            .then(res => console.log(res)).catch(res => console.warn(res));
    };

    trackSectionScreenView = async (sectionId) => {
        const {advertisingId, random, bundleId, buildNumber, data} = await this.gettingData();
        const {sections} = await data.json();
        const tCode = sections[sectionId];
        const idfv = Platform.OS === 'ios' ? `&idfv=${await DeviceUUID.getUUID()}` : '';
        const track = `?r=${random}&t=${tCode}&d=${advertisingId}&med=${bundleId}${buildNumber}${idfv}`;
        fetch(`https://visitanalytics.userreport.com/hit.gif${track}`)
            .then(res => console.log(res)).catch(res => console.warn(res));
    };
}
