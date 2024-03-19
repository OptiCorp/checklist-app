import type { Meta, StoryObj } from '@storybook/react';

import { CustomCard } from './CustomCard';

const meta: Meta<typeof CustomCard> = {
    component: CustomCard,
};

export default meta;
type Story = StoryObj<typeof CustomCard>;

export const FirstCustomCard: Story = {
    args: {
        topKeyValues: [
            { key: 'id', value: 'som1wlaasdlkn' },
            { key: 'name', value: 'daname' },
            { key: 'someverylongthing', value: 'wdawdawda' },
        ],
        bottomKeyValues: [
            { key: 'id', value: 'som1wlaasdlkn' },
            { key: 'name', value: 'daname' },
        ],
    },
};

export const SecondCustomCard: Story = {
    args: {
        topKeyValues: [
            { key: 'id', value: 'som1wlaasdlkn' },
            { key: 'name', value: 'daname' },
            { key: 'someverylongthing', value: 'wdawdawda' },
        ],
        bottomKeyValues: [
            { key: 'id', value: 'som1wlaasdlkn' },
            { key: 'name', value: 'daname' },
        ],
        note: 'Missing template longer text thing',
        primaryAction: () => console.log('hello'),
        primaryActionText: 'create template',
    },
};
