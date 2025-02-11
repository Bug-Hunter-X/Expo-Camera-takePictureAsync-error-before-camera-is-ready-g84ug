The solution involves using the `onCameraReady` event provided by the `Camera` component. This event fires once the camera is ready for use. By awaiting the promise returned by `camera.onCameraReady`, we prevent calling `takePictureAsync` before the camera is initialized.

```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';

const App = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; //Return loading indicator
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        {({ camera, isTakingPhoto }) => (
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <Button onPress={async () => {
                  if (ready) {
                    let photo = await camera.takePictureAsync();
                    console.log('Photo taken', photo)
                  } else {
                    console.warn('Camera not ready yet.')
                  }
                }}
              title="Take Picture"
            />
          </View>
        )}
        <Camera.onCameraReady={async camera => {
          setReady(true);
          console.log('Camera Ready');
        }} />
      </Camera>
    </View>
  );
};

export default App;
```