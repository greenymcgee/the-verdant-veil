import React from 'react'
import { render, screen } from '@testing-library/react'

import { Button } from '..'
import { DEFAULT_BUTTON_CLASS_NAMES } from '../constants'

describe('<Button />', () => {
  it('should render a default theme and variant', () => {
    render(<Button>Children</Button>)
    expect(screen.getByText('Children')).toHaveClass('bg-primary-900')
  })

  it('should render a default size', () => {
    render(<Button>Children</Button>)
    const classNames = ['px-5', 'py-3']
    classNames.forEach((className) => {
      expect(screen.getByText('Children')).toHaveClass(className)
    })
  })

  it('should render a base className', () => {
    render(<Button>Children</Button>)
    DEFAULT_BUTTON_CLASS_NAMES.split(' ').forEach((className) => {
      expect(screen.getByText('Children')).toHaveClass(className)
    })
  })

  it('should render default hover and focus styles', () => {
    render(<Button>Children</Button>)
    const classNames = ['hover:bg-primary-700', 'focus:bg-primary-700']
    classNames.forEach((className) => {
      expect(screen.getByText('Children')).toHaveClass(className)
    })
  })

  it('should render default hover and focus styles for outline variant', () => {
    render(<Button variant="outline">Children</Button>)
    const classNames = [
      'hover:text-primary-700',
      'focus:text-primary-700',
      'hover:border-primary-700',
      'focus:border-primary-700',
    ]
    classNames.forEach((className) => {
      expect(screen.getByText('Children')).toHaveClass(className)
    })
  })

  it('should render a given theme', () => {
    render(<Button theme="danger">Children</Button>)
    expect(screen.getByText('Children')).toHaveClass('bg-danger-900')
  })

  it('should render a given variant', () => {
    render(<Button variant="outline">Children</Button>)
    expect(screen.getByText('Children')).toHaveClass('border-primary-900')
  })

  it('should render a given size', () => {
    render(<Button size="sm">Children</Button>)
    const classNames = ['px-3', 'py-2']
    classNames.forEach((className) => {
      expect(screen.getByText('Children')).toHaveClass(className)
    })
  })

  it('should render a given className', () => {
    render(<Button className="mb-4">Children</Button>)
    expect(screen.getByText('Children')).toHaveClass('mb-4')
  })
})
