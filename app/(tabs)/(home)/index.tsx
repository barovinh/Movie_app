import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button'
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState,useRef } from 'react';
import CircleButton from '@/components/CircleButton';
import IconButton from '@/components/IconButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

// LogoTitle Component
function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    />
  );
}
const PlaceholderImage = require('@assets/images/background-image.png');
// Home Component
export default function Home() {
  const imageRef = useRef();

  const [status,requestPermission] = MediaLibrary.usePermissions();
  if(status == null)
  {
    requestPermission();
  }

  const [isModalVisible,setModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, quality: 1,
    });
    if (!result.canceled) {
      // console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      setPickedEmoji(null);
      console.log(showAppOptions);
    }
    else {
      alert('Sao mày không chọn ảnh ?');
    }
  }
  const onReset = () => {
    setShowAppOptions(false);
  };
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const onAddSticker = () => {
    // we will implement this later
    setModalVisible(true);
  };
  const onModalClose=  ()=>{
    setModalVisible(false);
  }
  const onSaveImageAsync = async () => {
    // we will implement this 
    try{
      const localUri = await captureRef(imageRef,{
        height:440,
        quality:1,
      });
      await MediaLibrary.saveToLibraryAsync(localUri);
      if(localUri){
        alert("Lưu thành công!");
        setShowAppOptions(false);
      }
      
    }
    catch( e)
    {
      console.log(e);
    }
  };

  const name = 'Bacon';

  return (
    <GestureHandlerRootView style={styles.container}>

    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'My Home',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitle: () => <LogoTitle />,
        }}
      />
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}></EmojiList>
      </EmojiPicker>
      <StatusBar style="auto" />
    </View>
    </GestureHandlerRootView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25292e',
  }, image: {
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  }, optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
