# React native UserReport tracking example

## Setup dependencies

```bash
npm install --save @apr/react-native-userreport-sdk
```

<!-- * `react-native-device-info` is used to get device information:

```bash
npm install --save react-native-device-info
```

* `react-native-advertising-id` is used to retrieve AAID and IDFA

```bash
npm install --save react-native-advertising-id
``` -->

## Setup of [react-native-advertising-id](https://www.npmjs.com/package/react-native-advertising-id)

Following instructions are from package [react-native-advertising-id](https://www.npmjs.com/package/react-native-advertising-id), copied for your convinence. 

### IOS

1. In XCode, in the project navigator, right click Libraries ➜ Add Files to [your project's name]

2. Go to node_modules ➜ react-native-advertising-id ➜ ios  and add RNAdvertisingId.xcodeproj

3. In XCode, in the project navigator, select your project. Add libRNAdvertisingId.a to your project's Build Phases ➜ Link Binary With Libraries

4. Run your project (Cmd+R)<

### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import info.applike.advertisingid.RNAdvertisingIdPackage;` to the imports at the top of the file
  - Add `new RNAdvertisingIdPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
    ```gradle
    include ':react-native-advertising-id'
    project(':react-native-advertising-id').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-advertising-id/android')
    ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
    ```gradle
      compile project(':react-native-advertising-id')
    ```
4. Update your `mainfest.xml` and declare that your app is an Ad Manager app, as instructed on [Google's Ad Manager guide](https://developers.google.com/ad-manager/mobile-ads-sdk/android/quick-start#update_your_androidmanifestxml):
```xml
<manifest>
    <application>
        <meta-data
            android:name="com.google.android.gms.ads.AD_MANAGER_APP"
            android:value="true"/>
    </application>
</manifest>
```

## Usage for screen/section tracking

Configure the UserReport ReactNative SDK using your `PUBLISHER_ID` and your `MEDIA_ID`.

Your `PUBLISHER_ID` and `MEDIA_ID` can be found on the Media Setting page in UserReport.


```javascript
// Configure
UserReport.configure("PUBLISHER_ID","MEDIA_ID");
```

Example: 

```javascript
//App.js
import {Platform} from 'react-native';
import UserReport from '@apr/react-native-userreport-sdk'

export default class App extends Component{
    componentDidMount() {
        var mediaId = Platform.OS === 'ios' ?
         "MEDIA_ID_FOR_IOS": "MEDIA_ID_FOR_ANDROID";
      
        UserReport.configure("PUBLISHER_ID",mediaId);
    }
}
```

There are two types of tracking:
  - Screen view tracking (`UserReport.trackScreenView()`)
  - Section view tracking (`UserReport.trackSectionScreenView()`)

If a media (website) has one single topic, it can be tracked using `UserReport.trackScreenView()`.

If a website has different sections, for instance *Health*, *World news* and *Local news*, then it should be tracked using `UserReport.trackSectionScreenView(sectionId)`.  The `sectionId` for a particular section can be found on the Media Setting page in UserReport.
Even when `UserReport.trackSectionScreenView(sectionId)` is used `UserReport.trackScreenView()` should be invoked as well.

Example of manual tracking:
```javascript
export default class ScreenView extends Component {
    componentDidMount() {
        UserReport.trackScreenView();
    }

    render() {...}
}
```
