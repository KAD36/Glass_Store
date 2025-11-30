import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import home from './home'
import contact from './contact'
import gallery from './gallery'
import about from './about'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [project, home, contact, gallery, about],
}
