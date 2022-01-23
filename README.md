# https://reactnative.dev/docs/environment-setup

# iOS
run with
npm start
then run app from xcode

# Android
in ArcadeScores
```
npx react-native start
npx react-native run-android
```

if compilation problems
```
rm package-lock.json
npm i
```

# Known issues
If you get an error message 'unrecognized font family ionicons'. Resolve with
```
npx react-native link react-native-vector-icons
npm start --reset-cache
```
(Taken from https://lifesaver.codes/answer/unrecognized-font-family-ionicons)
