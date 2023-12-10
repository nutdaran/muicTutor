import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SubjectCard from '../SubjectCard.vue'

describe('SubjectCard', () => {

    const detail = "DataScience"
    it('renders a subject card', () => {
        const wrapper = mount(SubjectCard, { props: { subject: detail }})
        expect(wrapper.text()).toContain(detail)
    })

    it('has an element for the suject title', () => {
        const wrapper = mount(SubjectCard, { props: { subject: detail } })
        expect(wrapper.find('h2').exists()).toBe(true)
      })
})