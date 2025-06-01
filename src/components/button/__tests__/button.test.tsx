import React from 'react'
import { render, screen } from '@testing-library/react'

import {
  DEFAULT_BUTTON_CLASS_NAMES,
  DEFAULT_BUTTON_DISPLAY_CLASS_NAMES,
} from '@/constants'

import { Button } from '..'

describe('<Button />', () => {
  describe('children', () => {
    it('should render children', () => {
      render(<Button>Do</Button>)
      expect(screen.getByText('Do')).toBeVisible()
    })

    it('should render text', () => {
      render(<Button text="Text" />)
      expect(screen.getByText('Text')).toBeVisible()
    })
  })

  describe('className', () => {
    it('should render a base className', () => {
      render(<Button>Children</Button>)
      expect(screen.getByText('Children')).toHaveClass(
        DEFAULT_BUTTON_CLASS_NAMES,
      )
    })

    it('should render a given className', () => {
      render(<Button className="mb-4">Children</Button>)
      expect(screen.getByText('Children')).toHaveClass('mb-4')
    })
  })

  describe('classNameOverrides', () => {
    it('should render with default display classes', () => {
      render(<Button>Children</Button>)
      expect(screen.getByText('Children')).toHaveClass(
        DEFAULT_BUTTON_DISPLAY_CLASS_NAMES,
      )
    })

    it('should render a given display override', () => {
      render(
        <Button classNameOverrides={{ display: 'block' }}>Children</Button>,
      )
      const button = screen.getByText('Children')
      expect(button).not.toHaveClass(DEFAULT_BUTTON_DISPLAY_CLASS_NAMES)
      expect(button).toHaveClass('block')
    })
  })

  describe('hover styles', () => {
    it('should render default hover styles', () => {
      render(<Button>Children</Button>)
      expect(screen.getByText('Children')).toHaveClass('hover:bg-primary-700')
    })

    it('should render default hover styles for outline variant', () => {
      render(<Button variant="outline">Children</Button>)
      const classNames = ['hover:text-primary-700', 'hover:border-primary-700']
      classNames.forEach((className) => {
        expect(screen.getByText('Children')).toHaveClass(className)
      })
    })
  })

  describe('icons', () => {
    it('should render a left icon', () => {
      render(<Button leftIcon="plus-thick">Do</Button>)
      expect(screen.getByTestId('plus-thick-icon')).toBeVisible()
    })

    it('should render a right icon', () => {
      render(<Button rightIcon="plus-thick">Do</Button>)
      expect(screen.getByTestId('plus-thick-icon')).toBeVisible()
    })
  })

  describe('size', () => {
    it('should render a default size', () => {
      render(<Button>Children</Button>)
      const classNames = ['px-5', 'py-3']
      classNames.forEach((className) => {
        expect(screen.getByText('Children')).toHaveClass(className)
      })
    })

    it('should render a given size', () => {
      render(<Button size="sm">Children</Button>)
      const classNames = ['px-3', 'py-2']
      classNames.forEach((className) => {
        expect(screen.getByText('Children')).toHaveClass(className)
      })
    })
  })

  describe('theme and variant', () => {
    it('should render a default theme and variant', () => {
      render(<Button>Children</Button>)
      expect(screen.getByText('Children')).toHaveClass('bg-primary-900')
    })

    it('should render a given theme', () => {
      render(<Button theme="danger">Children</Button>)
      expect(screen.getByText('Children')).toHaveClass('bg-danger-900')
    })

    it('should render a given variant', () => {
      render(<Button variant="outline">Children</Button>)
      expect(screen.getByText('Children')).toHaveClass('border-primary-900')
    })
  })

  describe('loading', () => {
    it('should render a spinner', () => {
      render(<Button loading text="Text" />)
      expect(screen.getByRole('alert')).toBeVisible()
    })

    it('should set the aria-disabled attribute', () => {
      render(<Button loading text="Text" />)
      expect(screen.getByText('Text')).toHaveAttribute('aria-disabled', 'true')
    })

    it('should add an aria-label', () => {
      render(<Button loading text="Text" />)
      expect(screen.getByText('Text')).toHaveAttribute('aria-label', 'Loading')
    })

    it('should add a cursor-not-allowed className', () => {
      render(<Button loading text="Text" />)
      expect(screen.getByText('Text')).toHaveClass('cursor-not-allowed')
    })
  })
})
