import { StyleSheet, Text, View } from 'react-native'
// import data from "../data/meals.json"

const MealsOverviewScreen = () => {
  return (
    <View style={styles.conatiner}>
        <Text>MealsOverviewScreen</Text>
    </View>
  )
}

export default MealsOverviewScreen

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 16
    }
})