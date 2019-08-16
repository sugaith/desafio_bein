:::::::TODOs:::::::
:::::::TODOs:::::::
:::::::TODOs:::::::






:::::::XApps - Projeto WAG:::::
:::::::XApps - Projeto WAG:::::
:::::::XApps - Projeto WAG:::::


::::::::::::::DEPENDENCIAS A INSTALAR NO IOS E RECUPERAR NO ANDROID::::::
- react-nativagtor
- react-native-vector-icons
- react-native-elements
- react-native-form-validator
- react-native-keyboard-aware-scroll-view
- react-native-masked-text
- react-native-autocomplete-input
- react-native-search-filter
- react-native-masked-text
- react-native-user-avatar
- ImagePicker ---> react-community/react-native-image-picker
- react-native-simple-toast
- instea/react-native-popup-menu --> POP UP MENUZIN
npm install --save react-native-keyboard-spacer - para keyboard IOS spacer
- Spinner loading --> npm install react-native-loading-spinner-overlay




IMAGE PICKER FOR PROFILE
https://github.com/react-community/react-native-image-picker
PICKER PARA IOS 
react-native-simple-picker

text mask!!!
react-native-text-input-mask

push notes!!.
npm install --save react-native-push-notification or yarn add react-native-push-notification
react-native link react-native-push-notification

::::::::::COMANDOS UTEIS:::::::::

::::::::::::::star emulator

:::MARSHMELLOW
C:\Users\suga\AppData\Local\Android\Sdk\tools\emulator -avd emu_60_23 -netdelay none -netspeed full

:::OREO




::::run android
react-native run-android console.log e outros do android react-native log-android

-remover pacote / 
upgrade react-native 
upgrade rnpm unlink package_name 
npm uninstall --save nome_pacote 
react-native unlink 
react-native uninstall

outros: npm start npm cache clean npm start -- --reset-cache npm i npm install (CUIDADO) gradlew clean

procedimento para reconstruir BUILD folders: DELETAR build folers de android e possivelmente de ios rodar comandos:
react-native upgrade
react-native link
react-native run-android

---- SE DER PROBLEMA DE DEPENDENCIA DE ANDROID TEMIOSA R: ficar linkando a biblioteca dleetando build e rodando

npm link react-native-fbsdk ->>> bug do face boom SDK

npm install react-native-fbsdk --save react-native link / subprojects { project.configurations.all { resolutionStrategy.eachDependency { details -> if (details.requested.group == 'com.android.support' && !details.requested.name.contains('multidex') ) { details.useVersion "27.1.0" } } } } /

https://services.gradle.org/distributions/gradle-4.4-all.zip

distributionUrl=https\://services.gradle.org/distributions/gradle-2.14.1-all.zip

NODEFY!!! mvayngrib/rn-nodeify

:::::QUANDO DER ERRO DE ACESSIBILITY INFO
react-native init awesomeproject
 npm remove --save react-native
  npm i --save react-native@0.55.4
npm remove babel-preset-react-native
 npm i --save babel-preset-react-native@2.1.0


 LOG APACHE2
 ---> vi /var/log/apache2/error.log



======================================
GERAR APK PRA DEBUG
#React-Native 0.49.0+
react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug

- PARA FIX DE APK RELEASE SEM AAPT=FALSE
react-native bundle --dev false --platform android --entry-file index.js --bundle-output "$REACT_NATIVE_JS_DIR/index.android.bundle" --assets-dest "$REACT_NATIVE_ASSETS_DIR"



$ cd android
#Create debug build:
$ ./gradlew assembleDebug
#Create release build:
$ ./gradlew assembleRelease #Generated `apk` will be located at `android/app/build/outputs/apk`
gradlew assembleRelease --console plain

->>>>android.enableAapt2=false no gradle.proprertires

react-native run-android --variant=release
==============================================
/*
subprojects {
  project.configurations.all {
     resolutionStrategy.eachDependency { details ->
        if (details.requested.group == 'com.android.support'
              && !details.requested.name.contains('multidex') ) {
           details.useVersion "27.1.0"
        }
     }
  }
}
*/



==================================================================
IOS RELEASE STEPS
GENERATE RELASE ****
IOSS::::
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

https://medium.com/@tunvirrahmantusher/create-ipa-and-apk-from-react-native-72fe53c6a8db
GET .APP
https://stackoverflow.com/questions/5499125/how-to-create-ipa-file-using-xcode/47940681


mandar pro cliente:
https://www.diawi.com/

=========================
ERRO DE FECHAR O APK SEM ERROS NA RELEASE
rodad comando antes do assembleRelease
---> 
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res