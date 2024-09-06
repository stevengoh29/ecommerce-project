import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigation from './src/components/navigation/root.navigation';
import { MAIN_COLORS } from './src/core/color/main-palette.color';
import { DialogProvider } from './src/hooks/common/use-dialog.hook';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { CustomBottomSheetProvider } from './src/hooks/common/use-bottom-sheet.hook';

export default function App() {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <CustomBottomSheetProvider>
          <SafeAreaView style={styles.container}>
            <DialogProvider>
              <StatusBar backgroundColor={MAIN_COLORS.light.primary} />
              <RootNavigation />
            </DialogProvider>
          </SafeAreaView>
        </CustomBottomSheetProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
