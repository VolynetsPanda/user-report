import React, {Component} from 'react';
import {Text, SafeAreaView} from 'react-native';
import UserReport from '../modules/UserReport';
import styles from '../modules/style';
import CustomLink from '../components/CustomLink';
import {APPLICATION} from '../modules/route';

export default class SectionScreenView extends Component {
    componentDidMount() {
        new UserReport().trackSectionScreenView("b556da9f-9443-44ab-aa48-63d579318b69").done()
    }

    render() {
        const {h1} = styles;
        const {navigation} = this.props;
        return (
            <SafeAreaView>
                <Text style={h1}>Section Screen View</Text>
                <CustomLink
                    navigation={navigation}
                    text="Go to HOME SCREEN"
                    link={APPLICATION}
                />
            </SafeAreaView>
        );
    }
}
