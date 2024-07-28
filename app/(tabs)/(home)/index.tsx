import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button'
import { FontAwesome } from '@expo/vector-icons';

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
  const name = 'Bacon';

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'My home',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => <LogoTitle />,
        }}
      />
      <Text style={{ color: '#fff' }}>Home Screen</Text>

      {/* <Link href={{ pathname: `/details/${name}`, params: { name } }}>
        Go to Details
      </Link> */}
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label={"Chosoe a photo"} theme={"primary"}/>
        <Button label={"Use this photo"}/>
      </View>
      <StatusBar style="auto" />

    </View>
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
  footerContainer:{
    flex:1/3,
    alignItems:'center'
  }
});
