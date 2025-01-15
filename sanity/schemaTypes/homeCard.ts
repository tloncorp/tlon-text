import {defineType} from 'sanity'

export default defineType({
  name: 'homeCard',
  title: 'Home Card',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to determine the display order of cards',
    },
    {
      name: 'cardType',
      title: 'Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Feature', value: 'feature' },
          { title: 'Story', value: 'story' },
          { title: 'CTA', value: 'cta' },
          { title: 'Posts', value: 'posts' },
          { title: 'Video Gallery', value: 'videoGallery' },
        ],
      },
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
    },
    {
      name: 'button',
      title: 'Button',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'url', title: 'URL', type: 'string' },
        { name: 'openNewWindow', title: 'Open in New Window', type: 'boolean' }
      ],
    },
    {
      name: 'media',
      title: 'Media',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              { title: 'Photo', value: 'photo' },
              { title: 'Video', value: 'video' },
            ],
          },
        },
        {
          name: 'photo',
          title: 'Photo',
          type: 'image',
          hidden: ({ parent }) => parent?.type !== 'photo',
        },
        {
          name: 'video',
          title: 'Video',
          type: 'file',
          hidden: ({ parent }) => parent?.type !== 'video',
          options: {
            accept: 'video/*',
            storeOriginalFilename: true
          },
          fields: [
            {
              name: 'filename',
              type: 'string',
              title: 'Filename',
              readOnly: true,
            },
            {
              name: 'filesize',
              type: 'number',
              title: 'File size',
              readOnly: true,
            },
            {
              name: 'mimeType',
              type: 'string',
              title: 'MIME type',
              readOnly: true,
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
            }
          ]
        },
      ],
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      hidden: ({parent}) => parent?.cardType !== 'videoGallery',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'duration',
              title: 'Duration',
              type: 'string',
            },
            {
              name: 'video',
              title: 'Video',
              type: 'blockVideo',
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'cardType',
      media: 'media'
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'No title',
        subtitle: subtitle || 'No type',
        media: media?.photo || undefined
      }
    }
  },
})