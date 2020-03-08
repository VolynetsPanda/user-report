import React, {Component} from 'react';
import {Text, SafeAreaView} from 'react-native';
import UserReport from '../modules/UserReport';
import styles from '../modules/style';
import CustomLink from '../components/CustomLink';
import {APPLICATION} from '../modules/route';

export default class ScreenView extends Component {
    componentDidMount() {
        new UserReport().trackScreenView().done();
    }

    render() {
        const {h1} = styles;
        const {navigation} = this.props;
        return (
            <SafeAreaView>
                <Text style={h1}>Screen View</Text>
                <CustomLink
                    navigation={navigation}
                    text="Go to HOME SCREEN"
                    link={APPLICATION}
                />
            </SafeAreaView>
        );
    }
}
