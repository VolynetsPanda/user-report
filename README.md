# React native user report

## Начало

Установите указанные пакеты:

* Получение информации об устройстве:

```bash
npm install --save react-native-device-info
```

* Получение AAID/GAID and IDFA:

```bash
npm install react-native-advertising-id
```

## Установка

### IOS

* В XCode в навигаторе проекта щелкните правой кнопкой мыши Libraries➜Add Files to [your project's name]

* Перейти к node_modules➜ react-native-advertising-idи добавитьRNAdvertisingId.xcodeproj

* В XCode в навигаторе проекта выберите ваш проект. Добавить libRNAdvertisingId.aв свой проект Build Phases➜Link Binary With Libraries

* Запустите ваш проект ( Cmd+R) <

### Android

* Открыть `android/app/src/main/java/[...]/MainActivity.java` и добавить к импорту в верхней части файла:

```bash
import info.applike.advertisingid.RNAdvertisingIdPackage;
```

*Вставьте следующие строки внутри блока зависимостей в `android/app/build.gradle`:

```bash
...
dependencies {
    ...
    compile project(':react-native-advertising-id')
    ...
}
...
```

* Добавьте следующие строки в `android/settings.gradle`:

```bash
include ':react-native-advertising-id'
project(':react-native-advertising-id').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-advertising-id/android')
```

* Обновите `android/app/src/main/java/AndroidManifest.xml`:

```bash
...
    <application>
        ...
        <meta-data
            android:name="com.google.android.gms.ads.AD_MANAGER_APP"
            android:value="true"/>
        ...
    </application>
...
```

## Использование

Использование методов

* Подключите файл `UserReport.js`:
   
```bash
import UserReport from '[ВАШ ПУТЬ К ФАЙЛУ]/UserReport'
```
  
* Настройка конфигурации:

```bash
UserReport().getInstance().configure([ВАШ sakId], [ВАШ mediaId]).done();
```

* Метод `trackScreenView` не имеет аргументов:

```bash
UserReport.getInstance().trackScreenView().done()
```

* Метод `trackSectionScreenView` имеет аргумент `sectionId`:

```bash
UserReport.getInstance().trackSectionScreenView("[ВАШ sectionId]").done()
```

## Запуск проекта

```bash
react-native run-android
```

## Создание ключа подписи для play market

!!!ВНИМАНИЕ!!! Ключ должен быть и прилагаться к приложению, действия далее описаны если его нет!

- Создать личный ключ подписи, используя `keytool`

```bash
keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

- Поместите `my-upload-key.keystore` файл в `android/app` каталог в директории вашего проекта.

- Отредактируйте файл `android/gradle.properties` и добавьте следующее 
(замените его ***** на правильный пароль хранилища ключей, псевдоним и пароль ключа)

```bash
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

- Отредактируйте файл `android/app/build.gradle` в папке вашего проекта и добавьте конфигурацию подписи.

```bash
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

## Создание APK/AAB

- Отредактируйте файл `android/app/build.gradle` в папке вашего проекта и добавьте конфигурацию подписи.

```bash
...
	defaultConfig {
			minSdkVersion rootProject.ext.minSdkVersion
			targetSdkVersion rootProject.ext.targetSdkVersion
			versionCode // Увеличте на 1 от прошлого номер
			versionName "1.0.0" // Измените номер
		}
...
```

- Просто запустите следующее в терминале.

```bash
cd android
gradlew assembleRelease
```

- В Android studio откройте ваш проект в директорию `/android`.
- Выплните следующие действия `Build-> Build Bundle/APK-> Build APK`.
- Выплните следующие действия `Build-> Generate Signet Bundle/APK`. Далее выбираете `APK`.
- Все остальные данные берете из файла `android/gradle.properties`.
