import RNAdvertisingId from 'react-native-advertising-id';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

export default class UserReport {
    static myInstance = null;
    userData = { sakId: "", mediaId: ""}
    JSON_FILE = {}

    static getInstance() {
        if (UserReport.myInstance == null) {
            UserReport.myInstance = new UserReport();
        }
        return this.myInstance;
    }

    configure(sakId, mediaId) {
        try {
            this.userData = {
                sakId: sakId,
                mediaId: mediaId
            }
            const platform = Platform.OS;
            const url = `https://sak.userreport.com/${sakId}/media/${mediaId}/${platform}.json`;
            fetch(url).then(data=> this.JSON_FILE = data.json());
        } catch (e) {
            console.warn(e);
        }
    }

    gettingData = async () => {
        try {
            const {advertisingId} = await RNAdvertisingId.getAdvertisingId();
            const random = Math.floor(Math.random() * 1e10);
            const bundleId = DeviceInfo.getBundleId();
            const buildNumber = DeviceInfo.getBuildNumber();
            return {advertisingId, random, bundleId, buildNumber};
        } catch (e) {
            console.warn(e);
        }
    };

    trackScreenView = async () => {
        const {advertisingId, random, bundleId, buildNumber} = await this.gettingData();
        const {kitTcode} = this.JSON_FILE;
        const idfv = Platform.OS === 'ios' ? `&idfv=${DeviceInfo.getUniqueId()}` : '';
        const track = `?r=${random}&t=${kitTcode}&d=${advertisingId}&med=${bundleId}${buildNumber}${idfv}`;
        fetch(`https://visitanalytics.userreport.com/hit.gif${track}`)
            .then(res => console.log(res)).catch(res => console.warn(res));
    };

    trackSectionScreenView = async (sectionId) => {
        const {advertisingId, random, bundleId, buildNumber} = await this.gettingData();
        const {sections} = this.JSON_FILE;
        const tCode = sections[sectionId];
        const idfv = Platform.OS === 'ios' ? `&idfv=${await DeviceUUID.getUUID()}` : '';
        const track = `?r=${random}&t=${tCode}&d=${advertisingId}&med=${bundleId}${buildNumber}${idfv}`;
        fetch(`https://visitanalytics.userreport.com/hit.gif${track}`)
            .then(res => console.log(res)).catch(res => console.warn(res));
    };
}
