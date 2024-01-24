import React from 'react'

import { render } from '@testing-library/react'

test('Example test', async () => {
  render(<div>test</div>)
  expect('test').toBe('test')
})
