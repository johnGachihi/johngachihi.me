import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppBar from './AppBar';

export default {
  title: 'Components/AppBar',
  component: AppBar,
} as ComponentMeta<typeof AppBar>;


const Template: ComponentStory<typeof AppBar> = () => <AppBar />;

export const Default = Template.bind({});
Default.args = {

};
