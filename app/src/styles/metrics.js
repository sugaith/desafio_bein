import {Platform} from 'react-native';

export default {
    padding0: 5,
    padding: 10,
    padding2: 20,
    padding3: 30,
    padding4: 40,

    margin0: 5,
    margin: 10,
    margin2: 20,
    margin3: 30,
    margin4: 40,

    ...Platform.select({
        ios: { headerHeight: 64, headerPadding: 20 },

        android: { headerHeight: 44, headerPadding: 0 },
    }),

    tabBarHeight: 50,
}