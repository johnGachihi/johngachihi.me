import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import schemas from './schemas/schema'

export default defineConfig({
  title: "johngachihi.me",
  projectId: "kbldwfkp",
  dataset: "production",
  plugins: [
    deskTool(),
    visionTool(),
    codeInput({
      // Doesn't seem to work
      codeModes: [
        {
          name: 'kotlin',
          loader: () => import('@codemirror/legacy-modes/mode/clike').then(({kotlin}) => kotlin()),
        },
      ],
    })
  ],
  schema: {
    types: schemas,
  },
});