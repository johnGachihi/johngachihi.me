export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: "slug",
            options: {
                source: 'title',
                maxLength: '96'
            },
            validation: Rule => Rule.required(),
        },
        {
            name: 'startedAt',
            title: 'Date Started',
            type: 'datetime',
            validation: Rule => Rule.required()
        },
        {
            name: 'showcaseMedia',
            title: 'Showcase Media',
            description: 'Can only take one - image or mux playback-id',
            type: 'object',
            fields: [
                {
                    name: 'image',
                    title: 'Image',
                    type: 'captionedImage',
                    readOnly: ({ parent, value }) => !value && !!parent?.muxVideoPlaybackId
                },
                {
                    name: 'muxVideoPlaybackId',
                    type: 'string',
                    title: 'Mux Video Playback ID',
                    readOnly: ({ parent, value }) => !value && !!parent?.image
                }
            ],
            validation: Rule => Rule.required()
        },
        {
            name: 'githubLink',
            title: 'GitHub Link',
            type: 'url',
        },
        {
            name: 'liveLink',
            title: 'Live Link',
            type: 'url',
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'shortDescription',
            title: 'Short Description',
            type: 'blockContent',
        },
        {
            name: 'technicalDescription',
            title: 'Technical Description',
            type: 'blockContent'
        }
    ]
}
