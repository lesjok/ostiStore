import { withKnobs } from '@storybook/addon-knobs'
import type { Meta } from '@storybook/react'
import { StoryObj } from '@storybook/react'
import CustomLink from './CustomLink'

const meta: Meta<typeof CustomLink> = {
  title: 'UI/Link',
  decorators: [withKnobs],
  component: CustomLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomLink>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Link',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Link',
  },
}
