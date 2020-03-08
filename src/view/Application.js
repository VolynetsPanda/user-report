import React, {Component} from 'react';
import {Text, SafeAreaView} from 'react-native';
import {SCREEN_VIEW, SECTION_SCREEN_VIEW} from '../modules/route';
import CustomLink from '../components/CustomLink';
import styles from '../modules/style';

export default class Application extends Component {
    render() {
        const {h1} = styles;
        const {navigation} = this.props;
        return (
            <SafeAreaView>
                <Text style={h1}>Selected View</Text>
                <CustomLink
                    navigation={navigation}
                    text="Go to SCREEN VIEW"
                    link={SCREEN_VIEW}
                />
                <CustomLink
                    navigation={navigation}
                    text="Go to SECTION SCREEN VIEW"
                    link={SECTION_SCREEN_VIEW}
                />
            </SafeAreaView>
        );
    }
}
