import React, {Component} from 'react'
import {createStackNavigator} from 'react-navigation';
import Application from './src/view/Application';
import ScreenView from './src/view/ScreenView';
import SectionScreenView from './src/view/SectionScreenView';
import UserReport from './src/modules/UserReport';
import {APPLICATION, SCREEN_VIEW, SECTION_SCREEN_VIEW} from './src/modules/route';

const Screen = createStackNavigator(
    {
        [APPLICATION]: Application,
        [SCREEN_VIEW]: ScreenView,
        [SECTION_SCREEN_VIEW]:SectionScreenView
    },
    {
        initialRouteName: APPLICATION,
        headerMode: 'none'
    }
)
export default class App extends Component{
    componentDidMount() {
        UserReport.configure("audienceproject","3402b774-b7a8-448c-997a-ef6cd59efc41");
        //UserReport.configure("audienceproject","3402b774-b7a8-448c-997a-ef6cd59efc41",  { logToConsole: true});
    }
    render() {
        return <Screen/>
    }
}

