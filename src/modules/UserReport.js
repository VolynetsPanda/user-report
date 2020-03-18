import RNAdvertisingId from 'react-native-advertising-id';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

const checkData= (data, name, logError) =>
    (data === undefined || data === null)
    ? logError(`${name} not received`)
    : data;

const getAnanyticsUrl = async (code, logError) => {
        let advertisingId = '00000000-0000-0000-0000-000000000000';
        try{
            const rnaResponse = await RNAdvertisingId.getAdvertisingId();
            if(rnaResponse && rnaResponse.advertisingId){
                advertisingId = rnaResponse.advertisingId;
            }

        }catch(e){
            logError("Can not get advetising Id (AAID or IDFA)");
        }
        const random = Math.floor(Math.random() * 1e10);
        const bundleId = checkData(DeviceInfo.getBundleId(), 'BundleId', logError);
        const buildNumber = checkData(DeviceInfo.getBuildNumber(), 'BuildNumber', logError);
        const idfv = Platform.OS === 'ios' ? `&idfv=${DeviceInfo.getUniqueId()}` : '';
        return `https://visitanalytics.userreport.com/hit.gif?r=${random}&t=${code}&d=${advertisingId}&med=${bundleId}${buildNumber}${idfv}`;
};
const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(`Unable to fetch sak-config. status: ${response.status}; statusText: ${response.statusText}`);
    }
    return response;
};

export default {
    configure: (sakId, mediaId, settings) => {
        this.sakId = sakId;
        this.mediaId = mediaId;
        this.settings = settings;
        this.logError = settings?.logToConsole ? console.error : function(){};
        this.logInfo = settings?.logToConsole ? console.info : function(){};

        const platform = checkData(Platform.OS, 'platform', logError);
        const url = `https://sak.userreport.com/${sakId}/media/${mediaId}/${platform}.json`;
        fetch(url)
            .then(handleErrors)
            .then(data=> {
                 data.json()
                    .then(json=> {
                        this.sakData = json;
                    })
                    .catch(this.logError);
            })
            .catch(this.logError);
    },

    trackSectionScreenView: sectionId => {
        try{
            if (this.sakData) {
                if(this.sakData.sections){
                    const kitTcode = this.sakData.sections[sectionId];
                    getAnanyticsUrl(kitTcode, logError)
                        .then(url=> {
                            fetch(url)
                            .then(this.logInfo)
                            .catch(this.logError);
                        })
                        .catch(this.logError);
                }else{
                    this.logError("There is no sections in this media")
                }
            }else{
                this.logError("UserReport is not configured properly.")
            }
        } catch (e) {
            this.logError(e);
        }
        
    },

    trackScreenView: () => {
        try{
            if (this.sakData) {
                const {kitTcode} = sakData;
                getAnanyticsUrl(kitTcode)
                    .then(url=> {
                        fetch(url)
                        .then(res => this.logInfo(res))
                        .catch(e => this.logError(e));
                    })
                    .catch(e=> this.logError(e));
            }else {
                this.logError("UserReport is not configured properly.")
            }
        } catch (e) {
            this.logError(e);
        }
    },
  };