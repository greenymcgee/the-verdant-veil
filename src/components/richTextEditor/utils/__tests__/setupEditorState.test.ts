import { $generateNodesFromDOM } from '@lexical/html'
import { $isLinkNode, LinkNode } from '@lexical/link'
import { $getRoot, LexicalEditor, LexicalNode, RootNode } from 'lexical'

import { setupEditorState } from '..'

vi.mock('@lexical/html', () => ({
  $generateNodesFromDOM: vi.fn(),
}))

vi.mock('@lexical/link', () => ({
  $isLinkNode: vi.fn(),
}))

vi.mock('lexical', () => ({
  $getRoot: vi.fn(),
}))

const PARSED_DOM_CONTENT = { body: { innerHTML: 'parsed content' } }
const EDITOR = {} as LexicalEditor
const ROOT = {
  append: vi.fn(),
  clear: vi.fn(),
  getChildren: vi.fn(() => []),
} as unknown as RootNode
const LINK_NODE = {
  setRel: vi.fn(),
  setTarget: vi.fn(),
} as unknown as LinkNode

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked($getRoot).mockReturnValue(ROOT)
  vi.mocked($generateNodesFromDOM).mockReturnValue([])
  vi.mocked($isLinkNode).mockReturnValue(false)
  global.DOMParser = vi.fn().mockImplementation(() => ({
    parseFromString: vi.fn().mockReturnValue(PARSED_DOM_CONTENT),
  }))
})

describe('setupEditorState', () => {
  it('should return undefined when the content is blank', () => {
    const result = setupEditorState(undefined)
    expect(result).toBeUndefined()
  })

  it('should return undefined when the content is empty string', () => {
    const result = setupEditorState('')
    expect(result).toBeUndefined()
  })

  it('should return undefined when the window is not available', () => {
    const originalWindow = global.window
    // @ts-expect-error - intentionally setting window to undefined for SSR test
    delete global.window
    const result = setupEditorState('<p>Some content</p>')
    expect(result).toBeUndefined()
    global.window = originalWindow
  })

  it('should parse HTML content', () => {
    const content = '<p>Test content</p>'
    const nodes = [{ __type: 'paragraph' }] as LexicalNode[]
    vi.mocked($generateNodesFromDOM).mockReturnValue(nodes)
    const handler = setupEditorState(content)
    handler!(EDITOR)
    expect($generateNodesFromDOM).toHaveBeenCalledWith(
      EDITOR,
      PARSED_DOM_CONTENT,
    )
  })

  it('should clear the root and append nodes', () => {
    const content = '<p>Test content</p>'
    const nodes = [{ __type: 'paragraph' }] as LexicalNode[]
    vi.mocked($generateNodesFromDOM).mockReturnValue(nodes)
    const handler = setupEditorState(content)
    handler!(EDITOR)
    expect(ROOT.append).toHaveBeenCalled()
    expect(ROOT.clear).toHaveBeenCalled()
  })

  it('should set target and rel attributes on link nodes', () => {
    const content = '<p>Text <a href="https://example.com">Link</a></p>'
    const textNode = { __type: 'text' } as LexicalNode
    const nodes = [textNode, LINK_NODE] as LexicalNode[]
    vi.mocked($generateNodesFromDOM).mockReturnValue(nodes)
    vi.mocked($isLinkNode).mockImplementation((node) => node === LINK_NODE)
    vi.mocked(ROOT.getChildren).mockReturnValue(nodes)
    const editorStateFunction = setupEditorState(content)
    editorStateFunction!(EDITOR)
    expect(LINK_NODE.setTarget).toHaveBeenCalledWith('_blank')
    expect(LINK_NODE.setRel).toHaveBeenCalledWith('noopener noreferrer')
  })
})
