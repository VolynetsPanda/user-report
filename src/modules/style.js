import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    h1: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        paddingVertical: 10,
        textTransform:"uppercase"
    },
    wrap:{
        alignItems:"center",
    },
    btn:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "white",
        marginVertical:10
    }
});
export default styles;
