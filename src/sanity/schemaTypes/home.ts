import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Home Page',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
        }),
        defineField({
            name: 'aboutTitle',
            title: 'About Title',
            type: 'string',
        }),
        defineField({
            name: 'aboutContent',
            title: 'About Content',
            type: 'text',
        }),
    ],
})
